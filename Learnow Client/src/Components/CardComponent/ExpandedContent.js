import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import { TextType } from '../TextType/TextType'

export const ExpandedContent = ({expandedText}) => {
    const renderContent = () => {
        return expandedText.map((element, index) => {            
            return <TextType header={index % 2 === 0 ? true : false} key={index} style={{margin: 10}}>{element}</TextType>
        })
    }

    return (
        <CardContent>
            {renderContent()}
        </CardContent>
    )
}