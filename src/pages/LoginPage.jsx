import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setUser(data.user); // Save user to AuthContext
      toast.success("Logged in successfully.", {
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
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-[url('/bg02.jpg')] bg-cover pt-8 px-8 md:p-16">
      <div className="rounded-2xl shadow-lg bg-gradient-to-br from-[#E8F8FF] to-[#F3EEFF] w-full max-w-md p-8">
        <h2 className="md:text-3xl text-xl font-bold text-black text-center md:mb-8 mb-4 rounded-lg py-2 ">
          Login to Your Account
        </h2>

        {error && (
          <div className="bg-[#FFC9DE] text-red-900 rounded-lg px-4 py-2 mb-4 text-center shadow-[2px_2px_0_0_#000] ">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base font-bold text-slate-900 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="block w-full p-3  rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300  text-slate-700 bg-[#F9FAFB] "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-bold text-slate-900 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300  text-slate-700 bg-[#F9FAFB] "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-[#D0BFFF] text-slate-900 font-bold py-3 rounded-lg transition-all duration-200 shadow hover:scale-[1.04] focus:outline-none"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-base text-slate-700 mt-6 ">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#79bbee] font-bold hover:text-[#1c8adf]"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
