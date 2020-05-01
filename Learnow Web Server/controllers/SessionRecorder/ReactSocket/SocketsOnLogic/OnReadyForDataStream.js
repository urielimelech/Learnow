export const onReadyForDataStream = (rooms, ip, email) => {
    console.log('user started video in room', ip, email)
    rooms.forEach(e => {
        if (e.roomName === ip) {
            e.isReadyForVideo = true
            e.sessionData.userEmail = email
        }
    })
}