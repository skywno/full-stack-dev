import Notification from "./Notification"

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
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => onPasswordChange(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>


  )
}

export default LoginForm