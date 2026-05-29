import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseProvider from './Providers/FirebaseProvider.jsx'
import UserProvider from './Providers/UserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <UserProvider>
    <App />
    </UserProvider>
    </FirebaseProvider>
  </StrictMode>,
)
