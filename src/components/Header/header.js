// Component import
import './header.css';
import 'react-toastify/dist/ReactToastify.css';
import BurgerMenu from '../BurgerMenu/burgerMenu';
import SearchBar from '../SearchBar/searchBar';

// Tools React import
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionBurger, LOGOUT } from '../../actions/user';
import { toast } from 'react-toastify';
import { actionChangeTheme } from '../../actions/user';

// Header function, containing the navbar and the login button
function Header() {

  const dispatch = useDispatch()
  const logged = useSelector((state) => state.user.logged);

  useEffect(() => {
    localStorage.setItem('logged', logged);
  }, [logged]);


  const darkMode = useSelector((state) => state.user.theme);
  const burgerStatus = useSelector((state) => state.user.burger);
  const localStorageTheme = localStorage.getItem("theme");
  

  // Function that handle changes of the localStorage theme value when we click on the theme button
  const handleDarkMode = () => {

  if(localStorage.getItem("theme") === null){
    localStorage.setItem("theme", "dark")
    dispatch(actionChangeTheme(localStorage.getItem("theme")));
  }

    if(darkMode === null){
        if (localStorageTheme === "dark"){
          localStorage.setItem("theme", "light");
          dispatch(actionChangeTheme(localStorage.getItem("theme")));
        }
        else if (localStorageTheme === "light")
        {
          localStorage.setItem("theme", "dark");
          dispatch(actionChangeTheme(localStorage.getItem("theme")));
        }
      }
    else
        {
          if(darkMode === "dark"){
            console.log(darkMode)
            localStorage.setItem("theme", "light");
            dispatch(actionChangeTheme(localStorage.getItem("theme")));
          }
          else
          {
            console.log(darkMode)
            localStorage.setItem("theme", "dark");
            dispatch(actionChangeTheme(localStorage.getItem("theme")));
          } 
        } 
  };


  const handleMenuClick = () => {
    dispatch(actionBurger(!burgerStatus));
  };

  return (
    <>
      <nav className=" nav static top-0">
          <label htmlFor="menu-toggle" className={`cursor-pointer ${logged ? 'block' : 'hidden'}`} onClick={(e) => handleMenuClick()}>
            <div className={`burger relative ${burgerStatus ? '' : 'space-y-2'} ${logged ? 'block' : 'hidden'}`}>

              {/*Burger menu*/}
              <>    
                <button className="burger burger-button group" onClick={() => handleMenuClick()}>
                  <div className={`burger genericHamburgerLine transition ease transform duration-300
                    ${burgerStatus ? "firstIsOpen" : "isClosed"}`}
                  />
                  <div className={`burger genericHamburgerLine transition ease transform duration-300
                    ${burgerStatus ? "opacity-0" : "isClosed"}`}
                  />
                  <div className={`burger genericHamburgerLine transition ease transform duration-300
                    ${burgerStatus ? "secondIsOpen" : "isClosed"}`}
                  />
                </button> 
              </>
        
            </div>
          </label>
          
          <label className="relative inline-flex items-center cursor-pointer ">
            <input type="checkbox" value="" className="sr-only peer" onChange={handleDarkMode} checked={localStorageTheme === "dark" ? true : false}></input>
              <div className="theme-btn peer dark:bg-slate-800 peer-focus:ring-4 peer-focus:ring-dark-300 dark:peer-focus:ring-dark-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-slate-700"></div>
          </label>

          {/*Searchbar component*/}
          <SearchBar />
          
          <div className="signin-container">
            <div className="flex">
              {logged ? <Link to="/" className="disconnect-btn" onClick={() => {
                    toast.success("vous êtes déconnecté !");
                    dispatch({
                    type: LOGOUT,
                    });
                    }}>Se déconnecter
                    </Link> : <Link to="/signin" className="p-2 rounded button">S'identifier</Link>}
            </div>
          </div> 
      </nav> 
      {burgerStatus ?  <BurgerMenu /> : null} 
    </>
  );
}

export default Header;