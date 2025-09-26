import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import userAxiosPublic from "../../Hooks/userAxiosPublic";

const BecomeStudent = () => {
  const { user } = useAuth(); // expect { displayName, email, phoneNumber, ... }
  const axiosPublic = userAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: "",
      grade: "6",
      schoolName: "",
      address: "",
      program: "regular",
      subjects: [],
      board: "",
      targetYear: "",
      group: "science",
      admissionTest: "",
      guardianName: "",
      guardianPhone: "",
      agree: false,
      status: "pending",
      photo: user?.photoURL,
    },
    shouldUnregister: true, // <--- automatically removes unmounted fields
  });

  const program = watch("program");
  const selectedGrade = watch("grade");

  const onSubmit = async (data) => {
    console.log(data);
    const studentPayload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      age: data.age || null,
      grade: data.grade,
      schoolName: data.schoolName,
      address: data.address || "",
      program: data.program, // regular | ssc | college
      subjects: data.subjects || [],
      board: data.board || "",
      targetYear: data.targetYear || "",
      group: data.group || "",
      admissionTest: data.admissionTest || "",
      guardianName: data.guardianName,
      guardianPhone: data.guardianPhone,
      status: "pending",
      photo: user?.photoURL,
      createdAt: new Date(),
      role: "student",
      createdBy: user?.email || "guest",
    };

    const res = await axiosPublic.post("/student-apply", studentPayload);
    // change "/students" to "/users" if your backend expects that

    if (res?.data?.insertedId) {
      toast.success("Student application submitted successfully");
      reset();
      navigate("/"); // or wherever you want
    } else if (res?.data?.message === "exists") {
      toast.info("You are already apply as a student");
      navigate("/");
    } else {
      toast.error("Failed to save student. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 bg-gradient-to-b from-blue-100 to-blue-50">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Student Registration
      </h2>
      <p className="text-center text-sm mb-8">
        Fill the form to join as a student. If you are logged in, name & email
        are prefilled.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full name */}
        <div>
          <label className="label">
            <span className="text-black">Full Name</span>
          </label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            className="input w-full bg-white/60 border rounded-sm border-black"
            placeholder="Your full name"
            readOnly
            defaultValue={user?.displayName || ""}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="text-black">Email</span>
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
            })}
            className="input  w-full bg-white/60 border rounded-sm border-black"
            placeholder="you@example.com"
            readOnly
            value={user?.email}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="label">
            <span className="text-black">Phone Number</span>
          </label>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{8,15}$/,
                message: "Enter a valid phone number",
              },
            })}
            className="input  w-full bg-white/60 border rounded-sm border-black"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Age & Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="text-black">Age</span>
            </label>
            <input
              {...register("age", {
                required: "Age is required",
                min: { value: 5, message: "Invalid age" },
              })}
              type="number"
              className="input  w-full bg-white/60 border rounded-sm border-black"
              placeholder="Optional"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-black">Class / Grade</span>
            </label>
            <select
              {...register("grade", { required: true })}
              className="select select-bordered w-full bg-white border rounded-sm border-black"
            >
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
        </div>

        {/* School / College */}
        <div>
          <label className="label">
            <span className="text-black">School / College Name</span>
          </label>
          <input
            {...register("schoolName", {
              required: "School/College name is required",
            })}
            className="input  w-full bg-white/60 border rounded-sm border-black"
            placeholder="School or college name"
          />
          {errors.schoolName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.schoolName.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="label">
            <span className="text-black">Address (optional)</span>
          </label>
          <textarea
            {...register("address")}
            className="textarea textarea-bordered w-full bg-white/60 border rounded-sm border-black"
            rows={3}
          />
        </div>

        {/* Program Selection */}
        <div>
          <label className="label">
            <span className="text-black">Choose Program</span>
          </label>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                {...register("program")}
                type="radio"
                value="regular"
                defaultChecked
              />
              <span>Regular Classes (6–10)</span>
            </label>
            <label className="flex items-center gap-2">
              <input {...register("program")} type="radio" value="ssc" />
              <span>SSC Special Batch</span>
            </label>
            <label className="flex items-center gap-2">
              <input {...register("program")} type="radio" value="college" />
              <span>College Program (11–12)</span>
            </label>
          </div>
        </div>

        {/* Conditional: Regular (subjects) */}
        {program === "regular" && (
          <div className="py-5">
            <label className="label">
              <span className="text-black">
                Select Subjects (for Regular classes)
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["Mathematics", "Science", "English", "Bangla", "ICT"].map(
                (sub) => (
                  <label key={sub} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("subjects")}
                      value={sub}
                    />
                    <span>{sub}</span>
                  </label>
                )
              )}
            </div>
          </div>
        )}

        {/* Conditional: SSC */}
        {program === "ssc" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
            <div>
              <label className="label">
                <span className="text-black">Board Name</span>
              </label>
              <select
                {...register("board", {
                  required: "Board is required for SSC",
                })}
                className="select select-bordered w-full bg-white border rounded-sm border-black"
              >
                <option value="">Select board</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Comilla">Comilla</option>
                <option value="Jessore">Jessore</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Barisal">Barisal</option>
                <option value="Dinajpur">Dinajpur</option>
              </select>
              {errors.board && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.board.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="text-black">Target Year</span>
              </label>
              <input
                {...register("targetYear", {
                  required: "Target year is required for SSC",
                })}
                className="input  w-full bg-white/60 border rounded-sm border-black"
                placeholder="2026"
              />
              {errors.targetYear && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.targetYear.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Conditional: College */}
        {program === "college" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
            <div>
              <label className="label">
                <span className="text-black">Group</span>
              </label>
              <select
                {...register("group", { required: true })}
                className="select select-bordered w-full bg-white border rounded-sm border-black"
              >
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="text-black">
                  Admission Test Interest (optional)
                </span>
              </label>
              <select
                {...register("admissionTest")}
                className="select select-bordered w-full bg-white border rounded-sm border-black"
              >
                <option value="">None</option>
                <option value="medical">Medical</option>
                <option value="engineering">Engineering</option>
                <option value="general">General University</option>
              </select>
            </div>
          </div>
        )}

        {/* Guardian - required */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="text-black">Guardian Name</span>
            </label>
            <input
              {...register("guardianName", {
                required: "Guardian name is required",
              })}
              className="input  w-full bg-white/60 border rounded-sm border-black"
              placeholder="Guardian / Parent name"
            />
            {errors.guardianName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guardianName.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-black">Guardian Phone</span>
            </label>
            <input
              {...register("guardianPhone", {
                required: "Guardian phone is required",
                pattern: {
                  value: /^[0-9]{8,15}$/,
                  message: "Enter a valid phone",
                },
              })}
              className="input  w-full bg-white/60 border rounded-sm border-black"
              placeholder="01XXXXXXXXX"
            />
            {errors.guardianPhone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guardianPhone.message}
              </p>
            )}
          </div>
        </div>

        {/* Agreement */}
        <div>
          <label className="flex items-center gap-2">
            <input
              {...register("agree", { required: "You must confirm the info" })}
              type="checkbox"
            />
            <span>I confirm the information provided is correct.</span>
          </label>
          {errors.agree && (
            <p className="text-red-500 text-sm mt-1">{errors.agree.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success w-full  border rounded-sm border-black md:w-2/3"
          >
            Register as Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeStudent;
