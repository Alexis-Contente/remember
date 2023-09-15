// This component is the entry point of the app

// Component import
import './App.css';
import Home from '../Home/home';
import Form from '../Form/form';
import Lists from '../Lists/lists';
import ItemLists from '../ItemLists/itemLists';
import ItemPage from '../ItemPage/itemPage';
import SearchPage from '../SearchPage/searchPage';
import Profile from '../Profile/profile';
import ErrorPage from '../ErrorPage/errorPage';
import RedirectPage from '../RedirectPage/RedirectPage';
import ForgottenPassword from '../ForgottenPassword/forgottenPassword';

// Tools React import
import { actionBurger, actionList, LOGOUT } from '../../actions/user';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import jwtDecode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';

// Main function of the app 
function App() {

  const dispatch = useDispatch()

  const done = "Terminé"
  const inprogress = "En Cours"
  const towatch = "A Regarder"

  const itemTypeMovie = 1;
  const itemTypeSerie = 2;

  const typeTv = "tv";
  const typeMovie = "movie";

  const token = localStorage.getItem('jwt');
  const currentDate = new Date();

  const logged = useSelector((state) => state.user.logged);

  // We check the value of the "theme" in the localStorage
  if (localStorage.theme === 'dark') {
    // Add dark class to the HTML element if the value of the theme in local storage is dark
    document.documentElement.classList.add('dark')
  } else {
    // Remove dark class to the HTML element if the value of the theme in local storage is not dark
    document.documentElement.classList.remove('dark')
  }

  // on recupere la valeur du theme dans le state redux et on l'utilise dans un useEffect 
  // pour actualiser le composant App a chaque changement de la valeur de themeValue
  useSelector((state) => state.user.theme);

  // We compare the expiration date of the JWT with the current timestamp
  // if the current timestamp is superior to the user JWT creation timestamp, the user is disconnected
  if(token)
  {  
      if (jwtDecode(token).exp * 1000 < currentDate.getTime() ) {
      dispatch({
        type: LOGOUT,
        })
    } else {
    }
  }


  //handle click outside of the burger
  function handleClickBurgerOutside(event) {
    if (!event.target.parentNode.className.includes("burger")) {
      dispatch(actionBurger(false));
    }
  }

//handle click outside of the searchBar
  function handleClickSearchBarOutside(event) {
    if (!event.target.parentNode.className.includes("list")) {
      dispatch(actionList([]));
    }
  }

  return (
    <div className="App dark:bg-slate-800 dark:text-white" onClick={(e) => {handleClickBurgerOutside(e); handleClickSearchBarOutside(e)}}>

    {/* toastify configuration */}
      <ToastContainer 
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
      {logged ? 
      <>
        <>
          {/* accessible routes only when the user is connected */}
          <Route path="/" element=<Home /> />
          <Route path="*" element=<ErrorPage /> />
          <Route path="/signin" element= <Form /> />
          <Route path="/profile" element=<Profile /> />
          <Route path="/lists" element=<Lists /> />
          <Route exact path="/search" element=<SearchPage /> />

          <Route exact path="/movie/:id" element=<ItemPage itemType={itemTypeMovie} type={typeMovie}/> />
          <Route exact path="/serie/:id" element=<ItemPage itemType={itemTypeSerie} type={typeTv}/> />

          <Route path="/movielists/done" element=<ItemLists itemType={itemTypeMovie} itemStatus={done}/> />
          <Route path="/movielists/in-progress" element=<ItemLists itemType={itemTypeMovie} itemStatus={inprogress}/> />
          <Route path="/movielists/to-watch" element=<ItemLists itemType={itemTypeMovie} itemStatus={towatch}/> />

          <Route path="/serielists/done" element=<ItemLists itemType={itemTypeSerie} itemStatus={done}/> />
          <Route path="/serielists/in-progress" element=<ItemLists itemType={itemTypeSerie} itemStatus={inprogress}/> />
          <Route path="/serielists/to-watch" element=<ItemLists itemType={itemTypeSerie} itemStatus={towatch}/> /> </> 
        </>

      :

        <>
          {/* accessible routes when the user is not connected */}
          <Route exact path="/search" element=<SearchPage /> />
          <Route exact path="/movie/:id" element=<ItemPage itemType={itemTypeMovie} type={typeMovie}/> />
          <Route exact path="/serie/:id" element=<ItemPage itemType={itemTypeSerie} type={typeTv}/> />

          <Route path="/profile" element=<RedirectPage /> />
          <Route path="/lists" element=<RedirectPage /> />

          <Route path="/movielists/done" element=<RedirectPage itemType={itemTypeMovie} itemStatus={done}/> />
          <Route path="/movielists/in-progress" element=<RedirectPage itemType={itemTypeMovie} itemStatus={inprogress}/> />
          <Route path="/movielists/to-watch" element=<RedirectPage itemType={itemTypeMovie} itemStatus={towatch}/> />

          <Route path="/serielists/done" element=<RedirectPage itemType={itemTypeSerie} itemStatus={done}/> />
          <Route path="/serielists/in-progress" element=<RedirectPage itemType={itemTypeSerie} itemStatus={inprogress}/> />
          <Route path="/serielists/to-watch" element=<RedirectPage /> />      
          
          <Route path="/" element=<Home /> />
          <Route path="/signin" element=<Form /> />
          <Route path="/forgottenpassword" element=<ForgottenPassword /> />
          <Route path="/forgottenpassword/:id" element=<ForgottenPassword /> />
          <Route path="*" element=<ErrorPage /> />

        </>
        }
      </Routes>  
  </div>
  );
}

export default App;