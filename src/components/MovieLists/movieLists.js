// Component import
import './movieLists.css';

// Tools React import
import { Link } from 'react-router-dom';

// Display movie lists
function MovieLists() {
    return (
        <div className="flex flex-col space-y-7 mt-7">
            <Link to="/movielists/done" className="button btn-list">
                Terminé
            </Link>
            <Link to="/movielists/in-progress" className="button btn-list">
                En cours
            </Link>
            <Link to="/movielists/to-watch" className="button btn-list">
                A regarder
            </Link>
        </div>
    )
}

export default MovieLists;