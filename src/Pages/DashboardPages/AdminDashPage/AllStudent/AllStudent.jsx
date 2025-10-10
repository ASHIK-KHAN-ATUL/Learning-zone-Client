import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { MdOutlineManageSearch, MdOutlineSchool } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import DataLoading from "../../../../Shared/DataLoading/DataLoading";
import Swal from "sweetalert2";
import { FaUserGraduate } from "react-icons/fa";

const AllStudent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allStudents", query, page, filter],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-student-admin?search=${query}&page=${page}&limit=${limit}&status=${filter}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  // console.log(data);

  if (isLoading) return <DataLoading />;

  const { data: students = [], totalPages, currentPage } = data || {};

  // if (!students.length) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
  //       <MdOutlineSchool className="text-6xl mb-4 opacity-70" />
  //       <p className="text-lg font-semibold">No students found</p>
  //       <p className="text-sm text-gray-400">
  //         Try changing filters or search terms
  //       </p>
  //     </div>
  //   );
  // }

  // ✅ Toggle active/inactive status
  const handleStatusChange = async (student, newStatus) => {
    const result = await Swal.fire({
      title: `Change status of ${student.fullName}?`,
      text: `Set student as ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${newStatus}`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/student-status/${student._id}`, {
          status: newStatus,
        });
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", `Student is now ${newStatus}`, "success");
          refetch();
        }
      } catch {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="md:p-6">
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            All Students : {students.length}
          </h1>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              className="input input-bordered focus:outline-none focus:ring-0 w-full md:w-64 border border-black bg-transparent"
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
              className="btn btn-square btn-outline"
            >
              <MdOutlineManageSearch className="text-2xl" />
            </button>

            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="select select-bordered bg-transparent border border-black"
            >
              <option value="all">All</option>
              <option className="text-green-500" value="active">
                Active
              </option>
              <option className="text-red-500" value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full text-left border-collapse text-gray-800 ">
            <thead className="bg-black text-white text-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Program</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="border text-sm">
              {students.map((s, idx) => (
                <tr
                  key={s._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white/40" : ""
                  }  duration-300`}
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-2">{s.fullName}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2 capitalize">{s.program || "-"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        s.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => setSelectedStudent(s)}
                    >
                      <FaEye />
                    </button>
                    {s.status === "active" ? (
                      <button
                        onClick={() => handleStatusChange(s, "inactive")}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(s, "active")}
                        className="btn btn-xs btn-outline btn-success"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-sm bg-green-400"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-3 py-1 rounded ${
                page === p + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 border"
              }`}
            >
              {p + 1}
            </button>
          ))}
          <button
            className="btn btn-sm bg-green-400"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl bg-white text-gray-800 rounded-3xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Header: Photo + Name + Role + Student ID */}
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <img
                src={selectedStudent.photo || "/default-profile.png"}
                alt={selectedStudent.fullName || "-"}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {selectedStudent.fullName || "-"}
                </h2>
                <p className="text-gray-500">{selectedStudent.email || "-"}</p>
                <p className="text-gray-500">{selectedStudent.phone || "-"}</p>
                <p className="text-gray-500">
                  <span className="font-semibold">Student ID: </span>
                  {selectedStudent.studentId || "-"}
                </p>
                <div className="flex gap-2 mt-2 justify-center md:justify-start">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <FaUserGraduate /> STUDENT
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      selectedStudent.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedStudent.status?.toUpperCase() || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
              <p>
                <span className="font-semibold">Age:</span>{" "}
                {selectedStudent.age || "-"}
              </p>
              <p>
                <span className="font-semibold">Grade:</span>{" "}
                {selectedStudent.grade || "-"}
              </p>
              <p>
                <span className="font-semibold">School:</span>{" "}
                {selectedStudent.schoolName || "-"}
              </p>
              <p>
                <span className="font-semibold">Board:</span>{" "}
                {selectedStudent.board || "-"}
              </p>
              <p>
                <span className="font-semibold">Program:</span>{" "}
                {selectedStudent.program || "-"}
              </p>
              <p>
                <span className="font-semibold">Group:</span>{" "}
                {selectedStudent.group || "-"}
              </p>
              <p>
                <span className="font-semibold">Target Year:</span>{" "}
                {selectedStudent.targetYear || "-"}
              </p>
              <p>
                <span className="font-semibold">Admission Test:</span>{" "}
                {selectedStudent.admissionTest || "-"}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {selectedStudent.address || "-"}
              </p>
            </div>

            {/* Guardian Info */}
            <div className="border-t pt-4 mt-4 text-sm">
              <p>
                <span className="font-semibold">Guardian Name:</span>{" "}
                {selectedStudent.guardianName || "-"}
              </p>
              <p>
                <span className="font-semibold">Guardian Phone:</span>{" "}
                {selectedStudent.guardianPhone || "-"}
              </p>
            </div>

            {/* Subjects */}
            {selectedStudent.subjects?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.subjects.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Processed History */}
            {selectedStudent.processedHistory?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg border-b pb-2 mb-3">
                  Processed History
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedStudent.processedHistory.map((p, i) => (
                    <div
                      key={i}
                      className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"
                    >
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-600">{p.email}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(p.processedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button Bottom */}
            <div className="flex justify-end mt-6">
              <button
                className="btn bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudent;
