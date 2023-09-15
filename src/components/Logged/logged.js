// Component import
import './logged.css';
import "react-multi-carousel/lib/styles.css";
import Loading from '../Loading/loading'

// Tools React import
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';

// Display of homepage while connected
function Logged() {


  // carousel responsive display
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  // API values
  const TMDB_API_KEY = 'edac6d7937b5e067060e9bc6e405b4e1';
  const TMDB_API_URL = 'https://api.themoviedb.org/3/';


  // Hooks to gather Axios responses
  const [popularMovies, setPopularMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [popularTvShow, setPopularTvShow] = useState([]);
  const [ratedTvShow, setRatedTvShow] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [onTheAirTvShow, setOnTheAirTvShow] = useState([]);

  // loader
  const [loading, setLoading] = useState(true);
  
  // actual year
  const actualYear = new Date().getFullYear();


// function to gather every API responses to generate our carousels
const getItemsForHomeLogged = async () => {   
        axios.all([
            axios.get(`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR`), 
            axios.get(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR`),
            axios.get(`${TMDB_API_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR`), 
            axios.get(`${TMDB_API_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR`),
            axios.get(`${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=fr-FR`),
            axios.get(`${TMDB_API_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&primary_release_date.gte=${actualYear}-01-01&primary_release_date.lte=${actualYear}-12-31&language=fr-FR`),
            axios.get(`${TMDB_API_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}&language=fr-FR`),
            

      ])
      .then(axios.spread((response1, response2, response3, response4, response5, response6, response7) =>{
        console.log(response1, response2, response3, response4, response5, response6, response7)
        setPopularMovies(response1.data.results);
        setRatedMovies(response2.data.results);
        setPopularTvShow(response3.data.results);
        setRatedTvShow(response4.data.results);
        setNowPlayingMovies(response5.data.results);
        setUpcomingMovies(response6.data.results);
        setOnTheAirTvShow(response7.data.results);
        
      }))
      .finally(() => {
        setLoading(false);
      })
    }

        useEffect(() => {
            getItemsForHomeLogged()
        },
        []);
      
  return (
    <>{loading ? (<Loading />) : 
      (
        <div className="main">
            <h1 className="text-4xl pb-6 tracking-widest uppercas">Bienvenue</h1>

            <div className='mb-4'>
              <h2 className="categorie">Films Populaires</h2>

              {/* Every carousels we display on our logged page */}
                <Carousel
                  className="sm:pb-3"
                  responsive={responsive}
                  swipeable={true}
                  draggable={false}
                  showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="invisible sm:visible custom-dot-list-style"
                  ssr={true}
                >
                {popularMovies.map(movie => (
                  <Link to={`/movie/${movie.id}`}>
                    <div key={movie.id} className="display-items">
                      <img className="image" src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="movie_poster"/>
                      <p className="title-items">{movie.title}</p>
                    </div>
                  </Link>
                  ))}
                </Carousel>
            </div>

            <div>
              <h2 className="categorie">Films Les Mieux Notés</h2>
                <Carousel 
                  className="sm:pb-3"
                  responsive={responsive}
                  swipeable={true}
                  draggable={false}
                  showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="invisible sm:visible custom-dot-list-style"
                  ssr={true}
                >
                {ratedMovies.map(movie => (
                  <Link to={`/movie/${movie.id}`}>
                    <div key={movie.id}  className="display-items">
                      <img className="image" src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="movie_poster"/>
                      <p className="title-items">{movie.title}</p>
                    </div>
                  </Link>
                  ))}
                </Carousel>
            </div>


          <div className='mb-4'> 
            <h2 className="categorie">Films en salles</h2>
              <Carousel 
                className="sm:pb-3"
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
            {nowPlayingMovies.map(movie => (
                <Link to={`/movie/${movie.id}`}>
                  <div key={movie.id}  className="display-items">
                    <img className="image" src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="movie_poster"/>
                    <p className="title-items">{movie.title}</p>
                  </div>
                </Link>
                ))}
              </Carousel>
          </div>

          <div className='mb-4'>
              <h2 className="categorie">Films à venir ce mois-ci</h2>
                <Carousel
                  className="sm:pb-3"
                  responsive={responsive}
                  swipeable={true}
                  draggable={false}
                  showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="invisible sm:visible custom-dot-list-style"
                  ssr={true}
                >
                {upcomingMovies.filter(movies => new Date(movies.release_date).getTime() > new Date().getTime()).map(movie => (
                  <Link to={`/movie/${movie.id}`}>
                    <div key={movie.id} className="display-items">
                      <img className="image" src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="movie_poster"/>
                      <p className="title-items">{movie.title}</p>
                    </div>
                  </Link>
                  ))}
                </Carousel>
            </div>

            <div className='mb-4'>
              <h2 className="categorie">Séries Populaires</h2>
                <Carousel 
                  className="sm:pb-3"
                  responsive={responsive}
                  swipeable={true}
                  draggable={false}
                  showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="invisible sm:visible custom-dot-list-style"
                  ssr={true}
                >
                {popularTvShow.map(tvshow => (
                  <Link to={`/serie/${tvshow.id}`}>
                    <div key={tvshow.id}  className="display-items">
                      <img className="image" src={`https://image.tmdb.org/t/p/w220_and_h330_face/${tvshow.poster_path}`} alt="tvShow_poster"/>
                      <p className="title-items">{tvshow.name}</p>
                    </div>
                  </Link>
                  ))}
                </Carousel>
            </div>

          <div className='mb-4'> 
            <h2 className="categorie">Séries Les Mieux Notés</h2>
              <Carousel 
                className="sm:pb-3"
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
            {ratedTvShow.map(tvshow => (
                <Link to={`/serie/${tvshow.id}`}>
                  <div key={tvshow.id}  className="display-items">
                    <img className="image" src={`https://image.tmdb.org/t/p/w220_and_h330_face/${tvshow.poster_path}`} alt="tvShow_poster"/>
                    <p className="title-items">{tvshow.name}</p>
                  </div>
                </Link>
                ))}
              </Carousel>
          </div>

          <div className='mb-4'> 
            <h2 className="categorie">séries actuellement diffusées</h2>
              <Carousel 
                className="sm:pb-3"
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
            {onTheAirTvShow.map(tvshow => (
                <Link to={`/serie/${tvshow.id}`}>
                  <div key={tvshow.id}  className="display-items">
                    <img className="image" src={`https://image.tmdb.org/t/p/w220_and_h330_face/${tvshow.poster_path}`} alt="tvShow_poster"/>
                    <p className="title-items">{tvshow.name}</p>
                  </div>
                </Link>
                ))}
              </Carousel>
          </div>

        </div>)}
      </>)
    }

export default Logged;
