import React from 'react'
// import download from './../../../assets/icons/download.png';
import './Btn.css'
import download from '../../../assets/icons/download.png';

const DownloadBtn = () => {
    const downloadClink=()=> {
        console.log('clicked...')
    }
  return (
    
      <button onClick={downloadClink} className='download'>
              <p style={{ fontSize: '0.8rem' }} className='m-0 p-0'>Download Report</p>
              <img src={download} alt="download" />
            </button>

  )
}

export default DownloadBtn
