import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import { ActivityList } from './ActivityList'
import { navigate } from 'hookrouter'
import { WrapperActivitySelection } from './ActivitySelectionStyle'
import { useSelector } from 'react-redux'
import { TextType } from '../TextType/TextType'

export const ActivitySelection = () => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2)
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    }))
    
    const classes = useStyles()
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    // const [open, setOpen] = useState(false)

    // const handleClickOpen = () => {
    //     setOpen(true)
    // }
    
    //   const handleClose = () => {
    //     setOpen(false)
    // }

    // const handleCostumChange = event => {
    //     setCostumActivity(event.target.value)
    // }

    // const [costumActivity, setCostumActivity] = useState('')

    const saveActivity = () => {
        navigate('/Session')
    }

    return (
        <WrapperActivitySelection>
            <FormControl className={classes.formControl} disabled={loggedUser.userType === 'researcher' ? true : false}>
                <InputLabel id="demo-simple-select-helper-label"><TextType>Activity</TextType></InputLabel>
                    <ActivityList/>
                <TextType style={{color: '#929595'}} content={14}>Select an activity that you finished right now</TextType>
            </FormControl>
            {/* <Button onClick={saveActivity}>Continue</Button> */}
            {/* <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="component-outlined">Activity</InputLabel>
                        <OutlinedInput id="component-outlined" value={costumActivity} onChange={handleCostumChange} label="Activity" />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog> */}
        </WrapperActivitySelection>
    )
}