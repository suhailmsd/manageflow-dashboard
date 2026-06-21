import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import FirebaseProvider from "./providers/FirebaseProvider.jsx";
import UserProvider from "./providers/UserProvider.jsx";
import UsersListProvider from "./providers/UsersListProvider.jsx";
import ToastProvider from "./providers/ToastProvider.jsx";
import PermissionProvider from "./providers/PermissionProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <FirebaseProvider>
        <UserProvider>
          <PermissionProvider>
            <UsersListProvider>
              <App />
            </UsersListProvider>
          </PermissionProvider>
        </UserProvider>
      </FirebaseProvider>
    </ToastProvider>
  </StrictMode>,
);
