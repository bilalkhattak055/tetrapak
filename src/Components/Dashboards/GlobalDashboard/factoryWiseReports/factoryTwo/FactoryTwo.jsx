import React from 'react'
import DefaultDashboard from '../../../GlobalDashboard/Default/index'
const FactoryTwo = () => {
  const title = 'Foods Factory'
  return (
    <>
    <DefaultDashboard type={'factory-one'} mainTitle={title} />
  </>
  )
}

export default FactoryTwo
