
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ShopProvider } from './contexts/ShopContext'

//context providers (AuthProvider MUST be the outer-most provider)
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  </React.StrictMode>
)
