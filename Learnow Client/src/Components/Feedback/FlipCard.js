import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { StyledCardFeedback, StyledImg, StyledFlipImg, StyledTitleFlipCard } from './FeedbackStyle'
import { ButtonType } from '../ButtonType/ButtonType'
import { TextType } from '../TextType/TextType'
import { Button } from '@material-ui/core'

export const FlipCard = ({title=null, img=null, onPressSelect=null, description=null, link=null, ribbon=null}) => {
    
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = e => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

    const getRecommendation = link => {        
        window.open(link, '_blank')
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" style={{justifyContent: 'center'}}>
            <StyledCardFeedback onClick={handleClick}>
                <StyledTitleFlipCard>
                    <TextType header={30}>{title}</TextType>
                    {ribbon ? <StyledImg height={75} width={75} src={ribbon}/> : null}
                </StyledTitleFlipCard>
                <StyledImg src={img}/>
                <ButtonType onClick={onPressSelect}>select</ButtonType>
            </StyledCardFeedback>   
            <StyledCardFeedback onClick={handleClick}>
                <StyledTitleFlipCard>
                    <StyledFlipImg src={img}/>
                    {ribbon ? <StyledImg height={75} width={75} src={ribbon}/> : null}
                </StyledTitleFlipCard>
                <TextType style={{height:100}} content={15}>{[description]}</TextType>
                <Button><img  style={{height: 30, width: 30}} src={require('../../images/link.png')} onClick={() => getRecommendation(link)}></img> </Button>
                <ButtonType onClick={onPressSelect}>select</ButtonType>
            </StyledCardFeedback>
        </ReactCardFlip>
    )
}