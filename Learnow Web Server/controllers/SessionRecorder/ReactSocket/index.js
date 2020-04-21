import { writeSessionToDataBase } from '../../SessionWriterToDB/index.js'
import { SuggestionFeedback } from '../../Feedback/SuggestionFeedback/index.js'
import { Comparator } from '../../Comparator/index.js'
import { dbURL } from '../../../consts.js'
import { sessionObj } from '../SessionObject.js'
import axios from 'axios'

export const socketWithReact = (serverIOService, soc, rooms) => {

    /** when react is disconnecting */
    // soc.on('disconnect', () => {
    //     // console.log('line 11:', soc.id)
    //     const roomData = serverIOService.sockets.adapter.rooms
    //     // console.log({roomData})
    //     rooms.forEach(e => {
    //         if (e.react === soc.id){
    //             // console.log(e.neuro)
    //             if (e.neuro !== true){
    //                 // console.log('splice')
    //                 rooms.splice(e.roomNumber - 1, 1)
    //             }
    //         }
    //     })
    // })

    /** create room with ip as the name of the room or joining the client to an exist room */
    soc.on('ip', ip => {
        const roomData = serverIOService.sockets.adapter.rooms[ip] 
        /** check if room exists */
        if (!roomData){
            console.log('room not exist', ip)
            soc.emit('enter room', false)
        }
        /** enter to room acoording to the ip */
        else {
            console.log('room exist', ip)
            soc.join(ip)
            soc.emit('enter room', true)
        }
    })

    /** validate token with DB server */
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
        .catch(err => {
            if (err.response.data.message.hasOwnProperty('message'))
                soc.emit('registration data', {success: err.response.data.success, message: err.response.data.message.message})
            else 
                soc.emit('registration data', {success: err.response.data.success, message: err.response.data.message})
        })
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
    
    /** get notification from client if video ended */
    soc.on('end of video', ip => {
        console.log('end of video')
        rooms.forEach(e => {
            if (e.roomName === ip && e.sessionData.monitorData.length > 0)
                e.sessionData.startQuizStamp = e.sessionData.monitorData[e.sessionData.monitorData.length - 1].timeStamp
        })
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', ip => {
        console.log('user started video in room', ip)
        rooms.forEach(e => {
            if (e.roomName === ip)
                e.isReadyForVideo = true
        })
    })

    /** take the exact timestamp when the video played the answer */
    soc.on('answer in video', ({date, ip}) =>{
        console.log('timeque', Date(date).toString())
        rooms.forEach(e => {
            if (e.roomName === ip)
                e.sessionData.timeAnswersInVideo.push(date)
        })
    })

    /** when user complete the quiz */
    soc.on('end quiz', ({data, ip}) =>{
        rooms.forEach(e => {
            if (e.roomName === ip && e.sessionData.monitorData.length > 0){
                e.sessionData.quizData = data
                e.sessionData = writeSessionToDataBase(e.sessionData)
                e.isReadyForVideo = false
                serverIOService.sockets.in(ip).emit('session ended by quiz', )
            }
        })
        console.log(`session ended in room ${ip}`)
    })

    /** sends to client the suggestions cards */
    soc.on('get suggestions cards', ip => {
        rooms.forEach(e => {
            if (e.roomName === ip)
                soc.emit('suggestions cards', SuggestionFeedback)
        })
    })

    /** get last ended session */
    soc.on('get last ended session', ip => {
        rooms.forEach(e => {
            if (e.roomName === ip)
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