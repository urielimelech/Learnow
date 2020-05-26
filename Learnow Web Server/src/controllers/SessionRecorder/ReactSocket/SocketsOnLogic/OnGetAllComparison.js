import axios from 'axios'
import { dbURL } from '../../../../dbUrl'

export const onGetAllComparison = (soc, email) => {
    axios.get(`${dbURL}/getAllComparisonResult?userEmail=${email}`)
    .then(res => { 
        soc.emit('all comparison', res.data)
    })
    .catch(err => {
        console.log(err)
    })
}