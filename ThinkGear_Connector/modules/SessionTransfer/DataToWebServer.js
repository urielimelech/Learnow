import io from 'socket.io-client'

const options = {
    host:'127.0.0.1',
    port:'13855',
}

export const socketToWebServer = io(`http://${options.host}:${options.port}`)