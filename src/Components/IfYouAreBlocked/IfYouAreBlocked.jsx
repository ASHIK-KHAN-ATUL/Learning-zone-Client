import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import DataLoading from "../../Shared/DataLoading/DataLoading";
import userAxiosPublic from "../../Hooks/userAxiosPublic";

const IfYouAreBlocked = () => {
  const { user } = useAuth();
  const axiosPublic = userAxiosPublic();
  const navigate = useNavigate();

  const {
    data: mainUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mainUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic(`/users/user/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (mainUser?.status === "inactive") {
      Swal.fire({
        icon: "warning",
        title: "🚫 Account Deactivated",
        html: `
          <p style="text-align:left; margin-bottom:10px;">
            Your <strong>LearningZone</strong> account has been temporarily 
            <span style="color:red;">deactivated</span> by our admin team.
          </p>
          <p style="text-align:left; margin-bottom:10px;">
            You will not be able to access any courses, class routines, or resources until the account is reactivated.
          </p>
          <p style="text-align:left; margin-bottom:15px;">
            For assistance, please contact our support team at: 
            <a href="mailto:support@learningzone.com" style="color:#4f46e5; font-weight:bold;">support@learningzone.com</a>
          </p>
          <p style="text-align:center; font-size:0.9rem; color:gray;">
            If you think this is a mistake, reach out to LearningZone support immediately.
          </p>
        `,
        confirmButtonText: "Go to Home",
        confirmButtonColor: "#4f46e5",
        width: 500,
        background: "#fff",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/"); // redirect to home
      });
    }
  }, [mainUser, navigate]);

  // if (isLoading) return <DataLoading />;
  // if (error)
  //   return (
  //     <p className="text-center text-red-500 mt-10">
  //       Error loading user data. Please refresh the page.
  //     </p>
  //   );

  return <>{/* normal website content here */}</>;
};

export default IfYouAreBlocked;
