import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const products = (state = [], action) => {
  if (action.type === "SET_PRODUCTS") {
    return action.products;
  }
  return state;
};

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

export const fetchProducts = () => {
  return async (dispatch) => {
    return dispatch({
      type: "SET_PRODUCTS",
      products: (await axios.get("/api/products")).data,
    });
  };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`/api/auth/${token}`);
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", credentials);
    const token = response.data.token;
    window.localStorage.setItem("token", token);
    dispatch(loginWithToken());
    //dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

export const updateAuth = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/auth/${token}`, auth);
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth/register", credentials);
    const token = response.data.token;
    window.localStorage.setItem("token", token);
    dispatch(loginWithToken());
    //dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

// Add a notes reducer
const notes = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTES":
      return action.notes;
    case "ADD_NOTE":
      return [...state, action.note];
    case "REMOVE_NOTE":
      return state.filter((note) => note.id !== action.noteId);
    default:
      return state;
  }
};

// Implement the fetchNotes action
export const fetchNotes = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/notes/user/${userId}`);
    dispatch({ type: "SET_NOTES", notes: response.data });
  };
};

export const createNote = (note) => {
  return async (dispatch) => {
    const response = await axios.post("/api/notes", note, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: "ADD_NOTE", note: response.data });
  };
};

export const deleteNote = (noteId) => {
  return async (dispatch) => {
    await axios.delete(`/api/notes/${noteId}`);
    dispatch({ type: "REMOVE_NOTE", noteId });
  };
};

// Add the notes reducer to combineReducers
const reducer = combineReducers({
  products,
  auth,
  notes,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
