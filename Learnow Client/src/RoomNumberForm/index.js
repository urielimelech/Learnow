import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { socketToWebServer } from '../SocketIoClient'
import { isConnectedToRoom, updateRoomNumber } from '../Actions'



export const RoomNumberForm = () => {

    const _dispatch = useDispatch()
    const [input, setInput] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        socketToWebServer.emit('add client to room', input)
        socketToWebServer.on('TGC collector and React are connected', () => {
            /** dispatch a variable to render video */
            _dispatch(updateRoomNumber(input))
            _dispatch(isConnectedToRoom(true))
        })
        socketToWebServer.on('room connection failed', () => {
            /** try connect to the right room number */
            setInput('')
        })
    }

   return (
       <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Connect to Room Number: 
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
   )
}
