import { apiConfig } from "./config";
import { linkedinConstants } from "../_constants";

const redirect = (url) => {
  window.location.replace(url);
};

export const userService = {
  login,
  logout,
  register,
  linkedInLogin,
  redirect,
  guest,
  IsUserLoggedIn,
};

function login(email, password) {
  const user = {
    email,
    password,
  };

  return apiConfig.post(`/login`, user).then((user) => {
    if (user.status && user.status == 200) {
      localStorage.setItem("itmapToken", user.data.data.access_token.token);
      window.location.replace("/");
      return user;
    }
  });
}

function guest() {
  return apiConfig.get(`/guest`).then((user) => {
    if (user.status && user.status == 200) {
      return user;
    }
  });
}

function IsUserLoggedIn() {
  return apiConfig.get(`/isUserLoggedIn`).then((user) => {
    if (user.status && user.status == 200) {
      return user;
    }
  });
}

function linkedInLogin(code) {
  const data = {
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
    authorization_code: code,
  };

  return apiConfig.post(`/linkedin_login`, data).then((user) => {
    if (user.status && user.status == 200) {
      localStorage.setItem("itmapToken", user.data.data.access_token.token);
      window.location.replace("/");
      return user;
    }
  });
}

function logout() {
  if (process.browser) {
    localStorage.removeItem("itmapToken");
    window.location.replace("/login");
  }
}

function register(user) {
  return apiConfig.post(`/register`, user);
}
