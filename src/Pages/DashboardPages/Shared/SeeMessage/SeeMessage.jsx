import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaUser, FaClock } from "react-icons/fa";

const SeeMessage = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response = {}, isLoading } = useQuery({
    queryKey: ["allMessages", query, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contact/messages?search=${query}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { data: messages = [], totalPages = 1 } = response;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-400">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-white">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">
          All Messages ({messages.length})
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by Name, Email, Subject"
            className="input input-bordered focus:outline-none focus:ring-0 w-full md:w-64 border border-sky-600 rounded-md px-3 py-2 bg-gray-800 text-white"
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
            className="btn btn-outline px-4 py-2 text-sky-500 
           hover:text-white hover:bg-sky-600 hover:scale-x-110 transform transition-all duration-500"
          >
            Search
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-gray-900 border-l-4 border-cyan-500 rounded-md p-4 shadow-md"
          >
            {/* Subject */}
            <h2 className="text-md font-semibold mb-3">
              {" "}
              Subject : {msg.subject}
            </h2>

            {/* Sender Info */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
              <p className="flex items-center gap-2 text-sm text-gray-200">
                <FaUser /> {msg.senderName}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-200">
                <FaEnvelope />
                <a
                  href={`mailto:${msg.senderEmail}`}
                  className="underline hover:text-cyan-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {msg.senderEmail}
                </a>
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-400">
                <FaClock />
                {new Date(msg.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Message */}
            <div className="bg-white/5 border border-sky-600 rounded-lg p-3 text-gray-100 text-sm whitespace-pre-wrap">
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            className="px-3 py-1 rounded bg-green-600 disabled:bg-gray-700"
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
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {p + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-green-600 disabled:bg-gray-700"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SeeMessage;
