export const onAnswerInVideo = (rooms, date, ip) => {
    console.log('timeque', Date(date).toString())
    rooms.forEach(e => {
        if (e.roomName === ip)
            e.sessionData.timeAnswersInVideo.push(date)
    })
}