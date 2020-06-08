import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { navigate } from 'hookrouter'
import { socketToWebServer } from '../../SocketIoClient'
import { isConnectedToRoom } from '../../Redux/Actions'

export const MeasureDialog = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const _dispatch = useDispatch()

  const loggedUser = useSelector(state => state.MainReducer.loggedUser)
  const ip = useSelector(state => state.MainReducer.ip)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
      setOpen(true)
  },[])

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <CloseIcon style={{alignSelf: 'flex-end', margin: '10px'}} onClick={handleClose}/>
        <DialogTitle id="responsive-dialog-title">{"Recomendation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {loggedUser.name}, your metrics of attention and meditation is low. 
            recommended to take a break and do one of the recommended activities.
            You can choose to continue to learn and watch the video.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Continue to learn
          </Button>
          <Button onClick={() => {
                    setOpen(false)
                    socketToWebServer.emit('break session', ({email: loggedUser.userEmail, ip}))
                    _dispatch(isConnectedToRoom(false))
                    navigate('/Recommendations') 
                }} 
                color="primary" autoFocus>
            Break from Learning
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}