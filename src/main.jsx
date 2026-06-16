import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FirebaseProvider from './Providers/FirebaseProvider.jsx'
import UserProvider from './Providers/UserProvider.jsx'
import UsersListProvider from './Providers/UsersListProvider.jsx'
import ToastProvider from './Providers/ToastProvider.jsx'
import AuthPermissionProvider from './Providers/AuthPermissionProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
    <FirebaseProvider>
      <UserProvider>
        <AuthPermissionProvider>
        <UsersListProvider>
    <App />
    </UsersListProvider>
     </AuthPermissionProvider>
    </UserProvider>
    </FirebaseProvider>
    </ToastProvider>
  </StrictMode>,
)
