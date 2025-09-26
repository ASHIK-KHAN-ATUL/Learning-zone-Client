import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import userAxiosPublic from "../../Hooks/userAxiosPublic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BecomeTeacher = () => {
  const { user } = useAuth();
  const axiosPublic = userAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qualification: "",
      subjects: [],
      experience: "",
      preferredClasses: [],
      teachingMode: "both",
      availableDays: [],
      availableTimes: [],
      linkedin: "",
      facebook: "",
      website: "",
      bio: "",
      agree: false,
      status: "pending",
      photo: user?.photoURL,
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const teacherPayload = {
      fullName: user?.displayName || data.fullName,
      email: user?.email || data.email,
      phone: data.phone,
      address: data.address || "",
      qualification: data.qualification,
      subjects: data.subjects || [],
      experience: data.experience,
      preferredClasses: data.preferredClasses || [],
      teachingMode: data.teachingMode,
      availableDays: data.availableDays || [],
      availableTimes: data.availableTimes || [],
      linkedin: data.linkedin || "",
      facebook: data.facebook || "",
      website: data.website || "",
      bio: data.bio || "",
      status: "pending",
      photo: user?.photoURL,
      createdAt: new Date(),
      role: "teacher",
      createdBy: user?.email || "guest",
    };

    const res = await axiosPublic.post("/teacher-apply", teacherPayload);

    if (res?.data?.insertedId) {
      toast.success("Teacher application submitted successfully");
      reset();
      navigate("/");
    } else if (res?.data?.message === "exists") {
      toast.info("You are already Apply as a teacher");
      navigate("/");
    } else {
      toast.error("Failed to save teacher info. Try again.");
    }
  };
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 bg-gradient-to-b from-blue-100 to-blue-50">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Teacher Registration
      </h2>
      <p className="text-center text-sm mb-8">
        Fill the form to join as a teacher. Name & email are auto-filled from
        your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full name */}
        <div>
          <label className="label">
            <span className="text-black">Full Name</span>
          </label>
          <input
            readOnly
            defaultValue={user?.displayName || ""}
            {...register("fullName")}
            className="input w-full bg-white/60 border rounded-sm border-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="text-black">Email</span>
          </label>
          <input
            readOnly
            defaultValue={user?.email || ""}
            {...register("email")}
            className="input w-full bg-white/60 border rounded-sm border-black"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="label">
            <span className="text-black">Phone Number</span>
          </label>
          <input
            {...register("phone", { required: "Phone is required" })}
            className="input w-full bg-white/60 border rounded-sm border-black"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="label">
            <span className="text-black">Address</span>
          </label>
          <textarea
            {...register("address")}
            className="textarea textarea-bordered w-full bg-white/60 border rounded-sm border-black"
            rows={3}
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="label">
            <span className="text-black">Highest Qualification</span>
          </label>
          <select
            {...register("qualification", {
              required: "Qualification is required",
            })}
            className="select select-bordered w-full bg-white border rounded-sm border-black"
          >
            <option value="">Select</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="Diploma">Diploma</option>
            <option value="BSc">BSc</option>
            <option value="MSc">MSc</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
          {errors.qualification && (
            <p className="text-red-500 text-sm mt-1">
              {errors.qualification.message}
            </p>
          )}
        </div>

        {/* Subjects */}
        <div>
          <label className="label">
            <span className="text-black">Subject Expertise</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["Math", "Physics", "Chemistry", "English", "ICT"].map((sub) => (
              <label key={sub} className="flex items-center gap-2">
                <input type="checkbox" {...register("subjects")} value={sub} />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="label">
            <span className="text-black">Teaching Experience (years)</span>
          </label>
          <input
            {...register("experience", { required: "Experience is required" })}
            type="number"
            min="0"
            className="input w-full bg-white/60 border rounded-sm border-black"
            placeholder="e.g. 3"
          />
        </div>

        {/* Preferred Classes */}
        <div>
          <label className="label">
            <span className="text-black">Preferred Classes / Grades</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Class 6",
              "Class 7",
              "Class 8",
              "Class 9",
              "Class 10",
              "Class 11",
              "Class 12",
              "SSC Special Batch",
              "Admission Coaching",
            ].map((cls) => (
              <label key={cls} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("preferredClasses")}
                  value={cls}
                />
                <span>{cls}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Teaching Mode */}
        <div>
          <label className="label">
            <span className="text-black">Teaching Mode</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                {...register("teachingMode")}
                value="online"
              />
              Online
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                {...register("teachingMode")}
                value="offline"
              />
              Offline
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                {...register("teachingMode")}
                value="both"
                defaultChecked
              />
              Both
            </label>
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label className="label">
            <span className="text-black">Available Days</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ].map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("availableDays")}
                  value={day}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Times */}
        <div>
          <label className="label">
            <span className="text-black">Preferred Time Slots</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["Morning", "Afternoon", "Evening"].map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("availableTimes")}
                  value={slot}
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            {...register("linkedin")}
            className="input w-full bg-white/60 border rounded-sm border-black"
            placeholder="LinkedIn (optional)"
          />
          <input
            {...register("facebook")}
            className="input w-full bg-white/60 border rounded-sm border-black"
            placeholder="Facebook (optional)"
          />
          <input
            {...register("website")}
            className="input w-full bg-white/60 border rounded-sm border-black"
            placeholder="Website (optional)"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="label">
            <span className="text-black">Short Bio / About Yourself</span>
          </label>
          <textarea
            {...register("bio")}
            className="textarea textarea-bordered w-full bg-white/60 border rounded-sm border-black"
            rows={4}
            placeholder="Write a short introduction..."
          />
        </div>

        {/* Agreement */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("agree", { required: "You must confirm the info" })}
            />
            <span>
              I confirm the above info is correct and agree to follow platform
              rules.
            </span>
          </label>
          {errors.agree && (
            <p className="text-red-500 text-sm mt-1">{errors.agree.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-2/3 border rounded-sm border-black"
          >
            Register as Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeTeacher;
