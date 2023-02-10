import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired
}

export default Notification