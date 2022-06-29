// users-service.js

// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from "./users-api";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Persist the token (saving it to local storage so we don't lose it upon a page refresh)
  localStorage.setItem("token", token); // saves our token to our local storage
  // local storage only stores and retrieves strings
  // JSON.parse() is responsible for converting a string to whatever data type you desire
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem("token");
  // if there is no token return null
  if (!token) {
    return null;
  } else {
    // if there is a token, check if it's expired
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
      // remove it from local storage
      localStorage.removeItem("token");
      return null;
    }
    // otherwise send the token
    else {
      return token;
    }
  }
}

export function getUser() {
  const token = getToken();
  if (token) {
    return JSON.parse(atob(token.split(".")[1])).user;
  } else {
    return null;
  }
}

export function logOut() {
  localStorage.removeItem("token");
}

export function checkToken() {
  // Just so that you don't forget how to use .then
  return (
    usersAPI
      .checkToken()
      // checkToken returns a string, but let's
      // make it a Date object for more flexibility
      .then((dateStr) => new Date(dateStr))
  );
}
