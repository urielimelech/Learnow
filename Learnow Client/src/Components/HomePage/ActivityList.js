import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivitiesCards, chooseActivity } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select'

export const ActivityList = () => {

    const _dispatch = useDispatch()

    const activitiesCards = useSelector(state => state.MainReducer.activitiesCards)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const chosenActivity = useSelector(state => state.MainReducer.chooseActivity)

    const [activityList, setActivityList] = useState(null)
    const [activity, setActivity] = useState('')

    const renderActivityList = () => {
        const activityArr = activitiesCards.map((activity, index) => {
            return <MenuItem key={index} value={activity.Title}>{activity.Title}</MenuItem>
        })
        return [<MenuItem key={activitiesCards.length + 1} value='None'>None</MenuItem>, ...activityArr]
        // const costumElement = <MenuItem key={activitiesCards.length + 1} value='costum'>Costum Activity</MenuItem>
        // return [...activityArr, costumElement]
    }

    useEffect(() => {
        socketToWebServer.emit('get suggestions cards', loggedUser.email)
        socketToWebServer.on('suggestions cards', data => {
            _dispatch(setActivitiesCards(data))
        })
        // _dispatch(chooseActivity('None'))
        return () => {
            socketToWebServer.off('suggestions cards')
        }
    },[])

    useEffect(() => {
        setActivity(chosenActivity)
    },[chosenActivity])

    useEffect(() => {
        if (activitiesCards) {
            setActivityList(renderActivityList)
        }
    },[activitiesCards])

    // useEffect(() => {
    //     if (activity === 'costum') {
    //         handleClickOpen()
    //     }
    // },[activity])

    const handleChange = (event) => {
        setActivity(event.target.value)
        _dispatch(chooseActivity(event.target.value))
    }

    return (
        <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={activity ? activity : 'None'}
            onChange={handleChange}
        >
            {activityList}
        </Select>
    )
}