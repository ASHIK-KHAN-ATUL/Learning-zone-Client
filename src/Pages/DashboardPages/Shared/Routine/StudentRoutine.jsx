import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataLoading from "../../../../Shared/DataLoading/DataLoading";

const StudentRoutine = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: routines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentRoutine", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/routine/student/${user.email}`);
      return res.data;
    },
  });
  // console.log(routines);

  if (loading || isLoading) return <DataLoading></DataLoading>;
  if (error)
    return <p className="text-red-500 text-center">Error loading routine</p>;

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your Class Routine
      </h2>

      {routines.length === 0 ? (
        <p className="text-center text-gray-500">
          No routine found for your class.
        </p>
      ) : (
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full border-collapse text-gray-800 text-sm">
            <thead className="bg-black text-white text-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Teacher</th>
              </tr>
            </thead>
            <tbody className="border">
              {routines.map((r, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? "bg-white/40" : ""} `}
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-semibold">{r.day}</td>
                  <td className="px-4 py-2">{r.time}</td>
                  <td className="px-4 py-2">{r.subject}</td>
                  <td className="px-4 py-2">{r.teacherName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentRoutine;
