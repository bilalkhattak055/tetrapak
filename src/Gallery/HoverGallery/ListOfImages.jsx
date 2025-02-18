import React, { Fragment } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { H5, Image } from '../../AbstractElements';
import { IMAGE_GALLERY } from '../../Constant';
import HeaderCard from '../../Components/Common/Component/HeaderCard';
import './gallery.css'


const ListOfImage = ({ smallImages, setPhotoIndex, photoIndex, withDesc }) => {
  
  console.log("smallImages", smallImages)
  console.log("smallImagessssss1", `../../assets/images/${smallImages && smallImages[0]}`)
  console.log("smallImagessssss2", `../../assets/images/${smallImages && smallImages[3]}`)
  console.log("smallImagessssss3", `../../assets/images/${smallImages && smallImages[2]}`)
  console.log("smallImagessssss4", `../../assets/images/${smallImages && smallImages[3]}`)
  return (
    <Fragment>
      {smallImages.length > 0 ? (
        <Col sm='12' className='mb-3'>
          {/* <Card>
            {/* <HeaderCard title={IMAGE_GALLERY} /> */}
            {/* <CardBody> */} 
              <div className='my-gallery row ' style={{height: '200px'}}>
                
                <figure className='col-xl-3 col-sm-6 ' >
                  <Image attrImage={{ src: require(`../../assets/images/${smallImages && smallImages[0]}`),style:{height: '170px', width: '100%'} , alt: 'Gallery', className: 'img-thumbnail', onClick: () => setPhotoIndex({ ...photoIndex, index: 0, isOpen: true }) }} />
                  <p className='my-2 p-0' style={{fontSize:'13px'}}>Gate #1</p>
                </figure>
                <figure className='col-xl-3 col-sm-6 image-style'>
                  <Image attrImage={{ src: require(`../../assets/images/${smallImages && smallImages[3]}`),style:{height: '170px', width: '100%'}, alt: 'Gallery', className: 'img-thumbnail', onClick: () => setPhotoIndex({ ...photoIndex, index: 3, isOpen: true }) }} />
                  <p className='my-2 p-0' style={{fontSize:'13px'}}>Gate #2</p>

                </figure>
                <figure className='col-xl-3 col-sm-6'>
                  <Image attrImage={{ src: require(`../../assets/images/${smallImages && smallImages[2]}`),style:{height: '170px', width: '100%'}, alt: 'Gallery', className: 'img-thumbnail', onClick: () => setPhotoIndex({ ...photoIndex, index: 2, isOpen: true }) }} />
                  <p className='my-2 p-0' style={{fontSize:'13px'}}>Gate #3</p>

                </figure>
                <figure className='col-xl-3 col-sm-6'>
                <Image attrImage={{ src: require(`../../assets/images/${smallImages && smallImages[3]}`),style:{height: '170px', width: '100%'}, alt: 'Gallery', className: 'img-thumbnail', onClick: () => setPhotoIndex({ ...photoIndex, index: 3, isOpen: true }) }} />
                <p className='my-2 p-0' style={{fontSize:'13px'}}>Gate #4</p>

                </figure>
                
                
                
              </div>
            {/* </CardBody>
          </Card> */}
        </Col>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default ListOfImage;
