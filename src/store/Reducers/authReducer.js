import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../Actions/types";

const initialState = {
  token: localStorage.getItem("jwt"),
  isAuthenticated: localStorage.getItem("jwt") ? true : false,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("jwt", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("jwt");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
