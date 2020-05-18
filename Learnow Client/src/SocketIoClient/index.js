import socketIOClient from 'socket.io-client'

// const webServerURL = 'http://127.0.0.1:13855'
const webServerURL = 'https://learnow-web-server.herokuapp.com'
export const socketToWebServer = socketIOClient(webServerURL)