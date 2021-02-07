// Utils
import axios from 'axios';
import callWithAuth from './callWithAuth';

// Sets the default url for API endpoints
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_PATH || 'http://localhost/';

const UserAPI = {
  getCurrent: async () => {
    try {
      const { data } = await callWithAuth('GET', '/user/current');
      return data.user;
    } catch (error) {
      console.error('[UserAPI.get] Error: ', error);
      return null;
    }
  },
};

export default UserAPI;
