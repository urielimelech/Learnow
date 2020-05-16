import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { CardComponent } from '../CardComponent'
import { resetStyleList } from '../../Redux/Actions'
import { TextMessageToastify } from '../TextMessageToastify'

export const SessionList = ({userSessions, email}) => {

    const [compareSession, setCompareSession] = useState([])
    const [isBtnDisable, setIsBtnDisable] = useState(true)

    const resetStyle = useSelector(state => state.MainReducer.resetStyle)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const _dispatch = useDispatch()

    const needToSpliceMultipleSessions = (firstSession, secondSession) => {
        if (firstSession.startTimeStamp === secondSession.startTimeStamp)
            return true
        else
            return false
    }

    /** check if session is already selected
     *  additional press, unselect the session */
    const checkIfSessionIsChoosed = chosenSessions => {
        for (let j = chosenSessions.length - 1; j >= 0; j--) {
            for (let i = 0; i < j; i++) {
                if (chosenSessions[i].startTimeStamp === undefined) {
                    if (needToSpliceMultipleSessions(chosenSessions[i][0], chosenSessions[j][0])) {
                        const tempArr = [...chosenSessions]
                        tempArr.splice(j, 1)
                        tempArr.splice(i, 1)
                        setCompareSession(tempArr)
                        return
                    }
                }
                else if (needToSpliceMultipleSessions(chosenSessions[i], chosenSessions[j])) {
                    const tempArr = [...chosenSessions]
                    tempArr.splice(j, 1)
                    tempArr.splice(i, 1)
                    setCompareSession(tempArr)
                    return
                }
            }
        }
        setCompareSession(chosenSessions)
    }

    /** send to web server the sessions needed to compare */
    const compareSessions = () => {
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[1], email: email, secondSession: compareSession[0]})
        setCompareSession([])
        _dispatch(resetStyleList(!resetStyle))
    }

    const multiCompareSessions = () => {
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[0][1], email: email, secondSession: compareSession[0][0]})
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[1][1], email: email, secondSession: compareSession[1][0]})
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[1][1], email: email, secondSession: compareSession[0][1]})
        setCompareSession([])
        _dispatch(resetStyleList(!resetStyle))
    }

    const getExactTime = date => {
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
        return `${hours}:${minutes}:${seconds}`
    }

    /** list of session cards components */
    const studentSessionsList = () => {
        return userSessions.map((session, index) => {
            const date = new Date(session.startTimeStamp)
            const dateOfSession = date.toDateString()
            const timeOfSession = getExactTime(date)
            const headerText = `Session number ${index + 1}`
            const detailText = 
                <div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Date Of Session: {dateOfSession}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Time Of Session: {timeOfSession}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Activity: {session.activity}
                    </Typography>
                </div>
            const ButtonText = 'Select Session'
            const OnClickButton = () => {
                checkIfSessionIsChoosed([...compareSession, session])
            }
            return <CardComponent key={index} headerText={headerText} detailText={detailText} buttonText={ButtonText} onClickButton={OnClickButton}/>
        })
    }

    const researcherSessionsList = () => {
        if (userSessions.length % 2 === 1)
            return null
        const tempResearcherSessions = userSessions.map((session, index) => {
                if (session.activity === 'None') {
                    return [session, userSessions[index + 1]]
                }
        })
        const researcherSessions = tempResearcherSessions.filter(elem => elem !== undefined)
        return researcherSessions.map((session, index) => {
            const date0 = new Date(session[0].startTimeStamp)
            const date1 = new Date(session[1].startTimeStamp)
            const dateOfSession = date0.toDateString()
            const timeOfSession0 = getExactTime(date0)
            const timeOfSession1 = getExactTime(date1)
            const headerText = `Session number ${index + 1}`
            const detailText = 
                <div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Date Of Session: {dateOfSession}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Time Of First Session: {timeOfSession0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Time Of Second Session: {timeOfSession1}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Activity: {session[1].activity}
                    </Typography>
                </div>
            const ButtonText = 'Select Session'
            const OnClickButton = () => {
                checkIfSessionIsChoosed([...compareSession, session])
            }
            return <CardComponent key={index} headerText={headerText} detailText={detailText} buttonText={ButtonText} onClickButton={OnClickButton}/>
        })
    }

    useEffect(() => {
        if (compareSession.length === 2)
            setIsBtnDisable(false)
        else 
            setIsBtnDisable(true)
    },[compareSession])

    const researcherMustDoAnotherSession = () => {
        const researcherList = researcherSessionsList()
        if (researcherList) {
            return researcherList
        }
        else {
            return (
                <TextMessageToastify msg={'please run another session for comparation'}></TextMessageToastify>
            )
        }
    }

    return (
        <div>
            {loggedUser.userType === 'researcher' ? researcherMustDoAnotherSession() : studentSessionsList()}
            {/* <Button onClick={compareSessions} disabled={isBtnDisable}>Compare</Button> */}
            <button onClick={loggedUser.userType === 'researcher' ? multiCompareSessions : compareSessions} disabled={isBtnDisable} className="btn btn-primary">
                Compare Now
            </button>
        </div>
    )
}