export const onIp = (serverIOService, soc, rooms, userConfigs, ip, email) => {
    const roomData = serverIOService.sockets.adapter.rooms[ip] 
    /** check if room exists */
    if (!roomData){
        console.log('room not exist', ip)
        soc.emit('room closed', )
    }
    /** enter to room acoording to the ip */
    else {
        console.log('room exist', ip)
        soc.join(ip)
        serverIOService.sockets.in(ip).emit('open TGC', )
        soc.emit('enter room', )
        rooms.forEach(room => {
            if (room.roomName === ip) {
                userConfigs.forEach(userConfig => {
                    room.config = userConfig.config
                })
            }
        })
    }
}