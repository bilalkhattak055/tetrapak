import React, { Fragment, useState } from 'react'
import { Container } from 'react-bootstrap'
import AllCamerasTable from "../../../Tables/DatatableForArea/DataTable/Index";
import { allCamerasColumns, allCamerasData } from '../../../../Data/Table/DummyTableData';
import { H4 } from '../../../../AbstractElements';
import SingleImage from '../../../../Gallery/zoomin/SingleImage';

const Allcameras = () => {
  const allCamerasColumns = [
    {
      name: "S.No",
      selector: (row) => row.id,
      width: "80px",
      // sortable: true,
    },
    {

      name: "Camera Name",
      selector: (row) => row.camera,
     
      // sortable: true,
    },
    {
      name: "Camera ID",
      selector: (row) => row.cameraId,
      // sortable: true,
    },
    {
      name: "Camera IP",
      selector: (row) => row.cameraIP,
      // sortable: true,
    },
    {
      name: "NVR",
      selector: (row) => row.nvr,
      // sortable: true,
    },
    
    {
      name: "Sub Area",
      selector: (row) => row.subArea,
      // sortable: true,
    },
   
    {
      name: "Module",
      selector: (row) => row.module,
      // sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      // sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      sortFunction: (a, b) => new Date(b.date) - new Date(a.date),
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          onClick={() => handleClick(row)}
          src={row.image}
          alt="Violation"
          style={{
            width: "70px",
            height: "50px",
            borderRadius: "10px",
            marginBlock: "10px",
          }}
        />
      ),
    },
  ];



  const [data, setData] = useState(allCamerasData)
  const [columns, setColumns] = useState(allCamerasColumns)
  const [isOpen, setIsOpen] = useState(false)
  const [photo, setPhoto] = useState(undefined)
  const [imageData, setImageData] = useState({})
 

  const handleClick = (item) => {
    setImageData({
      cameraName: item?.cameraName,
      date: item?.date,
      time: '10:00 AM'
    })
    setPhoto(item.image);
    setIsOpen(true)
  };

  return (
    <Fragment>
      {isOpen && <SingleImage photo={photo} isOpen={isOpen} setIsOpen={setIsOpen} imageData={imageData} />}
      <Container className='dashboard-first-page' fluid={true} >
        <H4>Camera Table</H4>
        <AllCamerasTable
          //   pagination_options={[10, 20, 30, 40]}
          dummytabledata={data}
          tableColumns={columns}
          noCardHeader={true}
        />
      </Container>
    </Fragment>
  )
}

export default Allcameras
