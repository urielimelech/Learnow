import { connectionOptions } from './options/ConnectionsOptions.js'
import { recordingCommands } from './options/RecordingCommands.js'

// import { createConnection } from 'net'

import socketIOClient from "socket.io-client"
import React, { useState, useEffect } from 'react'

export const NeuroSkyConnector = () => {

    const urlEndPoint = "localhost:13854"
    const[response, setResponse] = useState([])
    const[endPoint, setEndPoint] = useState("")
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        // connectToNeuroSky()
        setEndPoint(urlEndPoint);
        // // const newSocket = io(endPoint)
        // setSocket(socketIOClient(endPoint))
        // console.log({socket})
        // socket.on('connect', () => {
        //     console.log('connected')
        // })
        // if(socket){
        //     socket.connect()
        //     socket.emit(JSON.stringify(recordingCommands.get_as_json), (data) => {
        //         console.log(data)
        //     })
        //     socket.on('data', data =>setResponse(data))
        // }
            
    },[])

    useEffect(() => {
        setSocket(socketIOClient(endPoint))
    },[endPoint])

    useEffect(() => {
        if (socket !== null) {
            console.log(socket.io.uri)
            var newSocket = socket
            newSocket.io.uri = 'localhost:13854'
            setSocket(newSocket)
            socket.on('data', (data) => {
                console.log("connected")
                setResponse(data)
            })
        }
    },[socket])

    useEffect(()=>{
        console.log(response)
    },[response])

    // const connectToNeuroSky = () => {
    //     setEndPoint(urlEndPoint);
    //     // const newSocket = io(endPoint)
    //     setSocket(socketIOClient(endPoint))
    //     console.log({socket})
    //     socket.on('connect', () => {
    //         console.log('connected')
    //     })

    // }
    // useEffect(() =>{
    //     setSocket(socketIOClient(endPoint))
    //     console.log({socket})
    //     socket.on('connect', () => {
    //         console.log('connected')
    //     })
    // },[socket])

    return <div>
        hello
        {response}
    </div>


}

// export const createSocketToNeuroskyHeadset = createConnection(connectionOptions, () => {
//     createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.get_as_json))
//     createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.authorization))
//     createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.get_app_names))
//     createSocketToNeuroskyHeadset.write(JSON.stringify(recordingCommands.start_recording))
// })