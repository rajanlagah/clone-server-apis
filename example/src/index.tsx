import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('./sw.js')
        .then(() => console.log('service worker registered'))
        .catch((err) => console.log('service worker not registered', err))
    })
  }
window.addEventListener('fetch', () => console.log('fetching'))
ReactDOM.render(<App />, document.getElementById('root'))
