// Component import
/* eslint-disable react-hooks/exhaustive-deps */
import './searchPage.css';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Loading from '../Loading/loading';
import axios from 'axios';

// Tools React import
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Function that displays a component with search results
function SearchPage() {

  const sampleLocation = useLocation();

  var i = sampleLocation.search.indexOf('=')
  const query = sampleLocation.search.slice(i+1);

  const [movieCategory, setMovieCategory] = useState(true);

  const [tvShowList, setTvShowList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const TMDB_API_KEY = 'edac6d7937b5e067060e9bc6e405b4e1';
  const TMDB_API_URL = 'https://api.themoviedb.org/3/';

  const getMoviesAndTvShowsByName = async () => {   
    axios.all([
      //http://api.themoviedb.org/3/search/movie?api_key=edac6d7937b5e067060e9bc6e405b4e1&query=Banshee
        axios.get(`${TMDB_API_URL}search/movie?api_key=${TMDB_API_KEY}&query=${query}`), 
        axios.get(`${TMDB_API_URL}search/tv?api_key=${TMDB_API_KEY}&query=${query}`)
    ])
    .then(axios.spread((response1, response2) =>{
      setMovieList(response1.data.results)
      setTvShowList(response2.data.results)
    }))
    .finally(() => {
      setLoading(false);
    })
    }

  useEffect(() => {
    getMoviesAndTvShowsByName()
  },
  [query]);

  return(
    <>
      <Header />
        { loading ? (<Loading />) : ( 
          <div className="page">
            <section className="mt-20 text-gray-800">
              <div className="section">
                <div className="flex justify-around flex-col">

                  <button 
                    className={movieCategory ? `active pb-2` : `notActive pb-2`} 
                    onClick={(e) =>  { 
                      e.preventDefault(); 
                      window.scroll(0,0) 
                      setMovieCategory(true)}}
                      >Film(s) ({movieList.length})
                  </button>
                  
                  <button 
                    className={movieCategory ?  `` : `font-bold`} 
                    onClick={(e) => { 
                      e.preventDefault();
                      window.scroll(0,0) 
                      setMovieCategory(false)}}
                      >Série(s) ({tvShowList.length})
                  </button>

                </div>
              </div>
            </section>

        {movieCategory ?  
          <div className="itemlist">
            {movieList.map(movie => (
              <Link to={`/movie/${movie.id}`}>
                <section key={movie.id} className="mt-20  text-gray-800">
                  <div className="item">
                    <div className="display-item">
                      <div className="image-size">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="Movie poster"
                          className="image" />
                      </div>
                      <div className="resume">
                        <div className="px-6">
                          <h2 className="title-item">{movie.title}</h2>
                            <p className="desktop">{movie.overview}</p>
                              <p className="mobile">{movie.overview.slice(0,120) + '...'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Link>          
            ))}
          </div>
  
        :

          <div className="itemlist">
            {tvShowList.map(tvShow => (
              <Link to={`/serie/${tvShow.id}`}>
                <section key={tvShow.id} className="mt-20  text-gray-800">
                  <div className="item">
                    <div class="display-item">
                      <div className="image-size">
                        <img src={`https://image.tmdb.org/t/p/w500/${tvShow?.poster_path}`} alt="Trendy Pants and Shoes"
                          className="image" />
                      </div>
                      <div className="resume">
                        <div className="px-6">
                          <h2 className="title-item">{tvShow.name}</h2>
                            <p className="desktop">{tvShow.overview}</p>
                              <p className="mobile">{tvShow.overview.slice(0,150) + '...'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Link>            
            ))}
          </div>
        }  

      </div>
    )}
  <Footer />
</>
)}

export default SearchPage;