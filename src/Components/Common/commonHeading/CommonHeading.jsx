import React, { useEffect, useState } from 'react'

export default function CommonHeading({text,padding}) {
  const [defaultpading, setdefaultpading] = useState( )

useEffect(() => {
  setdefaultpading( padding? padding : 'pb-2')
}, [])

  return (
    <div>
        <h1 className={`pt-1 ${defaultpading}`} style={{fontSize:'24px',color:'#383838',fontWeight:'700 '}}>{text}</h1>
    </div>
  )
}