import React, { useEffect, useState } from 'react';
import Context from './index';

const GalleryProvider = (props) => {
    const [images, setImage] = useState([
        "big-lightgallry/1.jpg",
        "big-lightgallry/2.jfif",
        "big-lightgallry/3.jpg",
        "big-lightgallry/4.jpg" 
        ]);
    const [smallImages, setSmallImages] = useState([
        "big-lightgallry/1.jpg",
        "big-lightgallry/2.jfif",
        "big-lightgallry/3.jpg",
        "big-lightgallry/4.jpg"  
        ]);
    const [masonryImg, setMasonryImg] = useState([]);

    // console.log("images", images)
    // console.log("smallImages", smallImages)

    // console.log("BigImageApi=>", BigImageApi)
    // console.log("ImageLightApi=>", ImageLightApi)

    // useEffect(() => {
    //     const getChartData = async () => {
    //         // try {
    //         //     axios.get(ImageLightApi).then((response) => {
    //         //         console.log()
    //         //         setImage(response.data.src);
    //         //     });

    //         //     axios.get(BigImageApi).then((response) => {
    //         //         setSmallImages(response.data.src);
    //         //     });

    //         //     // axios.get(MasonryApi).then((response) => {
    //         //     //     setMasonryImg(response.data);
    //         //     // });

    //         // } catch (error) {
    //         //     console.log('cancelled', error);
    //         // }

    //         setImage([
    //             "big-lightgallry/1.jpg",
    //             "big-lightgallry/2.jfif",
    //             "big-lightgallry/3.jpg",
    //             "big-lightgallry/4.jpg" 
    //             ]);
    //         setSmallImages([
    //             "big-lightgallry/1.jpg",
    //             "big-lightgallry/2.jfif",
    //             "big-lightgallry/3.jpg",
    //             "big-lightgallry/4.jpg"  
    //             ]
    //         );
    //     };
    //     getChartData();
    // }, [setImage, setSmallImages, setMasonryImg]);

    return (
        <Context.Provider
            value={{
                ...props,
                images,
                smallImages,
                masonryImg
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default GalleryProvider;