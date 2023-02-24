import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

import counterReducer from './reducer'
const store = createStore(counterReducer)
const buttonHandler = (pick) => {
  const action = {
    type: `${pick}`
  }
  store.dispatch(action)
}

const App = () => {
  return (
    <>
      <div>
        <button onClick={() => buttonHandler('GOOD')}>good</button>
        <button onClick={() => buttonHandler('OK')}>ok</button>
        <button onClick={() => buttonHandler('BAD')}>bad</button>
        <button onClick={() => buttonHandler('ZERO')}>reset stats</button>
      </div>
      <div>
        good {store.getState().good}
      </div>
      <div>
        ok {store.getState().ok}
      </div>
      <div>
        bad {store.getState().bad}
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

