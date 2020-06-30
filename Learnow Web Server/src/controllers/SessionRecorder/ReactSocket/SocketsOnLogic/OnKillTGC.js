export const onKillTGC = (serverIOService, soc, rooms) => {
    console.log(serverIOService.sockets.adapter.sids[soc.id])
    Object.keys(serverIOService.sockets.adapter.sids[soc.id]).forEach(roomName => {
        /** check if socket is connected to another room and disconnect from them */
        if (roomName !== soc.id) {
            /** disconnect the react socket from neurosky room */
            serverIOService.sockets.in(roomName).emit('session ended by quiz', )
            console.log('room data:', serverIOService.sockets.adapter.rooms[roomName])
            /** clear room data */
            rooms.forEach(room => {
                if (room.roomName === roomName) {
                    rooms.splice(room.roomNumber - 1, 1)
                }
            })
        }
    })
}