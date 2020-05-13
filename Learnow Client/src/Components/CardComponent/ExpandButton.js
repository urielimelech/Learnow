import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


export const ExpandButton = ({isOpen, onClick}) => {
  
    const useStyles = makeStyles(theme => ({
      expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          })
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        }
    }))

    const classes = useStyles()

    return (
      <IconButton
          className={clsx(classes.expand, {
              [classes.expandOpen]: isOpen,
          })}
          onClick={onClick}
          aria-expanded={isOpen}
          aria-label="show more"
          >
          <ExpandMoreIcon />
      </IconButton>
    )
}