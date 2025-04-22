import { useUser } from '@auth0/nextjs-auth0/client';

export const useAuth = () => {
  const { user, error, isLoading } = useUser();

  return {
    user,
    error,
    isLoading,
    isAuthenticated: !!user,
  };
};

export const getAuth0User = async (req: any) => {
  const { user } = await getSession(req, res);
  return user;
}; 