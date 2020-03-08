import http from 'http'

const options = {
    host:'127.0.0.1',
    port:'3000',
    path:'/addSession',
    method:'POST',
    // headers:{
    //     'Content-Length': 2048
    //     'Content-Type' : 
    // }
}

export const createSocketToSessionServer = http.request(options, (res) => {
    res.on('data', data => {
        // console.log('data: ' , data)
        process.stdout.write(data)
    })
    res.on('end', () => {
        // console.log('end session socket')
    })

    res.on('error', (error) => {
        // console.log('error: ', error)
    })

})