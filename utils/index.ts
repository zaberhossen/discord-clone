export const COOKIES_KEY = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user",
  REFRESH_EXPIRED: "token_lifetime"
};

export const JSONparse = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return jsonString;
  }
};
