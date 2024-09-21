import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./constants/app_routes";
import AdminLayout from "./Layout";
import AdminDashboard from "./views/AdminDashboard";
import UsersPage from "./views/Users";
import ArticleCategoriesPage from "./views/ArticleCategories";

const router = createBrowserRouter([
    {

    },
    {
        path: AppRoutes.HOME,
        element: <AdminLayout />,
        children: [
            {
                path: AppRoutes.HOME,
                element: <AdminDashboard />
            },
            {
                path: AppRoutes.USERS,
                element: <UsersPage />
            },
            {
                path: AppRoutes.ARTICLE_CATEGORIES,
                element: <ArticleCategoriesPage />
            },
        ]
    }
])

export default router