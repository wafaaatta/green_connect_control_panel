import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./constants/app_routes";
import AdminLayout from "./Layout";

const router = createBrowserRouter([
    {

    },
    {
        path: AppRoutes.HOME,
        element: <AdminLayout />,
        children: [
            {
                path: AppRoutes.HOME,
                element: <div>Home</div>
            }
        ]
    }
])

export default router