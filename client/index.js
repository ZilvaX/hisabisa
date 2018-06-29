import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import hisabisaApp from './reducers'
import { Provider } from 'react-redux'

import 'typeface-roboto'

const store = createStore(hisabisaApp, applyMiddleware(logger))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
