import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Button } from '@material-ui/core'
import { feedbackStyle, StyledCardFeedback, StyledImg, StyledFlipImg } from './FeedbackStyle'
import { ButtonType } from '../ButtonType/ButtonType'

export const FlipCard = ({title=null, img=null, onPressSelect=null, description=null, link=null}) => {
    
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = e => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" style={{justifyContent: 'center'}}>
            <StyledCardFeedback onClick={handleClick}>
                <h3>{title}</h3>
                <StyledImg src={img}/>
                <ButtonType onClick={onPressSelect} style={feedbackStyle.buttonStyle}>select</ButtonType>
            </StyledCardFeedback>   
            <StyledCardFeedback onClick={handleClick}>
                <StyledFlipImg src={img}/>
                <div>{[description, ' ', link]}</div>
                <ButtonType onClick={onPressSelect} style ={feedbackStyle.buttonStyle}>select</ButtonType>
            </StyledCardFeedback>
        </ReactCardFlip>
    )
}