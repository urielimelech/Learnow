import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dbURL } from '../../consts'
import axios from 'axios'
import { TextMessageToastify } from '../TextMessageToastify'
import { HomePageResearch } from './HomePageResearch'
import { useDispatch, useSelector } from 'react-redux'
import { updateStudentForResearch } from '../../Redux/Actions'

export const ResearchUser = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
            top: 70
            }
        }
    }))

    const classes = useStyles()
    const _dispatch = useDispatch()
    const studentData = useSelector(state => state.MainReducer.studentForResearch)

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [isUserExistsErr, setIsUserExistsErr] = useState(false)
    const [studentForResearch, setStudentForResearch] = useState(null)

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault()
        handleClick()
    }

    const getStudentData = () => {
        axios.get(`${dbURL}/getStudentData?email=${email}`)
        .then(res => {
            _dispatch(updateStudentForResearch(res.data))
            setStudentForResearch(<HomePageResearch data={res.data}/>)
        })
        .catch(err => {
            console.log({err})
            setIsUserExistsErr(<TextMessageToastify msg={'user is not exists'}/>)
        })
    }

    const handleClick = () => {
        validateEmail()
        getStudentData()
    }

    const validateEmail = () => { 
        const validEmailRegex = 
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if(email.match(validEmailRegex)){
            setError(false)          
        }
        else {
            setError(true)
        }
    }

    useEffect(() => {
        if (studentData)
            setEmail(studentData.email)
    },[studentData])

    useEffect(() => {
        if (studentData) {
            setStudentForResearch(<HomePageResearch data={studentData}/>)
        }
    },[])
  
    return (
        <div style={{textAlign: 'center'}}>
            <form className={classes.root} onSubmit={handleSumbit}>
                <TextField
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Please enter student email"
                    variant="outlined"
                    onChange = {handleChange}
                    value={email}
                />
                {error ?
                    <FormHelperText 
                        style={{textAlign: 'center', color:'#FF0000', marginTop: '20px'}} 
                        id="component-error-text"
                    >
                        Invalid email
                    </FormHelperText>
                    :
                    null
                }
                {isUserExistsErr}
                <Button 
                    style={{ margin: '0 auto', backgroundColor:'blue',color: '#ffffff', top: 80, left: 30, height: 50, width: 80}}  
                    onClick={handleClick}
                    >
                        search
                </Button>
            </form>
            {studentForResearch}
        </div>
    )
}