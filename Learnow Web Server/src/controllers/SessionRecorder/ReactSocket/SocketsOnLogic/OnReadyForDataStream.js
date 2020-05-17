export const onReadyForDataStream = (rooms, ip, email, activity) => {
    console.log('user started video in room', ip, email, activity)
    rooms.forEach(e => {
        if (e.roomName === ip) {
            e.isReadyForVideo = true
            e.sessionData.userEmail = email
            e.sessionData.activity = activity
        }
    })
}