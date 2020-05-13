import React, { useEffect } from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export const ExpandedContent = ({expandedText}) => {
    const renderContent = () => {
        return expandedText.map((element, index) => {
            return element.startsWith('https') ? 
            // <a href={element} target="_blank">
            //     <img alt ='youtube' style={{height: '35px', width: '50px'}} src = {require('../../images/youtube.png')}/></a>
            <a key={index} href= {element} target="_blank"> Recommendation</a>
            : <Typography key={index} paragraph>{element}</Typography>
        })
    }

    return (
        <CardContent>
            {renderContent()}
        </CardContent>
    )
}