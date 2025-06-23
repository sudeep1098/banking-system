import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import KYCVerification from "./pages/KYCVerification";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Loans from "./pages/Loans";
import Insurance from "./pages/Insurance";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/kyc" element={
                <ProtectedRoute>
                    <KYCVerification />
                </ProtectedRoute>
            } />
            <Route path="/transactions" element={
                <ProtectedRoute>
                    <Transactions />
                </ProtectedRoute>
            } />
            <Route path="/cards" element={
                <ProtectedRoute>
                    <Cards />
                </ProtectedRoute>
            } />
            <Route path="/loans" element={
                <ProtectedRoute>
                    <Loans />
                </ProtectedRoute>
            } />
            <Route path="/insurance" element={
                <ProtectedRoute>
                    <Insurance />
                </ProtectedRoute>
            } />
            <Route path="/settings" element={
                <ProtectedRoute>
                    <AccountSettings />
                </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default Layout;