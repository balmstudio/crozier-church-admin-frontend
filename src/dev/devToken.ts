const ACCESS_KEY = "dev_access_token";
const REFRESH_KEY = "dev_refresh_token";

const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const getDevAccessToken = () => read(ACCESS_KEY);
export const getDevRefreshToken = () => read(REFRESH_KEY);

export const setDevTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
};

export const clearDevTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};
