import { useEffect, useState } from 'react'
import { useSelector }from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'

export const SessionsComparator = () => {

    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const [comparisonResult, setComparisonResult] = useState(null)

    useEffect(() => {
        if (Object.keys(lastSessionData).length !== 0) {
            socketToWebServer.emit('compare sessions', {sessionData: lastSessionData, email: loggedUser.email})
        }
        socketToWebServer.on('compared sessions', result => {
            setComparisonResult(result)
        })
    },[])

    useEffect(() => {
        if (comparisonResult !== null){
            console.log(comparisonResult)
        }
    },[comparisonResult])

    return null
}