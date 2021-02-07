import axios from 'axios';
import firebaseClientConfig from '@src/config/firebaseClientConfig.json';

export const refreshExpiredIdToken = async (refreshToken: string) => {
  try {
    const firebasePublicAPIKey = firebaseClientConfig.apiKey;
    const endpoint = `https://securetoken.googleapis.com/v1/token?key=${firebasePublicAPIKey}`;

    const { data } = await axios(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });

    // const { refresh_token, id_token, user_id } = data;
    const { id_token } = data;

    return id_token;
  } catch (error) {
    console.error('[refreshExpiredIdToken] Error: ', error);
  }
};
