import Cookies from "js-cookie";
import { makeRequestWithBase } from "./client";
import { API_ROUTES } from "../routes";
import { COOKIES_KEY } from "@/utils";

const setAccessToken = (value: string) => {
  Cookies.set(COOKIES_KEY.ACCESS_TOKEN, value, { expires: 1 });
};
const setUserData = (value: string) => {
  Cookies.set(COOKIES_KEY.USER_DATA, value, { expires: 1 });
};
const setRefreshToken = (value: string) => {
  const inTenMin = new Date(new Date().getTime() + 10 * 60 * 1000);
  Cookies.set(COOKIES_KEY.REFRESH_TOKEN, value, {
    expires: 20
  });
  Cookies.set(COOKIES_KEY.REFRESH_EXPIRED, value, {
    expires: inTenMin
  });
};

const getAccessToken = () => {
  return Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
};
const getRefreshTokenExpired = () => {
  return Cookies.get(COOKIES_KEY.REFRESH_EXPIRED);
};
const getRefreshToken = () => {
  return Cookies.get(COOKIES_KEY.REFRESH_TOKEN);
};
const getUserData = () => {
  return Cookies.get(COOKIES_KEY.USER_DATA);
};
const cleanTokens = () => {
  Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
  Cookies.remove(COOKIES_KEY.REFRESH_TOKEN);
  Cookies.remove(COOKIES_KEY.REFRESH_EXPIRED);
  Cookies.remove(COOKIES_KEY.USER_DATA);
};
const logout = () => {
  makeRequestWithBase({
    url: API_ROUTES.logout,
    method: "DELETE"
  })
    .then(() => {
      cleanTokens();
      window.location.href = "/";
    })
    .catch(() => {
      cleanTokens();
      window.location.href = "/";
    });
};

export const AUTH = {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getUserData,
  setUserData,
  getRefreshTokenExpired,
  getRefreshToken,
  logout,
  cleanTokens
};
