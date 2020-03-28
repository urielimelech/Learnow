import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socketToWebServer } from '../../SocketIoClient'
import { isConnectedToRoom, updateRoomNumber } from '../../Redux/Actions'
import { navigate } from 'hookrouter'


export const RoomNumberForm = () => {

    const _dispatch = useDispatch()
    const [input, setInput] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const roomNumber = useSelector(state => state.MainReducer.roomNumber)
    // console.log({roomNumber})


    useEffect(()=>{
        console.log({roomNumber})
        _dispatch(updateRoomNumber(input))
        console.log(input)
        console.log({roomNumber})
      },[roomNumber])

    useEffect(()=>{
    console.log({roomNumber})
    _dispatch(updateRoomNumber(input))
    console.log(input)
    console.log({roomNumber})
    },[isConnected])

    const handleSubmit = event => {
        event.preventDefault()
        socketToWebServer.emit('add client to room', input)
        socketToWebServer.on('TGC collector and React are connected', () => {
            /** dispatch a variable to render video */
            setIsConnected(true)
            // _dispatch(updateRoomNumber(input))
            // console.log(input)
            _dispatch(isConnectedToRoom(true))
            navigate('/Session')
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
