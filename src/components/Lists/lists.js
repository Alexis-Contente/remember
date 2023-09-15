// Component import
import './lists.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import MovieLists from '../MovieLists/movieLists';
import SerieLists from '../SerieLists/serieLists';

// Tools React import
import { useState } from 'react';

// Function that displays lists according to the category of the element
function Lists () {

const [switched, setSwitched] = useState(false);

const handleSwitchMovie = () => {
  setSwitched(false)
}

const handleSwitchSerie = () => {
  setSwitched(true)
}

return (
        <>
            <Header />
                <div className="wrapper">
                    <div className="container-form">
                        <div className="flex flex-row justify-around">
                            <a href="#" onClick={handleSwitchMovie}>
                                <h1 className={`link-text ${switched ? "text-gray-200" : "text-gradient"} `}>Listes des films</h1>
                            </a>
                            <p className="link-text">ou</p>
                            <a href="#" onClick={handleSwitchSerie}>
                                <h1 className={`link-text ${switched ? "text-gradient" : "text-gray-200"} `}>Listes des séries</h1>
                            </a>
                        </div>
                        {/* ternary which displays the list of movies or series */}
                        {switched ? <SerieLists /> : <MovieLists />}
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default Lists;