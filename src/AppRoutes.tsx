import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageResaurantPage from "./pages/ManageResaurantPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><Home /> </Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<ProtectedRoute />} >
                <Route path="/me" element={<Layout> <UserProfilePage /> </Layout>} />
                <Route path="manage-restaurant" element={<Layout> <ManageResaurantPage /> </Layout>} />
            </Route>
        </Routes>
    )
};


export default AppRoutes;