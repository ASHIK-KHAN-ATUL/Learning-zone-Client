import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
// 12
const JoinAsTeacherOrStudent = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Choose Your Role</h2>
        <p className="mb-10">
          Join our platform as a teacher or student and start your journey
          today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-5">
          {/* Student */}
          <div className="card bg-gradient-to-b from-yellow-100 to-white shadow-xl hover:shadow-2xl transition border border-gray-300 group">
            <div className="card-body items-center text-center">
              <FaUserGraduate className="w-14 h-14 text-green-600 mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 duration-500" />
              <h3 className="card-title transform group-hover:-translate-y-2 duration-500">
                Join as a Student
              </h3>
              <p className="mb-6">
                Enroll in courses, book slots, and grow your skills.
              </p>
              <div className="card-actions">
                <Link to="/become-student" className="btn btn-success">
                  Join as Student
                </Link>
              </div>
            </div>
          </div>

          {/* Teacher */}
          <div className="card bg-gradient-to-b from-yellow-100 to-white shadow-xl hover:shadow-2xl transition border border-gray-300 group">
            <div className="card-body items-center text-center">
              <FaChalkboardTeacher className="w-14 h-14 text-blue-600 mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 duration-500" />
              <h3 className="card-title transform group-hover:-translate-y-2 duration-500">
                Join as a Teacher
              </h3>
              <p className="mb-6">
                Create classes, manage students, and share your knowledge.
              </p>
              <div className="card-actions">
                <Link to="/teacher-apply" className="btn btn-primary">
                  Become a Teacher
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsTeacherOrStudent;
