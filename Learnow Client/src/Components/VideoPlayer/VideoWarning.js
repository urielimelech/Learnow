import React from 'react'

export const VideoWarning = () => {
    const warnImageSrc = 'https://png2.cleanpng.com/sh/e7d54f647617ebfe6feb8fa64ae5d38d/L0KzQYi4UsE3N5dpSpGAYUO4QrOCg8dmbJRoSJC9MES2Q4SBVcE2OWQ5S6Y5MUK4QYq9TwBvbz==/5a352b9c7edcc0.4043338515134340125196.png'
    return (
        <div>
            <img alt='warning' style={{objectFit: 'contain', height: '40px'}} src={warnImageSrc}/>
            please, watch the full video
        </div>
    )
}