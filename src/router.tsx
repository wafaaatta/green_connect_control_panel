import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./constants/app_routes";
import AdminLayout from "./Layout";
import AdminDashboard from "./views/AdminDashboard";
import UsersPage from "./views/Users";
import ArticleCategoriesPage from "./views/ArticleCategories";
import ArticlesPage from "./views/Articles";
import AnnouncesPage from "./views/Announces";
import ViewArticlePage from "./views/ViewArticle";
import EventsPage from "./views/Events";
import ManagersPage from "./views/Managers";

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
            {
                path: AppRoutes.VIEW_ARTICLE,
                element: <ViewArticlePage />
            },
            {
                path: AppRoutes.ANNOUNCES,
                element: <AnnouncesPage />
            },
            {
                path: AppRoutes.EVENTS,
                element: <EventsPage />
            },
            {
                path: AppRoutes.ARTICLES,
                element: <ArticlesPage />
            },
            {
                path: AppRoutes.MANAGERS,
                element: <ManagersPage />
            },
        ]
    }
])

export default router