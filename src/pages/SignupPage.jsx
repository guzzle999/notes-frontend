import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const SignupPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser({ fullName, email, password });
      setUser(data.user); // Save user to AuthContext
      toast.success("Registration successful!", {
        style: {
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          color: "#111827",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#B2F2BB",
          secondary: "#FFFFFF",
        },
      });
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-[url('/bg02.jpg')] bg-cover pt-8 pb-8 px-8 md:p-16">
      <div className="rounded-2xl shadow-lg bg-gradient-to-br from-[#E8F8FF] to-[#F3EEFF] w-full max-w-md p-4 md:p-8">
        <h2 className="md:text-3xl text-xl font-bold text-black text-center md:mb-8 mb-4 rounded-lg py-2 ">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-[#FFC9DE] text-red-900 rounded-lg px-4 py-2 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-base font-bold text-black mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="block w-full p-3  rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300  text-slate-700 bg-[#F9FAFB]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-bold text-black mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="block w-full p-3  rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300  text-slate-700 bg-[#F9FAFB]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-bold text-black mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full p-3  rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300  text-slate-700 bg-[#F9FAFB]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-base font-bold text-black mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="block w-full p-3  rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300  text-slate-700 bg-[#F9FAFB]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-[#D0BFFF] text-slate-900 font-bold py-3 rounded-lg transition-all duration-200 shadow hover:scale-[1.04] focus:outline-none"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-base text-black mt-6 pb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#79bbee] font-bold hover:text-[#1c8adf]"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
