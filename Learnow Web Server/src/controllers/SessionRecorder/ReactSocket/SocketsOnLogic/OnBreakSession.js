export const onBreakSession = (serverIOService, rooms, ip) => {
    
    /** dissconnect the sensors when the user choose to break the session */
    serverIOService.sockets.in(ip).emit('session ended by quiz', )

    /** delete the room and the users in the room */
    serverIOService.of('/').in(ip).clients((error, sockets) => {
        if (error) throw error
        sockets.forEach(s => {
            serverIOService.sockets.sockets[s].leave(ip)
        })
    })

    /** delete the break session before sending to DB */
    rooms.forEach(e => {
        if(e.roomName === ip)
            rooms.splice(e.roomNumber - 1, 1)
    })
}