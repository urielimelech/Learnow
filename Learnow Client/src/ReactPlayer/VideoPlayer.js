import React from 'react'
import { WrapperVideo, Video } from './VideoStyle'


export const VideoPlayer = ()=>{
    return <WrapperVideo>
             <Video
              url="https://www.youtube.com/watch?v=DIJYAWB3MhI"
              controls={true}
              // wrapper={Video}
              // width={'50%'}
              // height={450}
            />
          </WrapperVideo>
  
}