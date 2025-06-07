// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppShell from '../components/layout/AppShell';

// Pages
import Homepage from '../pages/Home';
import ErrorPage from '../pages/Error';

// Lazy-loaded pages for code splitting
const TeamsList = lazy(() => import('../components/teams/TeamsList'));
const TeamDetail = lazy(() => import('../components/teams/TeamDetail'));
const DriversList = lazy(() => import('../components/drivers/DriversList'));
const DriverDetail = lazy(() => import('../components/drivers/DriverDetail'));
const CarGallery = lazy(() => import('../components/gallery/CarGallery'));
const CarDetail = lazy(() => import('../components/gallery/CarDetail'));
const GamesHub = lazy(() => import('../pages/GamesHub'));
const ReactionGame = lazy(() => import('../components/games/ReactionGame'));
const CircuitsList = lazy(() => import('../components/circuits/CircuitsList'));
const CircuitDetail = lazy(() => import('../components/circuits/CircuitDetail'));
const Calendars = lazy(() => import('../pages/Calendars'));
const Standings = lazy(() => import('../pages/Standings'));
const Live = lazy(() => import('../pages/Live'));

// Loading fallback
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppShell />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Homepage /> },
            {
                path: 'teams',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <TeamsList />
                            </Suspense>
                        )
                    },
                    {
                        path: ':teamId',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <TeamDetail />
                            </Suspense>
                        )
                    },
                ],
            },
            {
                path: 'drivers',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <DriversList />
                            </Suspense>
                        )
                    },
                    {
                        path: ':driverId',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <DriverDetail />
                            </Suspense>
                        )
                    },
                ],
            },
            {
                path: 'gallery',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <CarGallery />
                            </Suspense>
                        )
                    },
                    {
                        path: ':carId',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <CarDetail />
                            </Suspense>
                        )
                    },
                ],
            },
            {
                path: 'games',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <GamesHub />
                            </Suspense>
                        )
                    },
                    {
                        path: 'reaction',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <ReactionGame />
                            </Suspense>
                        )
                    },
                ],
            },
            {
                path: 'circuits',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <CircuitsList />
                            </Suspense>
                        )
                    },
                    {
                        path: ':circuitId',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <CircuitDetail />
                            </Suspense>
                        )
                    },
                ],
            },
            {
                path: 'standings',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Standings />
                    </Suspense>
                )
            },
            {
                path: 'calendar',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Calendars />
                    </Suspense>
                )
            },
            
            {
                path: 'live',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Live />
                    </Suspense>
                )
            },

        ],
    },
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}