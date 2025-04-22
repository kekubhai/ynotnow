import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email'
    },
    returnTo: '/dashboard'
  }),
  logout: handleLogout({
    returnTo: '/'
  }),
  callback: handleCallback({
    afterCallback: (req, res, session) => {
      return session;
    }
  })
}); 