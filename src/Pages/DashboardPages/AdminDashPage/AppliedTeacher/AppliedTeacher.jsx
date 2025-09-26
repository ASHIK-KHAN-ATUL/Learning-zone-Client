import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Loading from "../../../../Shared/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import userAxiosPublic from "../../../../Hooks/userAxiosPublic";

const AppliedTeacher = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = userAxiosPublic();
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const {
    data: teachers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appliedTeachers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/teacher-apply-admin");
      return res.data;
    },
  });
  console.log(teachers);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.fullName.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="input border-2 border-black bg-transparent w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-screen overflow-y-auto">
        <table className="table w-full text-black border-2">
          <thead className="text-black border-b-2 text-base">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher._id} className="border-black">
                <td>{teacher.fullName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.status}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info flex items-center gap-1"
                    onClick={() => setSelectedTeacher(teacher)}
                  >
                    <FaEye /> View
                  </button>
                  <button
                    className="btn btn-sm btn-success flex items-center gap-1"
                    onClick={() => approveMutation.mutate(teacher._id)}
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => rejectMutation.mutate(teacher._id)}
                  >
                    <FaTimes /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedTeacher && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl relative bg-yellow-100 text-black shadow-2xl rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Teacher Details
            </h2>

            {/* Image */}
            <div className="flex justify-center mb-6">
              <img
                src={selectedTeacher.photo || "https://via.placeholder.com/150"}
                alt={selectedTeacher.fullName}
                className="w-32 h-32 object-cover rounded-full border border-gray-300"
              />
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <p>
                <strong>Name:</strong> {selectedTeacher.fullName}
              </p>
              <p>
                <strong>Email:</strong> {selectedTeacher.email}
              </p>
              <p>
                <strong>Status:</strong> {selectedTeacher.status}
              </p>
              <p>
                <strong>Experience:</strong> {selectedTeacher.experience} years
              </p>
              <p className="md:col-span-2">
                <strong>Bio:</strong> {selectedTeacher.bio}
              </p>
              <p>
                <strong>Subjects:</strong> {selectedTeacher.subjects.join(", ")}
              </p>
              <p>
                <strong>Available Days:</strong>{" "}
                {selectedTeacher.availableDays.join(", ")}
              </p>
              <p>
                <strong>Available Times:</strong>{" "}
                {selectedTeacher.availableTimes.join(", ")}
              </p>
            </div>

            {/* Close Button */}
            <div className="flex justify-center">
              <button
                className="btn btn-error w-3/4"
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
