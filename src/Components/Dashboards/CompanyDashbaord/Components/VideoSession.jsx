import React from 'react'

export default function VideoSession({activeData}) {
    console.log('video object',activeData)
  return (
    <>
        {
          activeData ?   activeData.map((video)=>{
                return(
                    <>
                    <iframe
                           src={video.video}
                           className='iframforMachineGuard'
                            width='100%'
                            height='86%'
                            title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '15px' }}
                            ></iframe>
                    </>
                )
            })
            : (
                <>
                No Video Selected
                </>
            )
        }
    </>
  )
}
