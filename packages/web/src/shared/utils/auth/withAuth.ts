// Utils
import nookies from 'nookies';

// Firebase auth
import { firebaseAdmin } from 'shared/utils/auth/initializers/firebaseAdmin';

/**
 * Inspired from https://github.com/gladly-team/next-firebase-auth
 *
 * An wrapper for a page's exported getServerSideProps that
 * provides the authed user's info as a prop. Optionally,
 * this handles redirects based on auth status.
 * See this discussion on how best to use getServerSideProps
 * with a higher-order component pattern:
 * https://github.com/vercel/next.js/discussions/10925#discussioncomment-12471
 * @param {String} unauthedRedirect - The url to redirect a user to. Defaults to '/'
 * @return {Object} response
 * @return {Object} response.props - The server-side props
 * @return {Object} response.props.AuthUser
 */
const withAuth = ({ unauthedRedirect } = { unauthedRedirect: '/' }) => (
  getServerSidePropsFunc?
) => async (ctx) => {
  const cookies = nookies.get(ctx);
  let AuthUser;

  if (cookies?.token) {
    AuthUser = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    AuthUser.token = cookies.token;
  }

  // If specified, redirect to the login page if the user is unauthed.
  if (!AuthUser || !AuthUser.uid) {
    return {
      redirect: { destination: unauthedRedirect, permanent: false },
    };
  }

  // Prepare return data
  let returnData = { props: { AuthUser } };

  // Evaluate the composed getServerSideProps().
  if (getServerSidePropsFunc) {
    // Add the AuthUser to Next.js context so pages can use
    // it in `getServerSideProps`, if needed.
    ctx.AuthUser = AuthUser;
    const composedProps = (await getServerSidePropsFunc(ctx)) || {};
    if (composedProps) {
      if (composedProps.props) {
        // If composedProps does have a valid props object, we inject AuthUser in there
        returnData = { ...composedProps };
        returnData.props.AuthUser = AuthUser;
      } else if (composedProps.notFound || composedProps.redirect) {
        // If composedProps returned a 'notFound' or 'redirect' key
        // (as per official doc: https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)
        // it means it contains a custom dynamic routing logic that should not be overwritten
        returnData = { ...composedProps };
      }
    }
  }

  return returnData;
};

export default withAuth;
