import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AppLayout from './ui/AppLayout'
import Dashboard from './pages/Dashboard'
import Plans from './pages/Plans'
import Drills from './pages/Drills'
import Tags from './pages/Tags'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'

const queryClinet = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClinet}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="plans" element={<Plans />} />
                        <Route path="drills" element={<Drills />} />
                        <Route path="tags" element={<Tags />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
