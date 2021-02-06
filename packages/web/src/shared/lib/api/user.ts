// Utils
import axios from 'axios';

// Sets the default url for API endpoints
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_PATH || 'http://localhost/';

const SubmissionAPI = {
  get: async (token: string) => {
    try {
      return await axios.get(`/submission?id=${id}`);
    } catch (error) {
      console.error('[SubmissionAPI.get] Error: ', error);
      throw new Error();
    }
  },
};

export default SubmissionAPI;
