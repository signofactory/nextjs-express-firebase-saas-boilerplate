// Utils
import axios from 'axios';
import callWithAuth from './callWithAuth';

// Sets the default url for API endpoints
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_PATH || 'http://localhost/';

const UserAPI = {
  getCurrent: async (tokens?: { idToken: string; refreshToken: string }) => {
    try {
      const { data } = await callWithAuth('GET', '/user/current', {}, tokens);
      return data.user;
    } catch (error) {
      console.error('[UserAPI.get] Error: ', error);
      return null;
    }
  },
};

export default UserAPI;
