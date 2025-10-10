import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { MdOutlineManageSearch } from "react-icons/md";
import Swal from "sweetalert2";
import DataLoading from "../../../../Shared/DataLoading/DataLoading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import userAxiosPublic from "../../../../Hooks/userAxiosPublic";

const AppliedStudent = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = userAxiosPublic();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const limit = 10;

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
    queryKey: ["appliedStudents", query, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-apply-admin?search=${query}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  // console.log(data);

  if (isLoading) return <DataLoading />;

  const {
    data: students = [],
    totalPages,
    currentPage,
    pendingCount,
  } = data || {};

  // if (!students.length) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
  //       <MdOutlineManageSearch className="text-6xl mb-4 text-gray-400" />
  //       <p className="text-lg font-semibold">No applied students found</p>
  //       <p className="text-sm text-gray-400">
  //         Try adjusting filters or search terms
  //       </p>
  //     </div>
  //   );
  // }

  const handleAccept = async (student) => {
    // console.log(student._id);
    const result = await Swal.fire({
      title: `Accept ${student.fullName}?`,
      text: "This student will be approved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/student-apply/update/${student._id}`,
          {
            requestStatus: "accepted",
            processedBy: mainUser,
          }
        );

        if (res.data.success && res.data.modifiedCount) {
          Swal.fire(
            "Accepted!",
            `${student.fullName} has been approved.`,
            "success"
          );
        } else {
          Swal.fire("Oops!", "Failed to update student status.", "error");
        }
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handleReject = async (student) => {
    const result = await Swal.fire({
      title: `Reject ${student.fullName}?`,
      text: "This student's request will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/student-apply/update/${student._id}`,
          {
            requestStatus: "rejected",
            processedBy: mainUser,
          }
        );

        if (res.data.success && res.data.modifiedCount) {
          Swal.fire(
            "Rejected!",
            `${student.fullName} has been rejected.`,
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
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Applied Students : {pendingCount}
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              className="input input-bordered focus:outline-none focus:ring-0 w-full md:w-64 bg-transparent border border-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (setQuery(search), setPage(1))
              }
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
            <thead className="bg-black text-white text-sm">
              <tr>
                <th className="px-4 py-2 rounded-tl-md">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Program</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-center rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base border">
              {students.map((student, idx) => (
                <tr
                  key={student._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white/40" : ""
                  }  duration-300`}
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
                    <button
                      onClick={() => handleAccept(student)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(student)}
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
            className="px-3 py-1 rounded btn bg-green-400"
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
            className="px-3 py-1 rounded btn bg-green-400"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {selectedStudent && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl bg-white text-gray-800 rounded-3xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Header: Photo + Name + Email/Phone */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <div className="relative">
                <img
                  src={selectedStudent.photo || "/default-profile.png"}
                  alt={selectedStudent.fullName}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <span
                  className={`absolute bottom-1 right-1 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white ${
                    selectedStudent.status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  title={selectedStudent.status}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {selectedStudent.fullName}
                </h2>
                <p className="text-sm text-gray-500">{selectedStudent.email}</p>
                <p className="text-sm text-gray-500">{selectedStudent.phone}</p>
                <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedStudent.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedStudent.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
              <div>
                <span className="font-semibold">Program: </span>
                {selectedStudent.program || "-"}
              </div>
              <div>
                <span className="font-semibold">Age: </span>
                {selectedStudent.age || "-"}
              </div>
              <div>
                <span className="font-semibold">Grade: </span>
                {selectedStudent.grade || "-"}
              </div>
              <div>
                <span className="font-semibold">Group: </span>
                {selectedStudent.group || "-"}
              </div>
              <div>
                <span className="font-semibold">School Name: </span>
                {selectedStudent.schoolName || "-"}
              </div>
              <div>
                <span className="font-semibold">Board: </span>
                {selectedStudent.board || "-"}
              </div>
              <div>
                <span className="font-semibold">Guardian Name: </span>
                {selectedStudent.guardianName || "-"}
              </div>
              <div>
                <span className="font-semibold">Guardian Phone: </span>
                {selectedStudent.guardianPhone || "-"}
              </div>
              <div>
                <span className="font-semibold">Address: </span>
                {selectedStudent.address || "-"}
              </div>
              <div>
                <span className="font-semibold">Admission Test: </span>
                {selectedStudent.admissionTest || "-"}
              </div>
              <div>
                <span className="font-semibold">Target Year: </span>
                {selectedStudent.targetYear || "-"}
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <p className="font-semibold mb-1">Subjects</p>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.subjects?.length > 0 ? (
                  selectedStudent.subjects.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No subjects selected
                  </span>
                )}
              </div>
            </div>

            {/* Close Button Bottom */}
            <div className="flex justify-end mt-6">
              <button
                className="btn btn-md bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>

          {/* Backdrop */}
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
