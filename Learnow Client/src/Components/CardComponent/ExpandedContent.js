import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import { TextType } from '../TextType/TextType'

export const ExpandedContent = ({expandedText}) => {
    const renderContent = () => {
        return expandedText.map((element, index) => {
            return <TextType key={index} paragraph>{element}</TextType>
        })
    }

    return (
        <CardContent>
            {renderContent()}
        </CardContent>
    )
}