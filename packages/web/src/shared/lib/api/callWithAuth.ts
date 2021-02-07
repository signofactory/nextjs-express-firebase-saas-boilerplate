// Modules
import axios, { AxiosRequestConfig, Method } from 'axios';
import nookies from 'nookies';

// Methos to retrieve access token from storage
const getAccessToken = () => {
  const cookies = nookies.get();
  let idToken, refreshToken;

  idToken = JSON.parse(cookies.token).idToken;
  refreshToken = JSON.parse(cookies.token).refreshToken;

  return { idToken, refreshToken };
};

const callWithAuth = async (
  type: Method,
  url: string,
  options?: AxiosRequestConfig,
  tokens?: {
    idToken: string;
    refreshToken: string;
  }
) => {
  const { idToken, refreshToken } = tokens ? tokens : getAccessToken();

  const response = await axios({
    method: type,
    url: url,
    headers: {
      Authorization: `Bearer ${idToken}`,
      RefreshToken: refreshToken,
    },
    ...options,
  });

  const { status } = response;

  switch (status) {
    case 200:
      return response;

    default:
      //todo@ handle errors
      return response;
  }
};

export default callWithAuth;
