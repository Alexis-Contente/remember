/* eslint-disable arrow-body-style */

/* -- action TYPE --- */
export const SAVE_LOGGED_USER = 'SAVE_LOGGED_USER';
export const LOGOUT = 'LOGOUT';

export const BURGER = 'BURGER';

export const CHANGE_THEME = 'CHANGE_THEME';

export const LIST = 'LIST';

// handle action to save logged user
export const actionSaveLoggedUser = (jwt,role) => {
  return {
    type: SAVE_LOGGED_USER,

    jwt: localStorage.setItem("jwt", jwt),
    role: localStorage.setItem("role", role),
  };
};

export const actionBurger = (burger) => {
  return {
    type: BURGER, 

    burger: burger,
  };
};

export const actionList = (list) => {
  return {
    type: LIST, 

    list: list,
  };
};

// handle action to change theme (light/dark)
export const actionChangeTheme = (theme) => {
  return {
    type: CHANGE_THEME, 

    theme: localStorage.getItem("theme"),
  };
};