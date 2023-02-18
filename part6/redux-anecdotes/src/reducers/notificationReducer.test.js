import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notification', () => {
  const initialState = ''

  test('notify', () => {
    const action = {
      type: 'notification/setNotification',
      payload: 'hello this is notification'
    }
    const state = initialState

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toEqual({ value: 'hello this is notification' })
  })
})