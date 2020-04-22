import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.min.css'

import { notificationVisible } from '../../Redux/Actions'

export const ToastNotification = ({ renderComponent, autoClose, position }) => {

    const optionsToast = {
        position: position ? position : "top-center",
        autoClose: autoClose ? autoClose : 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    }

    const _dispatch = useDispatch()

    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)

    useEffect(() => {
        toast.warn(renderComponent, optionsToast)
        setTimeout(() => {
            _dispatch(notificationVisible(false))
        }, optionsToast.autoClose + 1000)
    },[])

    return  (
        isNotificationVisible ? 
        <ToastContainer
                position={optionsToast.position}
                autoClose={optionsToast.autoClose}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            /> 
        : 
        null
    )
}