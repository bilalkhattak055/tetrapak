// import React, { Fragment, useContext,useState, useCallback } from "react";
// import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
// import GalleryContext from '../../_helper/Gallery';
// import { H4, H5, Image } from "../../AbstractElements";
// import { HoverEffect } from "../../Constant";
// import SingleImage from "./SingleImage";


// const Hover3 = () => {

//     const { images, smallImages } = useContext(GalleryContext);
//     const initilindex = { index: 0, isOpen: false }
//     const [photoIndex, setPhotoIndex] = useState(initilindex)
//     const callback = useCallback((photo) => {
//         setPhotoIndex(photo)
//     })

//     return (
//         <Fragment>
   
//                 <Col sm="12">
                    
//                             <div id="aniimated-thumbnials2" className="row gallery my-gallery mb-2">
//                                 <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-3 ">
//                                     <div className="rounded">
//                                         <Image attrImage={{
//                                             className: "img-fluid", src: `${require('../../assets/images/dashboard/gallery/1.webp')}`, itemProp: "thumbnail"
//                                             , alt: "", onClick: () => setPhotoIndex({ ...photoIndex, index: 0, isOpen: true }) 
                                            
//                                         }}
                                        
//                                         />
//                                     </div>
//                                     <div className="mt-2">
//                                     <H5>Gate #1</H5>
//                                     </div>
//                                 </figure>
//                                 <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-3 ">
//                                     <div className="rounded">
//                                         <Image attrImage={{
//                                             className: "img-fluid ", src: `${require('../../assets/images/dashboard/gallery/4.jpg')}`, itemProp: "thumbnail"
//                                             , alt: ""
//                                         }} />
//                                     </div>
//                                     <div className="mt-2">
//                                     <H5>Gate #2</H5>
//                                     </div>
//                                 </figure>
//                                 <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-3">
//                                     <div className="rounded">
//                                         <Image attrImage={{
//                                             className: "img-fluid", src: `${require('../../assets/images/dashboard/gallery/3.webp')}`, itemProp: "thumbnail"
//                                             , alt: ""
//                                         }} />
//                                     </div>
//                                     <div className="mt-2">
//                                     <H5>Gate #3</H5>
//                                     </div>
//                                 </figure>
//                                 <figure itemProp="associatedMedia" className="col-md-3 col-6 img-hover hover-3">
//                                     <div className="rounded">
//                                         <Image attrImage={{
//                                             className: "img-fluid", src: `${require('../../assets/images/dashboard/gallery/4.jpg')}`, itemProp: "thumbnail"
//                                             , alt: ""
//                                         }} />
//                                     </div>
//                                     <div className="mt-2">
//                                     <H5>Gate #4</H5>
//                                     </div>
//                                 </figure>
//                             </div>
                        
//                 </Col>
         
//                 <SingleImage photoIndex={photoIndex} setPhotoIndex={callback} images={images} />
//         </Fragment>
//     )
// }

// export default Hover3


import React, { Fragment, useState, useContext, useCallback } from 'react';
import { Container, Row } from 'reactstrap'
import GalleryContext from '../../_helper/Gallery'
import ListOfImage from './ListOfImages';
import SingleImage from './SingleImage';
import { Breadcrumbs } from '../../AbstractElements';

const ImageGallery = () => {

    const { images, smallImages } = useContext(GalleryContext);
    const initilindex = { index: 0, isOpen: false }
    const [photoIndex, setPhotoIndex] = useState(initilindex)
    
    const callback = useCallback((photo) => {
        setPhotoIndex(photo)
    })

    return (
        <Fragment>
            {/* <Breadcrumbs mainTitle="Gallery Grid" parent="Gallery" title="Gallery Grid" /> */}
            <Container fluid={true}>
                <Row>
                    <ListOfImage smallImages={smallImages} setPhotoIndex={callback} photoIndex={photoIndex} />
                </Row>
            </Container>
            <SingleImage photoIndex={photoIndex} setPhotoIndex={callback} images={images} />
        </Fragment>
    );
}


export default ImageGallery;