import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: '', style: 'none' }

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log('notification state', JSON.parse(JSON.stringify(state)))
      console.log('action', action)
      // state.value = action.payload
      return { value: action.payload, style: 'block' }
    },
    clearNotification(state) {
      // state.value = ''
      return { value: '', style: 'none' }
    }
  }
})

export const { showNotification, clearNotification } = notificationReducer.actions

export const setNotification = (message, timeInSeconds) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}
export default notificationReducer.reducer