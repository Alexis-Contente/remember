// Component import
import './serieLists.css';

// Tools React import
import { Link } from 'react-router-dom';

// Display serie lists
function SerieLists() {
    return (
        <div className="flex flex-col space-y-7 mt-7">
            <Link to="/serielists/done" className="button btn-list">
                Terminé
            </Link>
            <Link to="/serielists/in-progress" className="button btn-list">
                En cours
            </Link>
            <Link to="/serielists/to-watch" className="button btn-list">
                A regarder
            </Link>
        </div>
    )
}

export default SerieLists;