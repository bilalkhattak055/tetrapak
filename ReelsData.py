import asyncio
import json
import websockets
import random
import os
import glob
import re
from datetime import datetime
from aiohttp import web
import aiohttp_cors

class WebSocketReelSender:
    def __init__(self, websocket_port=8062, http_port=8063):
        self.websocket_port = websocket_port
        self.http_port = http_port
        # Initialize the reel data values
        self.total_reels = 21
        self.match_reels = 30
        self.mismatch_reels = 20
        self.wrong_mismatch = 10

        # Control flag for server running state
        self.running = True

        # Base directory for images
        self.images_dir = os.path.join(os.path.dirname(__file__), "images")
        # Create images directory if it doesn't exist
        os.makedirs(self.images_dir, exist_ok=True)

        print(f"WebSocket reel sender started on port {self.websocket_port}. Waiting for connections...")
        print(f"Image server will run on port {self.http_port}")
        print(f"Images will be served from: {self.images_dir}")

    def get_latest_images(self):
        """
        Find the latest camera and barcode images in the images directory.
        Returns a dictionary with the latest image paths for both categories.
        """
        # Get all image files in the directory
        all_images = glob.glob(os.path.join(self.images_dir, "*.jpg")) + \
                     glob.glob(os.path.join(self.images_dir, "*.jpeg")) + \
                     glob.glob(os.path.join(self.images_dir, "*.png"))
        
        # Separate camera and barcode images
        camera_images = [img for img in all_images if re.search(r'camera|cam', os.path.basename(img).lower())]
        barcode_images = [img for img in all_images if re.search(r'barcode|bar|code', os.path.basename(img).lower())]
        
        # Sort by modification time (newest first)
        camera_images.sort(key=os.path.getmtime, reverse=True)
        barcode_images.sort(key=os.path.getmtime, reverse=True)
        
        # Initialize result dictionary
        latest_images = {}
        
        # Add camera images (up to 3)
        for i, img in enumerate(camera_images[:3]):
            filename = os.path.basename(img)
            latest_images[f"camera{i+1}"] = f"http://localhost:{self.http_port}/images/{filename}"
        
        # Add fallback for camera images if none found
        for i in range(1, 4):
            if f"camera{i}" not in latest_images:
                latest_images[f"camera{i}"] = f"http://localhost:{self.http_port}/images/default_camera.jpg"
        
        # Add barcode images (up to 2)
        for i, img in enumerate(barcode_images[:2]):
            filename = os.path.basename(img)
            latest_images[f"barcode{i+1}"] = f"http://localhost:{self.http_port}/images/{filename}"
        
        # Add fallback for barcode images if none found
        for i in range(1, 3):
            if f"barcode{i}" not in latest_images:
                latest_images[f"barcode{i}"] = f"http://localhost:{self.http_port}/images/default_barcode.jpg"
        
        return latest_images

    async def send_reel_data(self, websocket, path=None):
        """
        Continuously sends reel data to the connected WebSocket client.
        Each value is randomly incremented (0 or 1) and updates occur every 2 minutes.
        """
        try:
            # Get the latest images upon connection
            image_urls = self.get_latest_images()
            
            # Send initial data immediately upon connection
            message = {
                "total_reels": self.total_reels,
                "match_reels": self.match_reels,
                "mismatch_reels": self.mismatch_reels,
                "wrong_mismatch": self.wrong_mismatch,
                "image_urls": image_urls
            }
            await websocket.send(json.dumps(message))
            
            while self.running:
                # Wait for 2 minutes (120 seconds)
                await asyncio.sleep(120)
                
                # Randomly update each reel value
                self.total_reels += random.choice([0, 1])
                self.match_reels += random.choice([0, 1])
                self.mismatch_reels += random.choice([0, 1])
                self.wrong_mismatch += random.choice([0, 1])

                # Get the latest images for this update
                image_urls = self.get_latest_images()

                # Create the message dictionary with dynamic image URLs
                message = {
                    "total_reels": self.total_reels,
                    "match_reels": self.match_reels,
                    "mismatch_reels": self.mismatch_reels,
                    "wrong_mismatch": self.wrong_mismatch,
                    "image_urls": image_urls
                }

                # Convert dictionary to JSON and send through WebSocket
                await websocket.send(json.dumps(message))
                print(f"Sent updated data: {message}")
                
        except websockets.exceptions.ConnectionClosed as e:
            print(f"Reel data WebSocket connection closed: {e}")

    async def start_websocket_server(self):
        """Starts the WebSocket server for sending reel data."""
        server = await websockets.serve(self.send_reel_data, "localhost", self.websocket_port)
        print(f"Reel data WebSocket server started on ws://localhost:{self.websocket_port}")
        return server

    async def handle_get_image(self, request):
        """Handle HTTP requests for images."""
        image_name = request.match_info['filename']
        image_path = os.path.join(self.images_dir, image_name)
        
        if not os.path.exists(image_path):
            # Try to find a default image based on the type requested
            if 'camera' in image_name.lower():
                default_path = os.path.join(self.images_dir, "default_camera.jpg")
            elif 'barcode' in image_name.lower() or 'bar' in image_name.lower():
                default_path = os.path.join(self.images_dir, "default_barcode.jpg")
            else:
                default_path = os.path.join(self.images_dir, "default_image.jpg")
                
            if os.path.exists(default_path):
                return web.FileResponse(default_path)
            return web.Response(text=f"Image {image_name} not found", status=404)
        
        return web.FileResponse(image_path)

    async def start_http_server(self):
        """Start an HTTP server to serve image files."""
        app = web.Application()
        
        # Add CORS support
        cors = aiohttp_cors.setup(app, defaults={
            "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*"
            )
        })
        
        # Add route for serving images
        route = app.router.add_get('/images/{filename}', self.handle_get_image)
        cors.add(route)
        
        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, 'localhost', self.http_port)
        await site.start()
        print(f"HTTP server for images started on http://localhost:{self.http_port}")
        return runner

    async def run(self):
        """Runs the WebSocket server and HTTP server indefinitely."""
        ws_server = await self.start_websocket_server()
        http_runner = await self.start_http_server()
        
        try:
            await asyncio.Future()  # Run indefinitely.
        except asyncio.CancelledError:
            self.running = False
            ws_server.close()
            await ws_server.wait_closed()
            await http_runner.cleanup()
            print("Servers shutdown complete")

if __name__ == "__main__":
    reel_sender = WebSocketReelSender()
    try:
        asyncio.run(reel_sender.run())
    except KeyboardInterrupt:
        print("Shutting down servers...")