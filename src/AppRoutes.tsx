import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageResaurantPage from "./pages/ManageResaurantPage";
import SearchPage from "./pages/SearchPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><Home /> </Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<ProtectedRoute />} >
                <Route path="/me" element={<Layout> <UserProfilePage /> </Layout>} />
                <Route path="manage-restaurant" element={<Layout> <ManageResaurantPage /> </Layout>} />
                <Route path="/my-order-status" element={<Layout> <OrderStatusPage /> </Layout>} />
            </Route>
            <Route path="/search/:city" element={<Layout> <SearchPage /> </Layout>} />
            <Route path="/detail/:restaurantId" element={ <Layout> <RestaurantDetailPage /> </Layout>} />
        </Routes>
    )
};


export default AppRoutes;