import { APP_COUNT_ADD, APP_COUNT_MINUS } from './types'

const addAppCount = (dispatch) => {
  return (data) => {
    dispatch({
      type: APP_COUNT_ADD,
      data
    })
  }
}

const minusAppCount = (dispatch) => {
  return (data) => {
    dispatch({
      type: APP_COUNT_MINUS,
      data
    })
  }
}

export default {
  addAppCount,
  minusAppCount
}