import { LOGOUT, SAVE_LOGGED_USER, CHANGE_THEME, BURGER, LIST } from '../actions/user';

// state
export const initialState = {
  logged: JSON.parse(localStorage.getItem('logged')),
  jwt: null,
  role: localStorage.getItem('role'),
  theme: null,
  burger: false,
  list: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // handle login
    case SAVE_LOGGED_USER: {

      const newState = {
        ...state,
        logged: true,
        jwt: action.jwt,
        role: action.role,
      };
      return newState;
    }

    // handle logout
    case LOGOUT:
      return {
        ...state,
        logged: false,
        jwt: localStorage.removeItem("jwt"),
        role: localStorage.removeItem("role"),
      };

    case BURGER:
      return {
        ...state,
        burger: action.burger,
      };

    case LIST:
      return {
        ...state,
        list: action.list,
      };

    // handle dark/light theme
    case CHANGE_THEME: {

      const newState = {
        ...state,
        theme: action.theme,
      };
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;