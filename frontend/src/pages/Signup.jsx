import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
        role,
      });
      login(res.data.user, res.data.token);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
  {/* max-w-2xl makes this card significantly wider than before */}
  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-10 md:p-14">
    
    <div className="text-center mb-10">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign Up</h2>
      <p className="text-gray-500 mt-2">Create your account to start managing events</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Optional: Using a 2-column grid for Username/Email on wide screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
            placeholder="Rahul"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Account Role</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="attendee">Attendee</option>
            <option value="admin">Organizer (Admin)</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl! shadow-lg shadow-indigo-100 transition-all mt-6"
      >
        Create Account
      </button>
    </form>

    <div className="mt-10 text-center border-t border-gray-50 pt-8">
      <p className="text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-bold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  </div>
</div>
  );
};

export default Signup;
