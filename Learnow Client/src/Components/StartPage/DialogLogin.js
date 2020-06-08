import React, {useState, useEffect} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { Login } from '../Login'
import { ButtonType } from '../ButtonType/ButtonType'
import { Register } from '../Register'

export const DialogLogin = ({closeDialog}) => {

    const [isLogin, setIsLogin] = useState(null)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const handleClose = () => {
        closeDialog()
    }

    useEffect(()=>{
        setIsLogin(<Login/>)
    },[])

    return (
        <div>
          <Dialog
            fullScreen={fullScreen}
            fullWidth={useMediaQuery('(min-width:200px)')}
            open={true}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <CloseIcon style={{alignSelf: 'flex-end', margin: '10px'}} onClick={handleClose}/>
                {isLogin}
            <DialogActions>
                {isLogin && isLogin.type.name === "Register" ? 
                    null 
                : 
                    <div style={{margin: '0 auto'}}>
                        Not Registered Yet? 
                        <ButtonType onClick={() => setIsLogin(<Register/>)}>
                            SIGN UP
                        </ButtonType>
                    </div>
                } 
            </DialogActions>
          </Dialog>
        </div>
      )
    }