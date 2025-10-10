import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../../Hooks/userAxiosPublic";
import {
  UserIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import DataLoading from "../../../Shared/DataLoading/DataLoading";

// InfoCard Component with dark/vibrant gradient
const InfoCard = ({ title, value }) => {
  return (
    <div
      className="p-5 rounded-md shadow-lg
      bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800
      border border-gray-700
      hover:from-cyan-500/30 hover:via-purple-500/30 hover:to-pink-500/30
       hover:border-x-sky-500 hover:border-y-purple-500 transition-all duration-300"
    >
      <h4 className="font-semibold text-cyan-300">{title}</h4>
      <p className="text-gray-300 mt-1 text-sm">{value || "N/A"}</p>
    </div>
  );
};

// RoleBadge with dark gradient
const RoleBadge = ({ role }) => {
  const roleData = {
    admin: {
      text: "ADMIN",
      color: "bg-gradient-to-r from-red-700 to-red-500 text-white",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
    },
    teacher: {
      text: "TEACHER",
      color: "bg-gradient-to-r from-green-700 to-green-500 text-white",
      icon: <AcademicCapIcon className="w-5 h-5" />,
    },
    student: {
      text: "STUDENT",
      color: "bg-gradient-to-r from-blue-700 to-blue-500 text-white",
      icon: <UserIcon className="w-5 h-5" />,
    },
    user: {
      text: "USER",
      color: "bg-gradient-to-r from-gray-700 to-gray-500 text-white",
      icon: <IdentificationIcon className="w-5 h-5" />,
    },
  };

  const data = roleData[role] || roleData.user;

  return (
    <span
      className={`inline-flex items-center gap-2 mt-3 px-4 py-1 rounded-full text-sm font-semibold ${data.color} shadow-sm`}
    >
      {data.icon} {data.text}
    </span>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const axiosPublic = userAxiosPublic();

  const { data: mainUser, isLoading } = useQuery({
    queryKey: ["mainUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic(`/users/user/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <DataLoading />;
  if (!mainUser)
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Searching user...</p>
      </div>
    );

  return (
    <div
      className="max-w-5xl mx-auto mt-10 p-6 rounded-3xl shadow-2xl
    bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-700 pb-6">
        <div className="relative">
          <img
            src={mainUser.photo}
            alt={mainUser.name}
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
          />
          <span className="absolute -bottom-2 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-900 animate-pulse"></span>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-bold text-cyan-300">{mainUser.name}</h2>
          <p className="text-gray-300 mt-1">{mainUser.email}</p>
          <RoleBadge role={mainUser.role} />
        </div>
      </div>

      {/* General Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard title="Account Status" value={mainUser.status} />
        <InfoCard
          title="Created At"
          value={new Date(mainUser.createdAt).toLocaleString()}
        />
        <InfoCard
          title="Last Login"
          value={user?.metadata?.lastSignInTime || "N/A"}
        />
        <InfoCard
          title="Email Verified"
          value={user?.emailVerified ? "Yes ✅" : "No ❌"}
        />
        <InfoCard title="Provider" value={user?.providerId} />
      </div>

      {/* Teacher or Student Extra Info */}
      {(mainUser.role === "teacher" || mainUser.role === "student") && (
        <>
          <h3 className="mt-10 text-xl font-semibold text-cyan-300 border-b border-gray-700 pb-2">
            {mainUser.role === "teacher"
              ? "Teacher Details"
              : "Student Details"}
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainUser.phone && (
              <InfoCard title="Phone" value={mainUser.phone} />
            )}
            {mainUser.teacherId && (
              <InfoCard title="Teacher ID" value={mainUser.teacherId} />
            )}
            {mainUser.studentId && (
              <InfoCard title="Student ID" value={mainUser.studentId} />
            )}
          </div>

          {/* Processed History */}
          {mainUser.processedHistory?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 mb-3 text-cyan-300">
                Processed History
              </h3>
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
                  <thead className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-cyan-300">
                    <tr>
                      <th className="p-3 text-left">Action</th>
                      <th className="p-3 text-left">Admin</th>
                      <th className="p-3 text-left">
                        {mainUser.role === "teacher"
                          ? "Teacher ID"
                          : "Student ID"}
                      </th>
                      <th className="p-3 text-left">Processed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainUser.processedHistory.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                      >
                        <td className="p-3 capitalize">{item.action}</td>
                        <td className="p-3 flex items-center gap-2">
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="w-6 h-6 rounded-full"
                          />
                          {item.name}
                        </td>
                        <td className="p-3">
                          {item.teacherId || item.studentId || "N/A"}
                        </td>
                        <td className="p-3">
                          {new Date(
                            item.processedAt || item.createdAt
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
