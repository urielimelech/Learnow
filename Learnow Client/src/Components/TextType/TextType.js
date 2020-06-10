import React from 'react'
import './font.css'

export const TextType = ({children, style, ...props}) => {
        const header = props.header
        const content = props.content

        return <div 
        style={
                {...style, 
                fontFamily: 'Rubik',
                fontSize: header ? header : content,
                fontWeight: header ? 'bold' : null
                }} 
        >
                {children}
        </div>
}