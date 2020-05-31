export const onKillTGC = (serverIOService, soc) => {
    Object.keys(serverIOService.sockets.adapter.sids[soc.id]).forEach(roomName => {
        if (roomName !== soc.id)
            serverIOService.sockets.in(roomName).emit('session ended by quiz', )
    })
}