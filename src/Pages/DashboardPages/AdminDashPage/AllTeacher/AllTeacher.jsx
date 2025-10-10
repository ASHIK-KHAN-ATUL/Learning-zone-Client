import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaChalkboardTeacher, FaEye } from "react-icons/fa";
import { MdOutlineManageSearch } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import DataLoading from "../../../../Shared/DataLoading/DataLoading";
import Swal from "sweetalert2";
import { FaFacebook, FaLinkedin, FaGlobe } from "react-icons/fa";

const AllTeacher = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allTeachers", user?.email, query, page, filter],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-teacher-admin?search=${query}&page=${page}&limit=${limit}&status=${filter}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  //   console.log(data);

  if (isLoading) {
    return <DataLoading></DataLoading>;
  }

  const { data: teachers = [], totalPages = 1, currentPage = 1 } = data || {};

  // if (!teachers.length) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
  //       <FaChalkboardTeacher className="text-6xl mb-4 opacity-70" />
  //       <p className="text-lg font-semibold">No teachers found</p>
  //       <p className="text-sm text-gray-400">
  //         Try changing filters or search terms
  //       </p>
  //     </div>
  //   );
  // }

  // Toggle status (active/inactive)
  const handleStatusChange = async (teacher, newStatus) => {
    // console.log({ teacher, newStatus });

    const result = await Swal.fire({
      title: `Change status of ${teacher.fullName}?`,
      text: `Set teacher as ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${newStatus}`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/teacher-status/${teacher._id}`, {
          status: newStatus,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", `Teacher is now ${newStatus}`, "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="md:p-6">
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Header + Search + Filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            All Teachers : {teachers?.length}
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              className="input input-bordered focus:outline-none focus:ring-0 w-full md:w-64 border border-black bg-transparent"
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

            {/* Filter Dropdown */}
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
          <table className="w-full text-left border-collapse text-gray-800">
            <thead className="bg-black text-white text-sm">
              <tr>
                <th className="px-4 py-2 rounded-tl-md">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-center rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-md border">
              {teachers.map((t, idx) => (
                <tr
                  key={t._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white/40" : ""
                  }  duration-300`}
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-2">{t.fullName}</td>
                  <td className="px-4 py-2">{t.email}</td>
                  <td className="px-4 py-2">{t.role}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full flex justify-center items-center ${
                        t.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-2  ">
                    <div className="flex justify-between gap-2 items-center">
                      <button
                        className="btn btn-xs btn-outline btn-info"
                        onClick={() => setSelectedTeacher(t)}
                      >
                        <FaEye />
                      </button>
                      {t.status === "active" ? (
                        <button
                          onClick={() => handleStatusChange(t, "inactive")}
                          className="btn btn-xs btn-outline btn-error"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(t, "active")}
                          className="btn btn-xs btn-outline btn-success"
                        >
                          Activate
                        </button>
                      )}
                    </div>
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

      {selectedTeacher && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl bg-white text-gray-800 rounded-3xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Header: Photo + Name + Role + TeacherId */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
              <div className="relative">
                <img
                  src={selectedTeacher.photo || "/default-profile.png"}
                  alt={selectedTeacher.fullName || "-"}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <span
                  className={`absolute bottom-1 right-1 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white ${
                    selectedTeacher.status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  title={selectedTeacher.status || "unknown"}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {selectedTeacher.fullName || "-"}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedTeacher.email || "-"}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedTeacher.phone || "-"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Teacher ID: </span>
                  {selectedTeacher.teacherId || "-"}
                </p>
                <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                  <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedTeacher.role?.toUpperCase() || "TEACHER"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedTeacher.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedTeacher.status?.toUpperCase() || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
              <div>
                <span className="font-semibold">Qualification: </span>
                {selectedTeacher.qualification || "-"}
              </div>
              <div>
                <span className="font-semibold">Experience: </span>
                {selectedTeacher.experience
                  ? `${selectedTeacher.experience} yrs`
                  : "-"}
              </div>
              <div>
                <span className="font-semibold">Teaching Mode: </span>
                {selectedTeacher.teachingMode || "-"}
              </div>
              <div>
                <span className="font-semibold">Address: </span>
                {selectedTeacher.address || "-"}
              </div>
              <div className="col-span-1 md:col-span-2">
                <span className="font-semibold">Bio: </span>
                {selectedTeacher.bio || "-"}
              </div>
            </div>

            {/* Subjects & Preferred Classes */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1">
                <p className="font-semibold mb-1">Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.subjects?.length
                    ? selectedTeacher.subjects.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                        >
                          {s}
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1">Preferred Classes</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.preferredClasses?.length
                    ? selectedTeacher.preferredClasses.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                        >
                          {c}
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
            </div>

            {/* Available Days & Times */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1">
                <p className="font-semibold mb-1">Available Days</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.availableDays?.length
                    ? selectedTeacher.availableDays.map((d, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full"
                        >
                          {d}
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1">Available Times</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.availableTimes?.length
                    ? selectedTeacher.availableTimes.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full"
                        >
                          {t}
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 items-center text-3xl mb-6 justify-center md:justify-start">
              {selectedTeacher.facebook && (
                <a
                  href={selectedTeacher.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                  title="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {selectedTeacher.linkedin && (
                <a
                  href={selectedTeacher.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-700 hover:text-sky-900 transition-transform transform hover:scale-110"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
              {selectedTeacher.website && (
                <a
                  href={selectedTeacher.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-rose-600 hover:text-rose-800 transition-transform transform hover:scale-110"
                  title="Website"
                >
                  <FaGlobe />
                </a>
              )}
            </div>

            {/* Processed History */}
            {selectedTeacher.processedHistory?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-4 text-lg border-b pb-2">
                  Processed History
                </h3>
                <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2">
                  {selectedTeacher.processedHistory.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <p className="text-gray-600 text-sm">{p.email}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 capitalize">
                          <span className="font-semibold">Action:</span>{" "}
                          {p.action}
                        </p>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-gray-500 text-xs">
                          {new Date(p.processedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button Bottom */}
            <div className="flex justify-end mt-6">
              <button
                className="btn btn-md bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => setSelectedTeacher(null)}
              >
                Close
              </button>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="modal-backdrop"
            onClick={() => setSelectedTeacher(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AllTeacher;
