/* eslint-disable no-lone-blocks */
// Component import
import './itemPage.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Loading from '../Loading/loading';

// Tools React import
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Function that displays information about an item
function ItemPage({itemType, type}) {

    const params = useParams();
    const logged = useSelector((state) => state.user.logged);

    // parameters for the TMDB API  calls
    const TMDB_API_KEY = 'edac6d7937b5e067060e9bc6e405b4e1';
    const TMDB_API_URL = 'https://api.themoviedb.org/3/';
  
    // Our local state we use to gather informations on the movie, cast and director
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);

    const [tvShow, setTvShow] = useState([]);
    const [director, setDirector] = useState([]);

    const [loading, setLoading] = useState(true);

    // Function that calls one to many axios url and retrieve datas with a spread
    const getMovieAndCastById = async () => {   
        axios.all([
            axios.get(`${TMDB_API_URL}/${type}/${params.id}?api_key=${TMDB_API_KEY}&language=fr-FR`), 
            axios.get(`${TMDB_API_URL}/${type}/${params.id}/credits?api_key=${TMDB_API_KEY}&language=fr-FR`)
        ])
        .then(axios.spread((response1, response2) =>{
            {type === "tv" ? setTvShow(response1.data) : setMovie(response1.data)}
        setCast(response2.data.cast);
            {type === "tv" ? setDirector(response2.data.crew.filter(crew => crew.department === 'Production' || crew.job === 'Creator')) : setDirector(response2.data.crew.filter(crew => crew.job === "Director"))};
        }))
        .finally(() => {
        setLoading(false);
        })
    }

    useEffect(() => {
        getMovieAndCastById()
    },);

    // We retrieve the user JWT from his localStorage
    const jwt = 'Bearer '+ localStorage.getItem("jwt");
    // We create a config variable to give to the axios header
    const config = {
          headers: {
            'Authorization': jwt
          }
        }

    // Function that handle all clicks on any button changing the status to the value of the targeted button
    const handleClickMovie = (title, value, poster) => {
        axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/item/add', { 
            name: title,
            status: value,
            type_id: itemType,
            poster: poster 
        }, config)
        .then((response) => {
            toast.success(`${title} a correctement été ajouté a la liste : ${value}`, {
                autoClose: 2500
            })
        }).catch((error) => {
            toast.error(`Erreur lors de l'ajout du film a une liste`, {
                autoClose: 2500
            })
        });
    }

    // Function that handle all clicks on any button changing the status to the value of the targeted button
    const handleClickTvShow = (name, value, poster) => {
        axios.post('http://malcom-yeoman-server.eddi.cloud/Remember/public/api/item/add', { 
            name: name,
            status: value,
            type_id: itemType,
            poster: poster 
        }, config)
        .then((response) => {
            toast.success(`${name} a correctement été ajouté a la liste : ${value}`, {
                autoClose: 2500
            })
            
        }).catch((error) => {
            toast.error(`Erreur lors de l'ajout de la serie a une liste`, {
                autoClose: 2500
            })
        });
    }


    // Displays a page of an item with of the informations needed
    return(
        <>
        <Header /> 
            {loading ? (<Loading />) :          
                (<div className="container my-24 px-6 mx-auto">
                            <div className="content-wrapper">
                                <div className="poster-wrapper">
                                    <img src={type === "tv" ? `https://image.tmdb.org/t/p/w500/${tvShow?.poster_path}`:`https://image.tmdb.org/t/p/w500/${movie?.poster_path}` } alt="Item poster"
                                        className="poster" />
                                </div>
                                <div className="text-wrapper">
                                    <div className="text-container  dark:text-white">
                                        <h2 className="text-2xl font-bold mb-4">{movie?.title} {tvShow?.name}</h2>
                                            <p className="text-gray-500 dark:text-white mb-6">
                                            Date de sortie:{movie?.release_date} {tvShow?.first_air_date}
                                            </p>
                                            <p className="actorList">
                                             Acteurs: {cast.length > 0 ?  cast.slice(0, 4).map((value, key) => <span key={key}> { value.name } </span>) : " "}
                                            </p>
                                            <p className="directorList">
                                            Realisateurs: {director.length > 0 ?  director.slice(0,3).map((value, key) => <span key={key}> {value.name} </span>) : " "}
                                            </p>
                                            <p className="synopsis">
                                            Synopsis: {movie?.overview} {tvShow?.overview}
                                            </p>
                                            <div className="button-wrapper">
                                              {/* button to add the element to the concerned list */}
                                              {logged ? <>
                                                <button className="category-button" value="Terminé" 
                                                onClick={(e) => {type === "tv" ? handleClickTvShow(tvShow.name,e.currentTarget.value, tvShow.poster_path) : handleClickMovie(movie.title, e.currentTarget.value, movie.poster_path)}}>Terminé</button>

                                                <button className="category-button" value="En Cours" 
                                                onClick={(e) => {type === "tv" ? handleClickTvShow(tvShow.name,e.currentTarget.value, tvShow.poster_path) : handleClickMovie(movie.title, e.currentTarget.value, movie.poster_path)}}>En cours</button>

                                                <button className="category-button" value="A Regarder" 
                                                onClick={(e) => {type === "tv" ? handleClickTvShow(tvShow.name,e.currentTarget.value, tvShow.poster_path) : handleClickMovie(movie.title, e.currentTarget.value, movie.poster_path)}}>A regarder</button></>: ""}
                                            </div>
                                    </div>
                                </div>
                            </div>
                </div>)}
            <Footer />
        </>
    )
}

export default ItemPage;