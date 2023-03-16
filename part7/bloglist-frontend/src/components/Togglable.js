import { useState } from 'react'

const Togglable = (props) => {
  const [formVisible, setFormVisible] = useState(false)

  const hideWhenFormVisible = { display: formVisible ? 'none' : '' }
  const showWhenFormVisible = { display: formVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  return (
    <>
      <div style={hideWhenFormVisible}>
        <button onClick={toggleVisibility}>new note</button>
      </div>
      <div style={showWhenFormVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

Togglable.displayName = 'Togglable'

export default Togglable