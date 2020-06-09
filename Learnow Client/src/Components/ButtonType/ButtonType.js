import React from 'react'
import './font.css'

export const ButtonType = ({children, style, onClick, ...props}) => {
        const disabled = props.disabled
        return <button 
        style={
                {...style, 
                border: '2px solid #35C2C0',
                outline: 0, 
                borderRadius: 30, 
                background: 'linear-gradient(to right, #0ce9ed, #35C2C0)', 
                minWidth: 100, 
                minHeight: 40,
                color: '#ffffff',
                fontFamily: 'Rubik',
                fontSize: '14px',
                fontWeight: 700,
                padding: 10,
                opacity: disabled ? 0.5: 1
        }} 
        onClick={onClick}
        >
                {children}
        </button>
}