import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";

const RoutineManager = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   console.log(user);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      program: "Regular Coaching",
      grade: "Class 6",
      day: "Monday",
      time: "",
      subject: "",
      teacherName: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.time || !data.subject || !data.teacherName) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }

    if (!user?.email) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }

    const routine = {
      program: data.program,
      grade: data.grade,
      day: data.day,
      time: data.time,
      subject: data.subject,
      teacherName: data.teacherName,
      createdAt: new Date(),
      addedByName: user?.displayName,
      addedByEmail: user?.email,
      addedByPhoto: user?.photoURL,
    };
    // console.log(routine);

    const res = await axiosSecure.post("/routine/create", routine);
    // console.log(res);
    if (res.data.insertedId) {
      Swal.fire("Success", "Routine added successfully", "success");
      reset();
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Routine Manager</h1>

      {/* Add Routine Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold">Program</label>
            <select
              {...register("program")}
              className="input input-bordered focus:outline-none focus:ring-0   w-full bg-white border border-black"
            >
              <option>Regular Coaching</option>
              <option>SSC Preparation</option>
              <option>HSC / College</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Grade / Class</label>
            <select
              {...register("grade")}
              className="input input-bordered  focus:outline-none focus:ring-0 w-full bg-white border border-black"
            >
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
              <option>Class 9</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Day</label>
            <select
              {...register("day")}
              className="input input-bordered focus:outline-none focus:ring-0  w-full bg-white border border-black"
            >
              <option>Saturday</option>
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Time</label>
            <input
              type="text"
              {...register("time")}
              placeholder="10:00 AM - 11:00 AM"
              className="input input-bordered  focus:outline-none focus:ring-0 w-full bg-white border border-black"
            />
          </div>

          <div>
            <label className="block font-semibold">Subject</label>
            <input
              type="text"
              {...register("subject")}
              placeholder="Mathematics"
              className="input input-bordered focus:outline-none focus:ring-0  w-full bg-white border border-black"
            />
          </div>

          <div>
            <label className="block font-semibold">Teacher</label>
            <input
              type="text"
              {...register("teacherName")}
              placeholder="Mr. Hasan"
              className="input input-bordered  focus:outline-none focus:ring-0 w-full bg-white border border-black"
            />
          </div>
        </div>

        <div className="md:col-span-6 mt-5 flex justify-center ">
          <button
            type="submit"
            className="btn btn-success text-white w-[60%]  mt-2"
          >
            Add Routine
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoutineManager;
