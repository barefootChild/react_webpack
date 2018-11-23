import { TALK_SUBMIT } from './types'
import axios from 'axios'

const handleSubmit = (dispatch) => {
  return (params) => {
    return axios.post('http://10.232.46.156:8888/story/info', params)
  }
}

export default {
  handleSubmit
}