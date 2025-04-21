import asyncio
import json
import websockets
import random
import os
import glob
import re
from aiohttp import web
import aiohttp_cors

class WebSocketReelSender:
    def __init__(self, websocket_port=8062, http_port=8063, status_ws_port=8064):
        # Ports setup:
        # websocket_port   -> For sending reel data.
        # http_port        -> For serving images.
        # status_ws_port   -> For receiving status update data from frontend.
        self.websocket_port = websocket_port
        self.http_port = http_port
        self.status_ws_port = status_ws_port

        # Initialize reel data values.
        self.total_reels = 21
        self.match_reels = 30
        self.mismatch_reels = 20
        self.wrong_mismatch = 10
        self.mismatch_reel = False
        self.match_reel = True
        self.wrong_match = False
        
        # Authentication and process state flags received from frontend
        self.auth_state = False
        self.bypass_state = False
        self.reprocess_state = False

        # Control flag for running state.
        self.running = True

        # Base directory for images.
        self.images_dir = os.path.join(os.path.dirname(__file__), "images")
        os.makedirs(self.images_dir, exist_ok=True)

        print(f"Reel data WebSocket server will run on ws://localhost:{self.websocket_port}")
        print(f"Image server will run on http://localhost:{self.http_port}")
        print(f"Status WebSocket server will run on ws://localhost:{self.status_ws_port}")
        print(f"Images will be served from: {self.images_dir}")

    def get_latest_images(self):
        """
        Finds the latest camera and barcode images in the images directory.
        Returns a dictionary with the current image URLs (or fallback defaults).
        """
        all_images = glob.glob(os.path.join(self.images_dir, "*.jpg")) + \
                     glob.glob(os.path.join(self.images_dir, "*.jpeg")) + \
                     glob.glob(os.path.join(self.images_dir, "*.png"))

        # Separate camera and barcode images using regex.
        camera_images = [img for img in all_images if re.search(r'camera|cam', os.path.basename(img).lower())]
        barcode_images = [img for img in all_images if re.search(r'barcode|bar|code', os.path.basename(img).lower())]

        # Sort images by modification time (newest first).
        camera_images.sort(key=os.path.getmtime, reverse=True)
        barcode_images.sort(key=os.path.getmtime, reverse=True)

        latest_images = {}

        # Add up to 3 camera images.
        for i, img in enumerate(camera_images[:3]):
            filename = os.path.basename(img)
            latest_images[f"camera{i+1}"] = f"http://localhost:{self.http_port}/images/{filename}"
        # Fallback for missing camera images.
        for i in range(1, 4):
            if f"camera{i}" not in latest_images:
                latest_images[f"camera{i}"] = f"http://localhost:{self.http_port}/images/default_camera.jpg"

        # Add up to 2 barcode images.
        for i, img in enumerate(barcode_images[:2]):
            filename = os.path.basename(img)
            latest_images[f"barcode{i+1}"] = f"http://localhost:{self.http_port}/images/{filename}"
        # Fallback for missing barcode images.
        for i in range(1, 3):
            if f"barcode{i}" not in latest_images:
                latest_images[f"barcode{i}"] = f"http://localhost:{self.http_port}/images/default_barcode.jpg"

        return latest_images

    async def send_reel_data(self, websocket, path=None):
        """
        When a connection is established, send the initial reel data,
        then wait 2 minutes between each update (with random increments) and send updates.
        """
        try:
            # Get and send the initial reel data.
            image_urls = self.get_latest_images()
            message = {
                "total_reels": self.total_reels,
                "match_reels": self.match_reels,
                "mismatch_reels": self.mismatch_reels,
                "wrong_mismatch": self.wrong_mismatch,
                "image_urls": image_urls,
                "match_reel": self.match_reel,
                "mismatch_reel": self.mismatch_reel,
                "wrong_match": self.wrong_match
            }
            await websocket.send(json.dumps(message))
            print(f"Sent initial reel data: {message}")

            while self.running:
                # Wait for 2 minutes between updates.
                await asyncio.sleep(120)
                
                # Randomly update reel data.
                self.total_reels += random.choice([0, 1])
                self.match_reels += random.choice([0, 1])
                self.mismatch_reels += random.choice([0, 1])
                self.wrong_mismatch += random.choice([0, 1])
                
                # Periodically toggle match/mismatch status to simulate different conditions
                # This is just for testing - in a real system, these would be determined by actual matching logic
                if random.random() < 0.5:  # 30% chance to toggle status
                    self.match_reel = not self.match_reel
                    self.mismatch_reel = not self.mismatch_reel
                
                image_urls = self.get_latest_images()
                message = {
                    "total_reels": self.total_reels,
                    "match_reels": self.match_reels,
                    "mismatch_reels": self.mismatch_reels,
                    "wrong_mismatch": self.wrong_mismatch,
                    "image_urls": image_urls,
                    "match_reel": self.match_reel,
                    "mismatch_reel": self.mismatch_reel,
                    "wrong_match": self.wrong_match
                }
                await websocket.send(json.dumps(message))
                print(f"Sent updated reel data: {message}")
        except websockets.exceptions.ConnectionClosed as e:
            print(f"Reel data WebSocket connection closed: {e}")

    async def handle_status_ws(self, websocket, path=None):
        """
        Receives status update data from the frontend.
        Updates the backend state based on incoming JSON messages.
        """
        try:
            print("Status WebSocket connection established.")
            
            while True:
                message = await websocket.recv()
                try:
                    data = json.loads(message)
                    print(f"Received status update from frontend: {data}")
                    
                    # Update internal authentication state based on received data
                    if 'auth_state' in data:
                        self.auth_state = bool(data['auth_state'])
                        print(f"Authentication state updated: {self.auth_state}")
                        
                        # Process authentication mode changes
                        if self.auth_state:
                            if 'bypass_state' in data:
                                self.bypass_state = bool(data['bypass_state'])
                                print(f"Bypass state updated: {self.bypass_state}")
                            
                            if 'reprocess_state' in data:
                                self.reprocess_state = bool(data['reprocess_state'])
                                print(f"Reprocess state updated: {self.reprocess_state}")
                            
                            # Handle the different authentication modes
                            if self.bypass_state:
                                self.process_bypass_auth()
                            elif self.reprocess_state:
                                self.process_reprocess_auth()
                        else:
                            # Reset states when auth is false
                            self.bypass_state = False
                            self.reprocess_state = False
                            print("Authentication expired or ended, reset bypass and reprocess states")
                    
                    # Update reel matching states if provided
                    if 'match_reels' in data:
                        self.match_reel = bool(data['match_reels'])
                        print(f"Match reel state updated: {self.match_reel}")
                    
                    if 'missMatch_reels' in data:
                        self.mismatch_reel = bool(data['missMatch_reels'])
                        print(f"Mismatch reel state updated: {self.mismatch_reel}")
                    
                    if 'wrong_mismatch' in data:
                        self.wrong_match = bool(data['wrong_mismatch'])
                        print(f"Wrong match state updated: {self.wrong_match}")
                    
                    # Send acknowledgement back to client
                    await websocket.send(json.dumps({"status": "received", "timestamp": asyncio.get_event_loop().time()}))
                    
                except json.JSONDecodeError:
                    print(f"Received non-JSON message: {message}")
        except websockets.exceptions.ConnectionClosed as e:
            print(f"Status WebSocket connection closed: {e}")

    def process_bypass_auth(self):
        """
        Handle logic specific to bypass authentication mode
        """
        print("Processing bypass authentication...")
        # Implement specific bypass logic here
        # For example, you might want to skip certain checks or validations
        
        # Example implementation:
        self.match_reel = True  # Force a match during bypass
        self.mismatch_reel = False
        self.wrong_match = False
        print("Bypass mode active: Forcing match_reel=True")

    def process_reprocess_auth(self):
        """
        Handle logic specific to reprocess authentication mode
        """
        print("Processing reprocess authentication...")
        # Implement specific reprocess logic here
        # For example, you might want to trigger a reanalysis of data
        
        # Example implementation:
        # Reset counters for reprocessing
        self.total_reels = max(0, self.total_reels - 1)  # Decrement as we're reprocessing
        print(f"Reprocess mode active: Set total_reels to {self.total_reels}")
        
        # You could trigger specific image reprocessing here

    async def start_websocket_server(self):
        # Start the reel data WebSocket server.
        server = await websockets.serve(self.send_reel_data, "localhost", self.websocket_port)
        print(f"Reel data WebSocket server started on ws://localhost:{self.websocket_port}")
        return server

    async def start_status_websocket_server(self):
        # Start the status updates WebSocket server.
        status_server = await websockets.serve(self.handle_status_ws, "localhost", self.status_ws_port)
        print(f"Status WebSocket server started on ws://localhost:{self.status_ws_port}")
        return status_server

    async def handle_get_image(self, request):
        """
        Serves an image file based on the filename in the URL.
        Falls back to a default image if the requested file does not exist.
        """
        image_name = request.match_info['filename']
        image_path = os.path.join(self.images_dir, image_name)

        if not os.path.exists(image_path):
            # Determine default image based on request.
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
        """
        Starts an HTTP server to serve images, with CORS enabled.
        """
        app = web.Application()
        cors = aiohttp_cors.setup(app, defaults={
            "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*"
            )
        })
        
        route = app.router.add_get('/images/{filename}', self.handle_get_image)
        cors.add(route)
        
        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, 'localhost', self.http_port)
        await site.start()
        print(f"HTTP server for images started on http://localhost:{self.http_port}")
        return runner

    async def run(self):
        """
        Starts all three servers and runs indefinitely until a cancellation.
        """
        ws_server = await self.start_websocket_server()          # Reel data on port 8062.
        status_ws_server = await self.start_status_websocket_server()  # Status updates on port 8064.
        http_runner = await self.start_http_server()              # HTTP image server on port 8063.

        try:
            await asyncio.Future()  # Run indefinitely.
        except asyncio.CancelledError:
            self.running = False
            ws_server.close()
            status_ws_server.close()
            await ws_server.wait_closed()
            await status_ws_server.wait_closed()
            await http_runner.cleanup()
            print("Servers shutdown complete")

if __name__ == "__main__":
    reel_sender = WebSocketReelSender()
    try:
        asyncio.run(reel_sender.run())
    except KeyboardInterrupt:
        print("Shutting down servers...")