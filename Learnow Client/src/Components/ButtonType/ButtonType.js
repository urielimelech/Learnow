import React from 'react'
import { Button, OutlinedInput } from '@material-ui/core'

export const ButtonType = ({children, style, onClick, ...props}) => {

        return <button  style={{...style, border : '2px solid #35C2C0', outline: 0, borderRadius: 5, background: 'linear-gradient(to right, #0ce9ed, #35C2C0)', minWidth: 100, minHeight: 40}} onClick={onClick}>{children}</button>
}