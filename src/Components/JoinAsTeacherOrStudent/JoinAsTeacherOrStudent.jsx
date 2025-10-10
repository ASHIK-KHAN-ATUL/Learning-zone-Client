import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserRole from "../../Hooks/useUserRole";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import DataLoading from "../../Shared/DataLoading/DataLoading";

const JoinAsTeacherOrStudent = () => {
  const { role, roleLoading } = useUserRole();
  const { user } = useAuth();
  const navigate = useNavigate();

  // if (roleLoading) return <DataLoading />;

  const handleRoleClick = (path) => {
    if (!user) return navigate("/login");

    if (["admin", "teacher", "student"].includes(role)) {
      Swal.fire({
        title: `You are already a ${role}!`,
        html: `
          <p>You already have the role <b>${role}</b>.</p>
          <p>Access to this page is not required.</p>
          <p>If you think this is a mistake, contact LearningZone support.</p>
        `,
        icon: "info",
        confirmButtonText: "Okay",
        confirmButtonColor:
          role === "admin"
            ? "#2563eb"
            : role === "teacher"
            ? "#16a34a"
            : "#22c55e",
        background: "#1f2937",
        color: "#f3f4f6",
      });
      return;
    }

    navigate(path);
  };

  return (
    <section className="py-16  text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10 px-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400 drop-shadow-lg">
          Choose Your Role
        </h2>
        <p className="mb-10 text-gray-300">
          Join our platform as a teacher or student and start your journey
          today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Card */}
          <div className="card bg-gray-900/30 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:shadow-green-400/50 transition transform group-hover:scale-105 border border-gray-700">
            <div className="card-body items-center text-center">
              <FaUserGraduate className="w-14 h-14 text-green-400/90 drop-shadow-lg mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 duration-500" />
              <h3 className="card-title transform group-hover:-translate-y-2 duration-500 text-green-300">
                Join as a Student
              </h3>
              <p className="mb-6 text-gray-200">
                Enroll in courses, book slots, and grow your skills.
              </p>
              <div className="card-actions">
                <button
                  onClick={() => handleRoleClick("/become-student", "student")}
                  className="px-5 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-green-400 shadow-lg transition-all"
                >
                  Join as Student
                </button>
              </div>
            </div>
          </div>

          {/* Teacher Card */}
          <div className="card bg-gray-900/30 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-400/50 transition transform group-hover:scale-105 border border-gray-700">
            <div className="card-body items-center text-center">
              <FaChalkboardTeacher className="w-14 h-14 text-cyan-400/90 drop-shadow-lg mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 duration-500" />
              <h3 className="card-title transform group-hover:-translate-y-2 duration-500 text-cyan-300">
                Join as a Teacher
              </h3>
              <p className="mb-6 text-gray-200">
                Create classes, manage students, and share your knowledge.
              </p>
              <div className="card-actions">
                <button
                  onClick={() => handleRoleClick("/become-teacher", "teacher")}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-cyan-400 shadow-lg transition-all"
                >
                  Become a Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsTeacherOrStudent;
