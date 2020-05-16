import React from 'react'

export const VideoWarning = () => {
    const warnImageSrc = require('../../images/warn.png')
    return (
        <div>
            <img alt='warning' style={{objectFit: 'contain', height: '40px'}} src={warnImageSrc}/>
            please, watch the full video
        </div>
    )
}