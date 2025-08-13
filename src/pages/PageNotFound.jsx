import { NavLink } from 'react-router-dom'
import Button from '../ui/buttons/Button'

function PageNotFound() {
    return (
        <div className="max-w-main mx-auto flex gap-12 flex-col">
            <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
                <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                    <h1 className="mb-4 text-4xl font-bold">404</h1>
                    <p className="text-gray-600 mb-4">
                        Oops! The page you are looking for could not be found.
                    </p>
                    <Button type="button" align="center">
                        <NavLink to="/"> Go back to Home </NavLink>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
