import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: role = null, // default role jodi na paoa jai
    isLoading: roleLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/user/${user.email}/role`);
      return res.data.role || null;
    },
    enabled: !!user?.email,
  });

  return { role, roleLoading, error, refetch };
};

export default useUserRole;
