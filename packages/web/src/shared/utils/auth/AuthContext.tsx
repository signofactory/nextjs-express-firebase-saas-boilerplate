// Inspired from https://github.com/colinhacks/next-firebase-ssr
// React stuff
import React, { useState, useEffect, useContext, createContext } from 'react';

// Utils
import nookies from 'nookies';

// Auth
import { firebaseClient } from './initializers/firebaseClient';
import UserAPI from '../lib/api/user';
// import Api from 'shared/utils/Api';

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        console.log(`[AUTH] No user account found`);
        setUser(null);
        nookies.destroy(null, 'token');

        return;
      }

      const idToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      const tokenCookieContent = {
        idToken,
        refreshToken,
      };

      // Updates the content of the cookie
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', JSON.stringify(tokenCookieContent), {});

      // Fetches the current user from the server (instead of getting it from Firebase)
      const userFromServer = await UserAPI.getCurrent();
      if (userFromServer) setUser(userFromServer);

      console.log(`[AUTH] Updated user`);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
