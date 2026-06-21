
import LoginPage from "../../pages/login";
import Header from "../../features/shared/components/header/Header";


export const authRoutes = {
    path: "/",
    element: <Header />,
    children: [{ index: true, element: <LoginPage /> }],
  };