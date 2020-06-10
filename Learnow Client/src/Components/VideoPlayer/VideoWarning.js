import React from 'react'
import { TextType } from '../TextType/TextType'

export const VideoWarning = () => {
    const warnImageSrc = require('../../images/warn.png')
    return (
        <div>
            <img alt='warning' style={{objectFit: 'contain', height: '40px'}} src={warnImageSrc}/>
            <TextType>please, watch the full video</TextType>
        </div>
    )
}