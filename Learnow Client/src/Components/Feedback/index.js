import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'

import { Loading } from '../Loading'
import { socketToWebServer } from '../../SocketIoClient'
import { FlipCards } from './FlipCards'
import { FeedbackChart } from './FeedbackChart'

export const Feedback = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)

    const [allComparisonData, setAllComparisonData] = useState(null)
    const [howHelpfull, setHowHelpfull] = useState([])
    const [sumImprovment, setSumImprovment] = useState([])
 
    useEffect(() =>{
        if(howHelpfull.length > 0)
            sumImprovementForEachActivity()
    },[howHelpfull])

    useEffect(() => {
        if(allComparisonData && howHelpfull.length === 0){
            sumImprovementForEachComparationSession()
        }
    },[allComparisonData])

    useEffect(() => {
        socketToWebServer.on('all comparison', (data) => {
            if(data) {
                setAllComparisonData(data)
            }
        })
        displayCards()
        return () => socketToWebServer.off('all comparison')
    },[])

    /** return true if activity already exists in array */
    const activityExist = (arr, activity) => {
        return arr.some(e => {
            return e.activity === activity
        })
    }
    
    /** sum improvement of each comparation between sessions */
    const sumImprovementForEachComparationSession = () => {
        allComparisonData.forEach(element => {
            if(element.activity[1] !== 'None') {
                const how_helpfull = {
                    activity: element.activity[1],
                    help: {
                        low: 0,
                        medium: 0,
                        high: 0
                    }
                }
                Object.values(element.comparisonData).forEach(value => {
                    switch (value) {
                        case 'low':
                            const low = how_helpfull.help.low + 1 
                            how_helpfull.help.low = low
                            break
                        case 'medium':
                            const medium = how_helpfull.help.medium + 1 
                            how_helpfull.help.medium = medium
                            break
                        case 'high':
                            const high = how_helpfull.help.high + 1 
                            how_helpfull.help.high = high
                            break
                        default:
                            break;
                    }
                })
                setHowHelpfull(prev => [...prev, how_helpfull])
            }
        })
    }

    /** sum improvement of each type of activity */
    const sumImprovementForEachActivity = () => {
        var tempArray = []
        howHelpfull.forEach(element => {
            if (tempArray.length > 0){
                tempArray.forEach((elem, index) => {
                    if (element.activity === elem.activity){
                        tempArray[index] = {
                            low: elem.low + element.help.low,
                            medium: elem.medium + element.help.medium, 
                            high: elem.high + element.help.high, 
                            activity: element.activity
                        }
                    }
                    else if(!activityExist(tempArray, element.activity)){
                        tempArray.push({
                            low: element.help.low, 
                            medium: element.help.medium, 
                            high: element.help.high, 
                            activity: element.activity
                        })
                    }
                })
            }
            else{
                tempArray.push({
                    low: element.help.low, 
                    medium: element.help.medium, 
                    high: element.help.high, 
                    activity: element.activity
                })
            }
        })
        setSumImprovment(tempArray)
    }
  
    const displayCards = () => {
        if(loggedUser.userType === 'student')
            socketToWebServer.emit('get all comparison', loggedUser.email)
        else
            socketToWebServer.emit('get all comparison', studentForResearch.email)
    }

    return loggedUser.userType === 'student' ?
        sumImprovment.length > 0 ?         
            <FlipCards sumImprovment={sumImprovment}/> 
            : 
            howHelpfull.length === 0 ?
                <FlipCards/>
                : 
                <Loading/>
        :
        sumImprovment.length > 0 ? 
            <div style={{paddingTop: 20}}>
                <FeedbackChart sumImprovment={sumImprovment}/> 
            </div>        
            : 
            null
}