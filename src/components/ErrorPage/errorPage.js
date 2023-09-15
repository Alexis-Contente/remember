// Component import
import './errorPage.css';

// Tools React import
import { Link } from 'react-router-dom';

// This function display an 404 page if the user try to access a non-existent URL
function ErrorPage() {
    return (
        <>
            <div className="display">
                <div className="px-4 lg:py-12">
                    <div className="lg:gap-4 lg:flex">
                        <div className="displayMessage">
                            <h1 className="text-gradient style404">404</h1>
                                <p className="styleText">
                                    <span className="text-red-500 ">Oops! </span>Page not found</p>
                                <p className="styleFont">Je ne me REMEMBER pas d'avoir créé cette page.</p>
                                <Link to={`/`}>
                                    <button className="button btn">Accueil</button>
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;