import Axios from 'axios'
import { LocalStorage } from 'quasar'
const URI = process.env.API

export default {
  async login (data) {
    const user = await Axios.post(`${URI}/auth`, data)
    LocalStorage.set('user', user.data)
    return user
  }
}
