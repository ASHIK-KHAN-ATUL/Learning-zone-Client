import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo main.png";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import userAxiosPublic from "../../Hooks/userAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = userAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    const formData = new FormData();
    formData.append("image", data.image[0]);
    const res = await fetch(image_hosting_api, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    // console.log(result);

    if (result?.success) {
      const photoURL = result.data.display_url;

      // createUser after succesfully post pohto on imagebb
      createUser(data.email, data.password)
        .then((result) => {
          // console.log(result.user);
          toast.success("Account created successfully!");

          updateUserProfile(data.name, photoURL)
            .then(() => {
              // console.log("User Profile Updated");
              toast.info("User Profile Updated");
            })
            .catch((error) => {
              // console.log(error);
            });

          const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            photo: photoURL,
            role: "user", // or "user" default role
            status: "active",
            createdAt: new Date(),
          };

          // here code for save data in DB
          axiosPublic.post("/users", userInfo).then((res) => {
            // console.log(res.data);
            if (res.data.insertedId) {
              toast.success("User Data Save in Database");
            }
          });

          navigate("/");
          reset();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    } else {
      toast.error("Image upload failed!");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 text-black">
      <div className="bg-gradient-to-b from-yellow-100 to-white border p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="flex justify-between pb-10 relative">
          <img src={logo} className="h-20 absolute -top-5 -left-5" alt="" />
          <span></span>

          <h1 className="text-2xl font-bold  mb-6 text-center">Register</h1>
          <span></span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Name */}
          <div className=" ">
            <label htmlFor="name" className=" transition-all    px-3">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                maxLength: 20,
              })}
              placeholder=" "
              className=" w-full border-2 rounded-sm px-3 py-2 focus:outline-none focus:ring-0  focus:border-red-500"
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* image */}
          <div>
            <label className="">Upload Photo</label>
            <div className=" border p-2 border-dashed mt-2">
              <input
                type="file"
                {...register("image", { required: true })}
                name="image"
                accept="image/*"
                className="file-input file:black text-white w-full "
              />
            </div>
            {errors.image && (
              <span className="text-red-500">Image is required</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label className=" left-2 top-2 transition-all    px-3">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              placeholder=" "
              className=" w-full border-2 rounded-sm px-3 py-2 focus:outline-none focus:ring-0 focus:border-red-500"
            />
            {errors.phone && (
              <p className="text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className=" left-2 top-2 transition-all    px-3">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder=" "
              className=" w-full border-2 rounded-sm px-3 py-2 focus:outline-none focus:ring-0 focus:border-red-500"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <input className="btn" type="submit" />
        </form>
        <p className="text-center pt-5">
          Have an account?{" "}
          <Link className="text-green-600" to={"/login"}>
            Login
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
