// Heavily inspired from https://github.com/colinhacks/next-firebase-ssr
// React stuff
import React, { useState, useEffect, useContext, createContext } from 'react';

// Utils
import nookies from 'nookies';

// Auth
import { firebaseClient } from './initializers/firebaseClient';
// import Api from 'shared/utils/Api';

// Types
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<firebaseClient.User | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        console.log(`[AUTH] No user account found`);
        setUser(null);
        nookies.destroy(null, 'token');
        nookies.destroy(null, 'firebaseUser');

        console.log(user);

        return;
      }

      const token = await user.getIdToken();
      // const userFromServer = await Api.getUserFromToken(token);

      // if (userFromServer) setUser(userFromServer);
      setUser(user);
      nookies.destroy(null, 'token');
      nookies.destroy(null, 'firebaseUser');
      nookies.set(null, 'token', token, {});
      nookies.set(null, 'firebaseUser', JSON.stringify(user), {});
      console.log(`[AUTH] Updated user and token`);
    });
  }, []);

  // Force refresh the token every 2 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      try {
        const user = JSON.parse(nookies.get(null).user);
        if (user) await user.getIdToken(true);
      } catch {
        nookies.destroy(null, 'token');
        nookies.destroy(null, 'firebaseUser');
      }
    }, 2 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
