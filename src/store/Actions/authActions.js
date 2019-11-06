import axios from "axios";
import {
  CLEAR_ERRORS,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR
} from "./types";
import { returnErrors } from "./errorActions";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  axios
    .get("http://localhost:5000/api/v1/student/auth", {
      headers: {
        "x-auth-token": token
      }
    })
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch();
      // returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Student Login
export const studentLogin = ({ email, password }, history) => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .post("http://localhost:5000/api/v1/student/login", {
      email,
      password
    })
    .then(res => {
      console.log("response from action: ", res.data);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      history.push("/student-dashboard");
    })
    .catch(error => {
      dispatch(
        returnErrors(error.response.data.message, error.response.data.success)
      );
      dispatch({ type: LOGIN_FAIL });
      console.log("Error: ", error.response);
    });
};

// Company Login
export const companyLogin = ({ email, password }, history) => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
    .post("http://localhost:5000/api/v1/company/login", {
      email,
      password
    })
    .then(res => {
      console.log("response from action: ", res.data);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      history.push("/Company-dashboard");
    })
    .catch(error => {
      dispatch(
        returnErrors(error.response.data.message, error.response.data.success)
      );
      dispatch({ type: LOGIN_FAIL });
      console.log("Error: ", error.response);
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// // Setup config/headers and token
// export const tokenConfig = getState => {
//   // Get token from localstorage
//   const token = getState().auth.token;

//   // Headers
//   const config = {
//     headers: {
//       "Content-type": "application/json"
//     }
//   };

//   // If token, add to headers
//   if (token) {
//     config.headers["x-auth-token"] = token;
//   }

//   return config;
// };
