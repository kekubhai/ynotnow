import { useUser } from "@stackframe/stack";

export const useAuth = () => {
  const user =useUser();

  return {
    user,
    
    isAuthenticated: !!user,
  };
};

export const getAuthUser = async (req: any) => {
  const user = await req.getUser();
  return user;
}; 