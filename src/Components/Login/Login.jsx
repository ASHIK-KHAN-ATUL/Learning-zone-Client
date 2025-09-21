import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo main.png";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
            <input
              {...register("email", {
                required: "Email is required",
                maxLength: 20,
              })}
              placeholder=" "
              className="peer w-full border-2 rounded-sm px-3 py-2 focus:outline-none focus:ring-0  focus:border-red-500"
            />
            <label
              htmlFor="email"
              className="absolute left-2 top-2 text-sm transition-all peer-placeholder-shown:-top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:-left-3 peer-focus:text-md peer-focus:text-red-500 bg-white px-3"
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder=" "
              className="peer w-full border-2 rounded-sm px-3 py-2 focus:outline-none focus:ring-0 focus:border-red-500"
            />
            <label className="absolute left-2 top-2 text-sm transition-all peer-placeholder-shown:-top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:-left-3 peer-focus:text-md peer-focus:text-red-500 bg-white px-3">
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <input className="btn" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
