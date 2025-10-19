import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineManageSearch } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import DataLoading from "../../../../Shared/DataLoading/DataLoading";
import Swal from "sweetalert2";
import { FaEye, FaTrash } from "react-icons/fa";

const ShowRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const limit = 10;

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    program: "",
    grade: "",
    day: "",
  });
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  // Server-side routines query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["routines", query, filters, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: query,
        program: filters.program,
        grade: filters.grade,
        day: filters.day,
        page,
        limit,
      });
      const res = await axiosSecure.get(`/routine-admin?${params}`);
      return res.data; // expect { data: [...], totalPages, currentPage }
    },
    keepPreviousData: true,
  });

  if (isLoading) return <DataLoading />;

  const { data: routines = [], totalPages, currentPage } = data || {};

  const handleDelete = async (routineId) => {
    const result = await Swal.fire({
      title: "Delete Routine?",
      text: "This routine will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/routine/${routineId}`);
        // console.log(res);
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Routine has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className=" max-w-6xl mx-auto p-5 rounded-md bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <h1 className="text-2xl font-bold mb-6">Show All Routine</h1>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by Subject or Teacher"
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

        <select
          className="input input-bordered focus:outline-none focus:ring-0 bg-transparent border border-black"
          value={filters.program}
          onChange={(e) => setFilters({ ...filters, program: e.target.value })}
        >
          <option value="">All Programs</option>
          <option value="Regular Coaching">Regular Coaching</option>
          <option value="SSC Preparation">SSC Preparation</option>
          <option value="HSC / College">HSC / College</option>
        </select>

        <select
          className="input input-bordered focus:outline-none focus:ring-0 bg-transparent border border-black"
          value={filters.grade}
          onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
        >
          <option value="">All Grades</option>
          <option value="Class 6">Class 6</option>
          <option value="Class 7">Class 7</option>
          <option value="Class 8">Class 8</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
        </select>

        <select
          className="input input-bordered focus:outline-none focus:ring-0 bg-transparent border border-black"
          value={filters.day}
          onChange={(e) => setFilters({ ...filters, day: e.target.value })}
        >
          <option value="">All Days</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[60vh] border rounded-md shadow">
        {routines.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No routines found.</p>
        ) : (
          <table className="w-full text-left border-collapse text-gray-800">
            <thead className="bg-black text-white text-sm">
              <tr>
                <th className="px-4 py-2 rounded-tl-lg">#</th>
                <th className="px-4 py-2">Program</th>
                <th className="px-4 py-2">Grade</th>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Teacher</th>
                <th className="px-4 py-2 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-md border">
              {routines.map((r, idx) => (
                <tr
                  key={r._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white/40" : ""
                  }  duration-300`}
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-2">{r.program}</td>
                  <td className="px-4 py-2">{r.grade}</td>
                  <td className="px-4 py-2">{r.day}</td>
                  <td className="px-4 py-2">{r.time}</td>
                  <td className="px-4 py-2">{r.subject}</td>
                  <td className="px-4 py-2">{r.teacherName}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => setSelectedRoutine(r)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => handleDelete(r._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
        {[...Array(totalPages || 0).keys()].map((p) => (
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

      {/* Modal */}
      {selectedRoutine && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-red-50 text-gray-800 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Routine Details
            </h2>

            {/* Routine Info */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <p>
                <span className="font-semibold">Program:</span>{" "}
                {selectedRoutine.program}
              </p>
              <p>
                <span className="font-semibold">Grade:</span>{" "}
                {selectedRoutine.grade}
              </p>
              <p>
                <span className="font-semibold">Day:</span>{" "}
                {selectedRoutine.day}
              </p>
              <p>
                <span className="font-semibold">Time:</span>{" "}
                {selectedRoutine.time}
              </p>
              <p>
                <span className="font-semibold">Subject:</span>{" "}
                {selectedRoutine.subject}
              </p>
              <p>
                <span className="font-semibold">Teacher:</span>{" "}
                {selectedRoutine.teacherName}
              </p>
            </div>

            {/* Adder Info Card */}
            <div className="border-l-4 border-lime-400 p-4 rounded-lg shadow-sm bg-lime-50 flex md:flex-row justify-evenly items-center gap-4">
              {/* Heading */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase mb-1">
                  Added By
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                {/* Image */}
                <img
                  src={selectedRoutine.addedByPhoto}
                  alt={selectedRoutine.addedByName}
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full border shadow-sm"
                />

                {/* Info */}
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800">
                    {selectedRoutine.addedByName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedRoutine.addedByEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-sm btn-error font-bold"
                onClick={() => setSelectedRoutine(null)}
              >
                Close
              </button>
            </div>
          </div>

          {/* Modal Backdrop */}
          <div
            className="modal-backdrop"
            onClick={() => setSelectedRoutine(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ShowRoutine;
