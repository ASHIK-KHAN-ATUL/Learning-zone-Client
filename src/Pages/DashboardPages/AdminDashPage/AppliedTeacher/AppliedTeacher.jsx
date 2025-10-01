import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Loading from "../../../../Shared/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import userAxiosPublic from "../../../../Hooks/userAxiosPublic";

const AppliedTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = userAxiosPublic();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // page state
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const limit = 10; // per page 10

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["appliedTeachers", search, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/teacher-apply-admin?search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;

  const { data: teachers = [], totalPages, currentPage } = data || {};

  return (
    <div className="p-6">
      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Applied Teachers</h1>
          <input
            type="text"
            placeholder="Search by Name or Email"
            className="input input-bordered w-full md:w-64 bg-transparent border border-black"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full text-left border-collapse text-gray-800">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 rounded-tl-md">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-center rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {teachers.map((teacher, idx) => (
                <tr
                  key={teacher._id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
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
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      <FaEye />
                    </button>
                    <button className="btn btn-xs btn-outline btn-success">
                      <FaCheck />
                    </button>
                    <button className="btn btn-xs btn-outline btn-error">
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
