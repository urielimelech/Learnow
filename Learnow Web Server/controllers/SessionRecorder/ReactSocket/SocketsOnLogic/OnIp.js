export const onIp = (serverIOService, soc, ip) => {
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
}