import { useState } from "react"

const Toggable = (props) => {
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

export default Toggable