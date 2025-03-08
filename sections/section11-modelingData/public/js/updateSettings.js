// update data function 
import {showAlert} from './alerts'
import axios from 'axios'

export const updateData = async (data, type) => {
    const url = type === 'password'
        ? 'http://localhost:3000/api/v1/users/updateMyPassword'
        : 'http://localhost:3000/api/v1/users/updateMe'
    const res = await axios({
        method: 'PATCH',
        url,
        data
    })
    console.log('here is res.body : ', res.data)
    if(res.data.status === 'success') {
        showAlert('success',`${type.toUpperCase()} updated successfully`)
    } else {
        showAlert('error', 'failed to update ')
    }
}