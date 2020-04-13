import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const ToastNotification = ({ renderComponent, autoClose, position }) => {
    const optionsToast = {
        position: position ? position : "top-center",
        autoClose: autoClose ? autoClose : 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    }

    const renderNotification = renderComponent => {
        console.log(renderComponent)
        return (
            <div>
                {renderComponent}
            </div>
        )
    }

    useEffect(() => {
        toast.warn(renderNotification(renderComponent), optionsToast)
        return
    },[])

    return  <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />  
}