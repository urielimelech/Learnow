import React from 'react'
import { Button } from '@material-ui/core'

export const ButtonType = ({children, style, ...props}) => {
        return <Button style={style}>{children}</Button>
}