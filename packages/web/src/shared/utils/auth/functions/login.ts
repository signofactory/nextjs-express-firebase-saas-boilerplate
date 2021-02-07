// Utils
import nookies from 'nookies';

// Router
import Router from 'next/router';

// Client
import { firebaseClient } from '../initializers/firebaseClient';

// Auth providers
const GoogleAuthProvider = new firebaseClient.auth.GoogleAuthProvider();

// Types
interface LoginOptions {
  redirect: string;
}

export const login = async (options?: LoginOptions) => {
  try {
    await firebaseClient.auth().signInWithPopup(GoogleAuthProvider);

    if (options?.redirect) {
      Router.push(options.redirect);
    }
  } catch (error) {
    console.error(`[login] Error: ${error.message}`);
  }
};
