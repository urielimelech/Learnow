import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { notificationVisible } from "../../Redux/Actions"
import { ToastNotification } from "../Toastify"

export const TextMessageToastify = ({msg}) => {
    
    const _dispatch = useDispatch()

    useEffect(() => {
        _dispatch(notificationVisible(true))
    },[])

    return <ToastNotification renderComponent={msg}/>
}