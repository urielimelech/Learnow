import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Button } from '@material-ui/core'
import { feedbackStyle } from './FeedbackStyle'

export const FlipCard = ({title=null, img=null, onPressSelect=null, description=null, link=null}) => {
    
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = e => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" style={{justifyContent: 'center'}}>
            <div onClick={handleClick} style={{backgroundColor: '#8DD4D2', borderRadius: '10px', border:' 2px solid #4CC6C4', height: '300px', width: '320px', margin: '20px'}}>
                <h3>{title}</h3>
                <img style={{ objectFit: 'contain',  height: '100px', width: '100px'}} src={img}></img>
                <Button onClick={onPressSelect} style={feedbackStyle.buttonStyle}>select</Button>
            </div>   
            <div onClick={handleClick} style={{backgroundColor: '#8DD4D2', borderRadius: '10px', border:' 2px solid #4CC6C4',  height: '300px', width: '320px', margin: '20px'}}>
                <img style={{ objectFit: 'contain', height: '100px', width: '100px'}} src={img}></img>
                <div>{[description, link]}</div>
                <Button onClick={onPressSelect} style ={feedbackStyle.buttonStyle}>select</Button>
            </div>
        </ReactCardFlip>
    )
}