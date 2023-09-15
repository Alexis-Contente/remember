// Component import
import './notLogged.css';
import panelFilms from '../../assets/images/panel-films.png'

// Tools React import
import { Link } from 'react-router-dom';

// Display homepage offline
function NotLogged(){
    return (
        <div className="notlogged">
            <h1 className="text-4xl tracking-widest">Bienvenue</h1>
                <p className="text">Besoin de retrouver un film, une série ? Vous en avez marre d'oubliez où vous en entiez ? Il vous est difficile de vous souvenir quelles seront les prochaines sorties, et surtout à quelle date ? Vous aimeriez que toutes ces infos soient stockées ensemble et accessible ?<br />
                Vous êtes au bon endroit !! Ici, vous pourrez rechercher des films et séries parmis un catalogue riche et mis à jour régulièrement.<br />
                Constituez-vous des listes pour ne rien râter, et tout retrouver, même plus tard.
                Ne perdez plus rien, nous gardons pour vous tout ce que vous avez regardé, ce que vous regardez et ce que vous allez regarder.<br />
                Pas une minute à perdre, créez-vous votre compte gratuitement, rapidement et rejoignez la communauté.</p>
            <img src ={panelFilms} className="w-1/ flex justify-self-center rounded-3xl drop-shadow-2xl" alt="panel-films" />
            <Link to="/signin" className="button btn">
                S'identifier
            </Link>
        </div>
    )
}

export default NotLogged;