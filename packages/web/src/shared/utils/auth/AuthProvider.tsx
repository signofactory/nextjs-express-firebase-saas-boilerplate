// Inspired from https://github.com/colinhacks/next-firebase-ssr
// React stuff
import React, { useState, useEffect, useContext, createContext } from 'react';

// Utils
import nookies from 'nookies';

// Auth
import { firebaseClient } from './initializers/firebaseClient';
// import Api from 'shared/utils/Api';

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        console.log(`[AUTH] No user account found, destroying cookie`);
        setUser(null);
        nookies.destroy(null, 'token');

        return;
      }

      const idToken = (user as any).za;
      const refreshToken = user.refreshToken;

      const tokenCookieContent = {
        idToken,
        refreshToken,
      };

      // Updates the content of the cookie
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', JSON.stringify(tokenCookieContent), {});

      console.log(`[AUTH] Updated cookies token`);
    });
  }, []);

  return <>{children}</>;
};
