import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'

import { ExpandButton } from './ExpandButton'
import { ExpandedContent } from './ExpandedContent'
import { StyledCard } from './StyledCard'
import { ButtonType } from '../ButtonType/ButtonType'

export const CardComponent = ({headerText, detailText=null, isAbleToExpand=false, expandedText=null, buttonText=null, onClickButton=null, img=null, style=null, onClickCard=null}) => {
    
    const [expanded, setExpanded] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    
    const resetStyle = useSelector(state => state.MainReducer.resetStyle)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const onSelect = () => {
        onClickButton()
        setIsPressed(!isPressed)
    }

    /** reset card style after submit */
    useEffect(() => {
        setIsPressed(false)
    },[resetStyle])

    return (
        <StyledCard onClick={onClickCard} 
            marginr={style ? style.Card ? style.Card.marginRight ? style.Card.marginRight : 0 : null : null}
            margint={style ? style.Card ? style.Card.marginTop ? style.Card.marginTop : 0 : null : null}
            marginb={style ? style.Card ? style.Card.marginBottom ? style.Card.marginBottom : 0 : null : null}
            marginl={style ? style.Card ? style.Card.marginLeft ? style.Card.marginLeft : 0 : null : null}
            width={style ? style.Card ? style.Card.width ? style.Card.width : '100%' : null : null}
            height={style ? style.Card ? style.Card.height ? expanded ? style.expand.height : style.Card.height : '100%' : null : null}
            border={isPressed ? '2px solid #a9e4f7' : null}
            backgroundcolor={isPressed ? '#a9e4f7' : null}
        >
            <CardActionArea  style={{ display: 'flex', flexDirection: 'row'}} /*style = {style ? style.CardStyle : null}*/>
                {img ? 
                    <CardMedia style = {style ? style.CardImgStyle : null}
                        image={img}
                        component = "img"
                        title="Contemplative Reptile"
                    />
                    : 
                    null
                }
               {expanded ? 
                    null 
                :  
                    <CardContent style={style ? style.CardContent : null}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {headerText}
                        </Typography>
                        {
                            detailText ? 
                                <Typography variant="body2" color="textSecondary" component="div">
                                    {detailText}
                                </Typography> 
                            :
                                null
                        }
                    </CardContent>
                }
            </CardActionArea>
            <CardActions>
                {buttonText ?  <ButtonType style={{margin: '0 auto'}} size="small" color="primary" onClick={onSelect}>
                    {buttonText}
                </ButtonType> : null}
                {isAbleToExpand ? <ExpandButton isOpen={expanded} onClick={handleExpandClick}/> : null}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ExpandedContent expandedText={expandedText}/>
            </Collapse>
        </StyledCard>
    )
}