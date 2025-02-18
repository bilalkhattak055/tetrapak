import React from 'react'
import DefaultDashboard from '../../../GlobalDashboard/Default/index'

const FactoryThree = () => {
  const title = 'RYK Factory'
  return (
    <>
      <DefaultDashboard type={'factory-one'} mainTitle={title} />
    </>
  )
}

export default FactoryThree;
