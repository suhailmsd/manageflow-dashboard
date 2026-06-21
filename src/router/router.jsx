import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./routes/authRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import { errorRoutes } from "./routes/errorRoutes";



const router = createBrowserRouter([
  authRoutes,
  dashboardRoutes,
  errorRoutes
]);

export default router;
