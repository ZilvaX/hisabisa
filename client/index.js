import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import hisabisaApp from './reducers'
import { Provider } from 'react-redux'

let middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger]
}
const store = createStore(hisabisaApp, applyMiddleware(...middleware))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
