import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Loading from "../../../../Shared/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import userAxiosPublic from "../../../../Hooks/userAxiosPublic";
import { MdOutlineManageSearch } from "react-icons/md";
import useAuth from "../../../../Hooks/useAuth";
import DataLoading from "../../../../Shared/DataLoading/DataLoading";
import Swal from "sweetalert2";

const AppliedTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = userAxiosPublic();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); // page state
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const limit = 10; // per page 10

  const { data: mainUser } = useQuery({
    queryKey: ["mainUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic(`/users/user/${user?.email}`);
      return res.data;
    },
  });
  // console.log("MainUser", mainUser);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["appliedTeachers", query, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-apply-admin?search=${query}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  // console.log(data);

  if (isLoading) return <DataLoading></DataLoading>;

  const {
    data: teachers = [],
    totalPages,
    currentPage,
    pendingCount,
  } = data || {};

  if (!teachers?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <MdOutlineManageSearch className="text-6xl mb-4 text-gray-400" />
        <p className="text-lg font-semibold">No teacher applications found</p>
        <p className="text-sm text-gray-400">
          Try adjusting filters or check again later
        </p>
      </div>
    );
  }

  const handleAccept = async (teacher) => {
    const result = await Swal.fire({
      title: `Accept ${teacher.fullName}?`,
      text: "This teacher will be approved for your platform.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/teacher-apply/update/${teacher._id}`,
          {
            requestStatus: "accepted",
            adminData: mainUser, // add here
          }
        );

        if (res.data.success && res.data.modifiedCount) {
          Swal.fire(
            "Accepted!",
            `${teacher.fullName} has been approved.`,
            "success"
          );
        } else {
          Swal.fire("Oops!", "Failed to update teacher status.", "error");
        }
        refetch();
      } catch (error) {
        // console.error(error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handleReject = async (teacher) => {
    const result = await Swal.fire({
      title: `Reject ${teacher.fullName}?`,
      text: "This teacher's request will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/teacher-apply/update/${teacher._id}`,
          {
            requestStatus: "rejected",
            adminData: mainUser, // add here too
          }
        );

        if (res.data.success && res.data.modifiedCount) {
          Swal.fire(
            "Rejected!",
            `${teacher.fullName} has been rejected.`,
            "success"
          );
        }

        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="md:p-6 ">
      {/* Main Card */}
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Applied Teachers : {pendingCount}
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              className="input input-bordered focus:outline-none focus:ring-0 w-full md:w-64 bg-transparent border border-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setQuery(search);
                  setPage(1);
                }
              }}
            />
            <button
              onClick={() => {
                setQuery(search);
                setPage(1);
              }}
              className="btn btn-square border-none btn-outline"
            >
              <MdOutlineManageSearch className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[60vh] ">
          <table className="w-full text-left border-collapse text-gray-800">
            <thead className="bg-black text-white text-sm">
              <tr>
                <th className="px-4 py-2 rounded-tl-md">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-center rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base border">
              {teachers.map((teacher, idx) => (
                <tr
                  key={teacher._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white/40" : ""
                  }  duration-300`}
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-2">{teacher.fullName}</td>
                  <td className="px-4 py-2">{teacher.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        teacher.requestStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : teacher.requestStatus === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {teacher.requestStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex items-center justify-center gap-2 ">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleAccept(teacher)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(teacher)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded btn cursor-pointer bg-green-400"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-3 py-1 border rounded ${
                page === p + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {p + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded btn cursor-pointer bg-green-400"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedTeacher && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-white text-gray-800 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Teacher Details
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedTeacher?.photo}
                alt={selectedTeacher?.fullName}
                className="w-24 h-24 rounded-full border shadow"
              />
              <div>
                <p className="font-bold">{selectedTeacher?.fullName}</p>
                <p className="text-sm text-gray-600">
                  {selectedTeacher?.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedTeacher?.status}
              </p>
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {selectedTeacher?.experience} years
              </p>
              <p className="col-span-2">
                <span className="font-semibold">Bio:</span>{" "}
                {selectedTeacher?.bio}
              </p>
              <p>
                <span className="font-semibold">Subjects:</span>{" "}
                {selectedTeacher?.subjects?.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Available Days:</span>{" "}
                {selectedTeacher?.availableDays?.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Available Times:</span>{" "}
                {selectedTeacher?.availableTimes?.join(", ")}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-sm btn-error"
                onClick={() => setSelectedTeacher(null)}
              >
                Close
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setSelectedTeacher(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AppliedTeacher;
