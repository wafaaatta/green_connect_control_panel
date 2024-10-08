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
import AdminLoginPage from "./views/Login";
import ManageAuthorizations from "./views/ManageAuthorizations";
//import RequireAuth from "./components/RequireAuth";
import ContactSubmissions from "./views/ContactSubmissions";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
    {
        path: AppRoutes.LOGIN,
        element: <AdminLoginPage />
    },
    {
        path: AppRoutes.HOME,
        element: <RequireAuth><AdminLayout /></RequireAuth>,
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
            {
                path: AppRoutes.MANAGER_AUTHORIZATIONS,
                element: <ManageAuthorizations />
            },
            {
                path: AppRoutes.CONTACT_SUBMISSIONS,
                element: <ContactSubmissions />
            },
        ]
    }
])

export default router