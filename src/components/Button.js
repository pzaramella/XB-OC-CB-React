import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}))

export default function ButtonContained({type, color, name, onClick}) {
  const classes = useStyles()

  return (
    <div>
      <Button
        variant="contained"
        type={type}
        color={color}
        className={classes.button}
        onClick={onClick}
      >
        {name}
      </Button>
    </div>
  )
}
