import React, {useState, useEffect} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { useTheme } from '@material-ui/core/styles'
import axios from 'axios'
import { dbURL } from '../../consts'
import { getLastSessionData, chooseActivity } from '../../Redux/Actions'
import { ButtonType } from '../ButtonType/ButtonType'

export const BreakSessionDialog = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const _dispatch = useDispatch()

  const loggedUser = useSelector(state => state.MainReducer.loggedUser)
  const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

  const handleClose = () => {
    setOpen(false);
  }

  const getLastUserSessionData = () => {
      axios.get(`${dbURL}/getUserLastSession?userEmail=${loggedUser.email}`)
      .then(res => {
        _dispatch(getLastSessionData(res.data))
    })
      .catch(err => {
        console.log({err})
    })  
  }
  
  useEffect(()=>{
    if(Object.keys(lastSessionData).length > 0){
      if(lastSessionData.activity !== 'None' && lastSessionData.isBroken)
        setOpen(true)
    }
  },[lastSessionData])

  useEffect(()=>{
      getLastUserSessionData()
  },[])
  
  return (
    <div>
      {lastSessionData.activity !== 'None' ? 
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <CloseIcon style={{alignSelf: 'flex-end', margin: '10px'}} onClick={handleClose}/>
          <DialogTitle id="responsive-dialog-title">{"Welcome Back"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Welcome back {loggedUser.name}, Have you done the activity {lastSessionData.activity}? 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonType autoFocus onClick={handleClose} color="primary">
              No
            </ButtonType>
            <ButtonType onClick={() => {
                      setOpen(false)
                      _dispatch(chooseActivity(lastSessionData.activity))
                  }} 
                  color="primary" autoFocus>
              Yes
            </ButtonType>
          </DialogActions>
        </Dialog>
      :
        null}
    </div>
  )
}