// Component import
import './RedirectPage.css';

// Tools React import
import { Link } from 'react-router-dom';

// Function that displays a redirect page
function RedirectPage() {
    return (
        <>
            <div className="view">
                <div className="px-4 lg:py-12">
                    <div className="lg:gap-4 lg:flex">
                        <div className="view-item">
                            <h1 className="text-gradient big-text">Non connecté</h1>
                                <p className="normal-text">
                                    <span className="text-red-500">Oops!</span> Page non accessible</p>
                                <p className="">Vous ne pouvez pas accéder à cette page sans être connecté.</p>
                                <Link to={`/signin`}>
                                    <button className="button btn">S'identifier</button>
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RedirectPage;