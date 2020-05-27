import axios from 'axios'
import { dbURL } from '../../../../dbUrl.js'

export const onGetAllComparison = (soc, email) => {
    axios.get(`${dbURL}/getAllComparisonResult?userEmail=${email}`)
    .then(res => { 
        soc.emit('all comparison', res.data)
    })
    .catch(err => {
        soc.emit('all comparison', null)
        console.log(err)
    })
}