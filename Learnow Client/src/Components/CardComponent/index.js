import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'

import { ExpandButton } from './ExpandButton'

export const CardComponent = ({headerText, detailText, isAbleToExpand=false, expandedText=null, buttonText, onClickButton, img=null}) => {

    const useStyles = makeStyles({
        root: {
            maxWidth: 400
        },
        media: {
            height: 140
        }
    })

    const classes = useStyles()
    
    const [expanded, setExpanded] = useState(false)
    const [selectStyle, setSelectStyle] = useState(null)
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

    /** if card pressed, change style */
    useEffect(() => {
        isPressed ? setSelectStyle({border: '2px solid #ADD8E6', backgroundColor:'#FFFFF0'}) : setSelectStyle(null)
    },[isPressed])

    return (
        <Card className={classes.root} style={selectStyle}>
            <CardActionArea>
                {img ? 
                    <CardMedia
                        className={classes.media}
                        image={img}
                        title="Contemplative Reptile"
                    />
                    : 
                    null
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {headerText}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        {detailText}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={onSelect}>
                    {buttonText}
                </Button>
                {isAbleToExpand ? <ExpandButton isOpen={expanded} onClick={handleExpandClick}/> : null}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{expandedText}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}