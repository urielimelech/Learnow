import { socketToWebServer } from "../../SocketIoClient"
import { useEffect, useState } from "react"
import { useSelector }from 'react-redux'

export const SessionsComparator = () => {

    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

    const [comparisonResult, setComparisonResult] = useState(null)

    useEffect(() => {
        if (Object.keys(lastSessionData).length !== 0)
            socketToWebServer.emit('compare sessions', lastSessionData)
        socketToWebServer.on('compared sessions', result =>{
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