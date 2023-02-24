import { createContext, useContext, useReducer } from "react";


const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATED':
      return `you created, '${action.payload}'`
    case 'VOTED':
      return `anecdote '${action.payload}' voted`
    case 'RESET':
      return ''
    case 'ERROR':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext