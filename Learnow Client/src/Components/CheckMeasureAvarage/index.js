import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { notificationVisible } from '../../Redux/Actions'
import { ToastNotification } from '../Toastify'

export const CheckMeasureAvarage = () => {

    const _dispatch = useDispatch()

    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)

    const [lowLevelWarning, setLowLevelWarning] = useState(null)

    useEffect(() => {
        socketToWebServer.on('avarage in worked session', ({attention, meditation}) => {
          const lowLevel = 30
          if (attention < lowLevel || meditation < lowLevel){
            _dispatch(notificationVisible(true))
            setLowLevelWarning(<ToastNotification renderComponent={'please pay attention to your meditation and attention'}/>)
          }
        })
      }, [])
      
    useEffect(() => {
        if (!isNotificationVisible)
            setLowLevelWarning(null)
    },[isNotificationVisible])

    return lowLevelWarning
}