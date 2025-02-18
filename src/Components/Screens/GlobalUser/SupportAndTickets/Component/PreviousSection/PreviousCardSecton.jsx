import React from 'react'
import { Input } from 'reactstrap'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function PreviousCardSecton({onClick}) {
  return ( 
      <div className='d-flex'>
        <Input type='search' style={{width:'218px',borderRadius:'10px 0px 0px 10px'}} placeholder='Search ticket here' onChange={(e)=>{onClick(e.target.value)}}/>
        <button style={{border:'1px solid #DFDFDF',borderRadius:'0px 10px 10px 0px',background:'white'}}>
        <HiMiniMagnifyingGlass style={{color:'#B7B7B7',width:'13px'}}/> 
        </button>
        
      </div>
  )
}
