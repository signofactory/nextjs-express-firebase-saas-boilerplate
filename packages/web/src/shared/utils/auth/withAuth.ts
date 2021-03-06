// Inspired from https://github.com/gladly-team/next-firebase-auth
// Next stuff
import { GetServerSidePropsContext } from 'next';

// Utils
import nookies from 'nookies';
import UserAPI from 'shared/lib/api/user';

// Firebase auth
import { logout } from './functions/logout';

// Types
type AuthUserType = User | undefined;

/**
 * A wrapper for a page's exported getServerSideProps that
 * provides the authed user's info as a prop. Optionally,
 * this handles redirects based on auth status.
 * See this discussion on how best to use getServerSideProps
 * with a higher-order component pattern:
 * https://github.com/vercel/next.js/discussions/10925#discussioncomment-12471
 * @param {String} unauthedRedirect - The url to redirect a user to. Defaults to '/'
 * @return {Object} response
 * @return {Object} response.props - The server-side props
 * @return {AuthUserType} response.props.AuthUser
 */

const withAuth = ({ unauthedRedirect } = { unauthedRedirect: '/' }) => (
  getServerSidePropsFunc?
) => async (ctx: GetServerSidePropsContext & { AuthUser: AuthUserType }) => {
  // Gets the user and builds the object
  const cookies = nookies.get(ctx);
  let AuthUser: AuthUserType;

  if (cookies?.token) {
    const tokens = JSON.parse(cookies.token);

    AuthUser = await UserAPI.getCurrent(tokens);
  }

  // Redirect to the login page if the user is unauthed
  if (!AuthUser || !AuthUser.id) {
    await logout();

    return {
      redirect: { destination: unauthedRedirect, permanent: false },
      props: {} as never,
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
