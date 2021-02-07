// Firebase stuff
import 'firebase/auth';
import firebaseClient from 'firebase/app';

// Firebase config
import CLIENT_CONFIG from 'config/firebaseClientConfig.json';

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
