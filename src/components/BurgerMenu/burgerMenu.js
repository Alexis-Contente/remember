// Component import
import './burgerMenu.css';

// Tools React import
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actionBurger } from '../../actions/user';

// Function display navside when we click on burger
function BurgerMenu() {
  const dispatch = useDispatch()

  const userRole = localStorage.getItem("role");
  const burgerStatus = useSelector((state) => state.user.burger)

  const handleButtonClick = () => {
    dispatch(actionBurger(false));
  };


  return (
    <>
      <div className="absolute z-[2000]" id="menu">
        {/* links visible in our burger Menu */}
        <nav className="burgermenu">
          <NavLink className="navlink" to="/" onClick={handleButtonClick}>Accueil</NavLink>
          <NavLink className="navlink" to="/lists" onClick={handleButtonClick}>Mes listes</NavLink>
          <NavLink className="navlink" to="/profile" onClick={handleButtonClick}>Mon profil</NavLink>
          {
            userRole === "ROLE_ADMIN" ? 
            <a className="navlink" href="http://localhost:8000/login">Dashboard</a> : ""
          }
        </nav>
      </div>
    </>
  )
}

export default BurgerMenu;