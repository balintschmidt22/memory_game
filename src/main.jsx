import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './view/App'
import './index.css'
import PairNumberProvider from './state/PairNumber'
import GameProgressProvider from './state/GameProgress'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PairNumberProvider>
      <GameProgressProvider>
        <App />
      </GameProgressProvider>
    </PairNumberProvider>
  </React.StrictMode>,
)
