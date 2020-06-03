import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { CardComponent } from '../CardComponent'
import { resetStyleList } from '../../Redux/Actions'
import { StyledSessionListContainer, StyledCardComponent, StyledButtonContainer } from './SessionListStyle'

export const SessionList = ({userSessions, email, studentConfig}) => {

    const [compareSession, setCompareSession] = useState([])
    const [isBtnDisable, setIsBtnDisable] = useState(true)
    const [displayDuo, setDisplayDuo] = useState(true)

    const resetStyle = useSelector(state => state.MainReducer.resetStyle)
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
    const duoCompareSessions = () => {
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[1], secondSession: compareSession[0], studentConfig: studentConfig})
        setCompareSession([])
        _dispatch(resetStyleList(!resetStyle))
    }

    const quadCompareSessions = () => {
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[0][0], secondSession: compareSession[0][1], studentConfig: studentConfig})
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[1][0], secondSession: compareSession[1][1], studentConfig: studentConfig})
        socketToWebServer.emit('compare sessions', {sessionData: compareSession[1][0], secondSession: compareSession[0][0], studentConfig: studentConfig})
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
    const duoComparation = () => {
        userSessions.sort((aTimeStamp, bTimeStamp) => Number(bTimeStamp.startTimeStamp) - Number(aTimeStamp.startTimeStamp))
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
            return <CardComponent 
                key={index} 
                headerText={headerText} 
                detailText={detailText} 
                buttonText={ButtonText} 
                onClickButton={OnClickButton} 
                style={StyledCardComponent}
            />
        })
    }

    const quadComparation = () => {
        userSessions.sort((aTimeStamp, bTimeStamp) => Number(aTimeStamp.startTimeStamp) - Number(bTimeStamp.startTimeStamp) ? 1 : -1)
        const tempResearcherSessions = userSessions.map((session, index) => {
            const nextSession = userSessions[index + 1]
            if (session.activity != 'None' && nextSession && nextSession.activity === 'None') {
                return [session, nextSession]
            }
            else if (session.activity === 'None')
                return
        })
        const researcherSessions = tempResearcherSessions.filter(elem => elem !== undefined)
        return researcherSessions.map((session, index) => {
            const date0 = new Date(session[1].startTimeStamp)
            const date1 = new Date(session[0].startTimeStamp)
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
                        Activity: {session[0].activity}
                    </Typography>
                </div>
            const ButtonText = 'Select Session'
            const OnClickButton = () => {
                checkIfSessionIsChoosed([...compareSession, session])
            }
            return <CardComponent 
                key={index} 
                headerText={headerText} 
                detailText={detailText} 
                buttonText={ButtonText} 
                onClickButton={OnClickButton} 
                style={StyledCardComponent}
            />
        })
    }

    useEffect(() => {
        if (compareSession.length === 2)
            setIsBtnDisable(false)
        else 
            setIsBtnDisable(true)
    },[compareSession])

    return (
        <StyledSessionListContainer>
            <Button onClick={() => setDisplayDuo(true)}>
                Compare between two single sessions
            </Button>
            <Button onClick={() => setDisplayDuo(false)}>
                Compare between four single sessions
            </Button>
            {displayDuo ? duoComparation() : quadComparation()}
            <StyledButtonContainer>
                <button style={{width: '300px'}} onClick={() => displayDuo ? duoCompareSessions() : quadCompareSessions()} disabled={isBtnDisable} className="btn btn-primary">
                    Compare Now
                </button>
            </StyledButtonContainer>
        </StyledSessionListContainer>
    )
}