import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import hisabisaApp from './reducers'
import { Provider } from 'react-redux'

import 'typeface-roboto'

const store = createStore(hisabisaApp, applyMiddleware(thunk, logger))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
