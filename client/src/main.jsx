
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ShopProvider } from './contexts/ShopContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ShopProvider>
  </React.StrictMode>
)