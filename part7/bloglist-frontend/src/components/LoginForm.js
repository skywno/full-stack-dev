import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, username, onUsernameChange, password, onPasswordChange }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => onUsernameChange(target.value)}
            id='username-input'
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => onPasswordChange(target.value)}
            id='password-input'
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired
}



export default LoginForm