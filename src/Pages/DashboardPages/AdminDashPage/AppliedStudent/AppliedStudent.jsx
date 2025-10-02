import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Shared/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa";
import { MdOutlineManageSearch } from "react-icons/md";

const AppliedStudent = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["appliedStudents", query, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-apply-admin?search=${query}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;

  const { data: students = [], totalPages, currentPage } = data || {};
  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Applied Students</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              className="input input-bordered w-full md:w-64 bg-transparent border border-black"
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
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full text-left border-collapse text-gray-800">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 rounded-tl-md">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Program</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-center rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {students.map((student, idx) => (
                <tr
                  key={student._id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-2">{student.fullName}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.program}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        student.requestStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : student.requestStatus === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.requestStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <FaEye />
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
      {selectedStudent && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-white text-gray-800 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Student Details
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedStudent?.photo}
                alt={selectedStudent?.fullName}
                className="w-24 h-24 rounded-full border shadow"
              />
              <div>
                <p className="font-bold">{selectedStudent?.fullName}</p>
                <p className="text-sm text-gray-600">
                  {selectedStudent?.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedStudent?.phone}
              </p>
              <p>
                <span className="font-semibold">Age:</span>{" "}
                {selectedStudent?.age || "-"}
              </p>
              <p>
                <span className="font-semibold">Grade:</span>{" "}
                {selectedStudent?.grade}
              </p>
              <p>
                <span className="font-semibold">School:</span>{" "}
                {selectedStudent?.schoolName}
              </p>
              <p>
                <span className="font-semibold">Program:</span>{" "}
                {selectedStudent?.program}
              </p>
              <p>
                <span className="font-semibold">Subjects:</span>{" "}
                {selectedStudent?.subjects?.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Board:</span>{" "}
                {selectedStudent?.board}
              </p>
              <p>
                <span className="font-semibold">Target Year:</span>{" "}
                {selectedStudent?.targetYear}
              </p>
              <p>
                <span className="font-semibold">Group:</span>{" "}
                {selectedStudent?.group}
              </p>
              <p>
                <span className="font-semibold">Admission Test:</span>{" "}
                {selectedStudent?.admissionTest}
              </p>
              <p>
                <span className="font-semibold">Guardian Name:</span>{" "}
                {selectedStudent?.guardianName}
              </p>
              <p>
                <span className="font-semibold">Guardian Phone:</span>{" "}
                {selectedStudent?.guardianPhone}
              </p>
              <p className="col-span-2">
                <span className="font-semibold">Address:</span>{" "}
                {selectedStudent?.address}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-sm btn-error"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setSelectedStudent(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AppliedStudent;
