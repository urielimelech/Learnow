import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { CardComponent } from '../CardComponent'
import { resetStyleList } from '../../Redux/Actions'

export const SessionList = ({userSessions, email}) => {

    const [compareSession, setCompareSession] = useState([])
    const [isBtnDisable, setIsBtnDisable] = useState(true)

    const resetStyle = useSelector(state => state.MainReducer.resetStyle)
    const _dispatch = useDispatch()

    /** check if session is already selected
     *  additional press, unselect the session */
    const onClickSession = chosenSessions => {
        for (let j = chosenSessions.length - 1; j >= 0; j--) {
            for (let i = 0; i < j; i++) {
                if (chosenSessions[i].startTimeStamp === chosenSessions[j].startTimeStamp) {
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

    /** list of session cards components */
    const userSessionsList = () => {
        return userSessions.map((session, index) => {
            const date = new Date(session.startTimeStamp)
            const dateOfSession = date.toDateString()
            const timeOfSession = date.toTimeString()
            const headerText = `Session number ${index + 1}`
            const detailText = 
                <div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Date Of Session: {dateOfSession}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Date Of Time: {timeOfSession}
                    </Typography>
                </div>
            const ButtonText = 'Select Session'
            const OnClickButton = () => {
                onClickSession([...compareSession, session])
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

    return (
        <div>
            {userSessionsList()}
            {/* <Button onClick={compareSessions} disabled={isBtnDisable}>Compare</Button> */}
            <button onClick={compareSessions} disabled={isBtnDisable} className="btn btn-primary">
                Compare Now
            </button>
        </div>
    )
}