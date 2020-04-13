import { writeSessionToDataBase } from '../../SessionWriterToDB/index.js'
import { SuggestionFeedback } from '../../Feedback/SuggestionFeedback/index.js'
import { Comparator } from '../../Comparator/index.js'
import { dbURL } from '../../../consts.js'
import axios from 'axios'

export const socketWithReact = (serverIOService, soc, rooms) => {

    soc.on('validate token', token => {
        axios.get(`${dbURL}/checkUserToken`, { headers: { 'x-jwt-token': token } })
            .then(res => {
                soc.emit('get dbToken', {success: res.data.success, message: res.data.message, token: res.data.token})
            })
            .catch(err=> soc.emit('get dbToken', {success: err.response.data.success, message: err.response.data.message})
            )
    })

    /** get register parameters from react and send to db if user can register */
    soc.on('register data', ({name, email, password}) => {
        const body = {
            name: name,
            email: email,
            password: password
        }
        axios.post(`${dbURL}/register`, body)
        .then(res => soc.emit('registration data', {name: name, token: res.data.token, success: res.data.success, message: res.data.message}))
        .catch(err => soc.emit('registration data', {success: err.response.data.success, message: err.response.data.message}))
    })

    /** get login parameters from react and send to db if user can login */
    soc.on('login data', ({email, password}) => {
        axios.get(`${dbURL}/login`, {
            params: {
                email: email,
                password: password
            }
        })
        .then(res => {
            soc.emit('logged data', {email: email, name: res.data.name, token: res.data.token, success: res.data.success, message: res.data.message})
        })
        .catch(err => {
            soc.emit('logged data', {success: err.response.data.success, message: err.response.data.message})
        })
    })
    
    /** add the react client to the room specified */
    soc.on('add client to room', roomNumber => {
        if (rooms.some(e => e.roomNumber === Number(roomNumber)) && serverIOService.sockets.adapter.rooms[`room ${roomNumber}`] !== undefined) {
            soc.join(`room ${roomNumber}`)
            serverIOService.sockets.in(`room ${roomNumber}`).emit('TGC collector and React are connected', )
        }
        else {
            soc.emit('room connection failed', )
            console.log('room connection failure')
        }
    })

    /** get notification from client if video ended */
    soc.on('end of video', roomNumber => {
        console.log('end of video')
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber) && e.sessionData.monitorData.length > 0)
                e.sessionData.startQuizStamp = e.sessionData.monitorData[e.sessionData.monitorData.length - 1].timeStamp
        })
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', roomNumber => {
        console.log('user started video in room', roomNumber)
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                e.isReadyForVideo = true
        })
        // console.log(rooms)
    })

    /** take the exact timestamp when the video played the answer */
    soc.on('answer in video', ({date, roomNumber}) =>{
        console.log('timeque', Date(date).toString())
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                e.sessionData.timeAnswersInVideo.push(date)
        })
    })

    /** when user complete the quiz */
    soc.on('end quiz', ({data, roomNumber}) =>{
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber) && e.sessionData.monitorData.length > 0){
                e.sessionData.quizData = data
                e.sessionData = writeSessionToDataBase(e.sessionData)
                e.isReadyForVideo = false
                serverIOService.sockets.in(`room ${roomNumber}`).emit('session ended by quiz', )
            }
        })
        console.log(`session ended in room ${roomNumber}`)
        // console.log(rooms)
    })

    /** sends to client the suggestions cards */
    soc.on('get suggestions cards', roomNumber => {
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                soc.emit('suggestions cards', SuggestionFeedback)
        })
    })

    /** get last ended session */
    soc.on('get last ended session', roomNumber => {
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                soc.emit('last ended session', e.sessionData)
        })
        // sessionData = dataSessionAnalysis(sessionData)
        // soc.emit('last ended session', sessionData)
    })

    /** send to client the comparison result between two sessions */
    soc.on('compare sessions', async sessionData =>{
        const comparison = await Comparator(sessionData)
        soc.emit('compared sessions', comparison)
    })

}