import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export const ExpandedContent = ({expandedText}) => {
    const renderContent = () => {
        return expandedText.map((element, index) => {
            return <Typography key={index} paragraph>{element}</Typography>
        })
    }

    return (
        <CardContent>
            {renderContent()}
        </CardContent>
    )
}