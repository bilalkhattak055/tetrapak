import React from 'react'
import './tableAction.css'

const Index = ({Icon1, Icon2}) => {
  return (
    <div className='d-flex gap-4'>
      <div className='icon-1'  >
        {Icon1}
      </div>
      <div className='icon-2'  >
        {Icon2}
      </div>
    </div>
  )
}

export default Index
