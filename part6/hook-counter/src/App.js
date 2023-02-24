import Display from "./components/Display"
import Button from "./components/Button"

const App = () => {

  return (
    <>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </>

  )
}

export default App