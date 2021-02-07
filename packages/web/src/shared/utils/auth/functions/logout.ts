//Router
import Router from 'next/router';

// utils
import nookies from 'nookies';

// Client
import { firebaseClient } from '../initializers/firebaseClient';

// Types
interface LogoutOptions {
  redirect: string;
}

export const logout = async (options?: LogoutOptions) => {
  try {
    await firebaseClient.auth().signOut();

    Router.push(options?.redirect || '/');
  } catch (error) {
    console.error(`[logout] Error: ${error.message}`);
  }
};
