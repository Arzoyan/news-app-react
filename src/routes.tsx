import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CircularProgress from '@mui/material/CircularProgress';

const Login = lazy(() => import('./pages/Login'));
const News = lazy(() => import('./pages/News'));
const Profile = lazy(() => import('./pages/Profile'));
const Home = lazy(() => import('./pages/Home'));

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Navbar />
                <Suspense fallback={<CircularProgress />}>
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                </Suspense>
            </>
        ),
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<CircularProgress />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: '/news',
        element: (
            <>
                <Navbar />
                <Suspense fallback={<CircularProgress />}>
                    <PrivateRoute>
                        <News />
                    </PrivateRoute>
                </Suspense>
            </>
        ),
    },
    {
        path: '/profile',
        element: (
            <>
                <Navbar />
                <Suspense fallback={<CircularProgress />}>
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                </Suspense>
            </>
        ),
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
