import { useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const navigate = useNavigate()

    //Load the authenticated user
    const { isLoading, isAuthenticated } = useUser()

    //Redirect if user is not authenticated
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login')
        }
    }, [isAuthenticated, isLoading, navigate])

    //Show loading spinner
    if (isLoading)
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner />
            </div>
        )

    if (isAuthenticated) return children
}

export default ProtectedRoute
