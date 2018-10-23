import { APP_COUNT_ADD, APP_COUNT_MINUS } from '../actions/types'

const handleActions = {
  [APP_COUNT_ADD]: function(state, action) {
    state.count += action.data
    return {...state}
  },
  [APP_COUNT_MINUS]: function(state, action) {
    state.count -= action.data
    return {...state}
  }
}

const app = (state = {count: 0}, action) => {
  if (action.type && handleActions[action.type]) {
    return handleActions[action.type](state, action)
  } else if (action.type) {
    return state
  }

  console.log('error: action.type有误!')
}

export default app