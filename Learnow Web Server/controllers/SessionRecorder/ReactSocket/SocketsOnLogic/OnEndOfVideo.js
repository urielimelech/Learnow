export const onEndOfVideo = (rooms, ip) => {
    console.log('end of video')
    rooms.forEach(e => {
        if (e.roomName === ip && e.sessionData.monitorData.length > 0)
            e.sessionData.startQuizStamp = e.sessionData.monitorData[e.sessionData.monitorData.length - 1].timeStamp
    })
}