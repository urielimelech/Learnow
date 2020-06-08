import React from 'react'
import { Button } from '@material-ui/core'

export const ButtonType = ({children, style, onClick, type, ...props}) => {
        return type === 'Button' ?
        <Button 
                style={
                        {...style, 
                        border: '2px solid #35C2C0',
                        outline: 0, 
                        borderRadius: 5, 
                        background: 'linear-gradient(to right, #0ce9ed, #35C2C0)', 
                        minWidth: 100, 
                        minHeight: 40
                }} 
                onClick={onClick}
                type={type}
                >
                        {children}
        </Button> 
        :
        <button 
        style={
                {...style, 
                border: '2px solid #35C2C0',
                outline: 0, 
                borderRadius: 5, 
                background: 'linear-gradient(to right, #0ce9ed, #35C2C0)', 
                minWidth: 100, 
                minHeight: 40
        }} 
        onClick={onClick}
        type={type}
        >
                {children}
        </button>
}