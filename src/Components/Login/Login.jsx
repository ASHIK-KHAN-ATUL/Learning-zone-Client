import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo main.png";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="flex justify-between pb-10 relative">
          <img src={logo} className="h-20 absolute -top-5 -left-5" alt="" />
          <span></span>

          <h1 className="text-2xl font-bold  mb-6 text-center">Login</h1>
          <span></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Email */}
          <div className="relative ">
            <label className=" left-2 top-2 transition-all    px-3">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className=" w-full border-2 rounded-sm px-3 py-2 focus:outline-none focus:ring-0  focus:border-red-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className=" left-2 top-2 transition-all  peer-focus:text-md   px-3">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder=" "
              className="peer w-full border-2 rounded-sm px-3 py-2 focus:outline-none focus:ring-0 focus:border-red-500"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <input className="btn" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
