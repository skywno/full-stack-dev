import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: 'what the fuck?' }

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log('notification state', JSON.parse(JSON.stringify(state)))
      console.log('action', action)
      // state.value = action.payload
      return { value: action.payload }
    },
    removeNotification(state) {
      // state.value = ''
      return { value: '' }
    }
  }
})

export const { setNotification, removeNotification } = notificationReducer.actions
export default notificationReducer.reducer