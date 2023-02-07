const Notification = ({ message, flag }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={flag}>
      {message}
    </div>
  )
}

export default Notification