import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  // ── Login state ──────────────────────────────────────────────
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Register state ───────────────────────────────────────────
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  // ── Handlers ─────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }

    setRegLoading(true);
    try {
      await axios.post(`${API_BASE}/auth/register`, {
        name: regName,
        email: regEmail,
        password: regPassword,
      });
      setRegSuccess("Account created! You can now log in.");
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegConfirm("");
      setTimeout(() => setActiveTab("login"), 1500);
    } catch (err) {
      setRegError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#11142a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-lg">
            🎓
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">EduTrack</h1>
            <p className="text-sm text-gray-400">Student Management System</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0f1735] p-1 rounded-lg mb-6">
          <button
            onClick={() => { setActiveTab("login"); setLoginError(""); }}
            className={`flex-1 py-2 rounded-md text-sm transition ${
              activeTab === "login"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setActiveTab("register"); setRegError(""); setRegSuccess(""); }}
            className={`flex-1 py-2 rounded-md text-sm transition ${
              activeTab === "register"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* ── LOGIN FORM ── */}
        {activeTab === "login" && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              id="login-email"
              type="email"
              placeholder="Email Address"
              required
              autoComplete="email"
              className="w-full px-4 py-3 text-white bg-[#1e293b] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input
              id="login-password"
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 text-white bg-[#1e293b] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            {loginError && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                ⚠ {loginError}
              </p>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        )}

        {/* ── REGISTER FORM ── */}
        {activeTab === "register" && (
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              id="reg-name"
              type="text"
              placeholder="Full Name"
              required
              autoComplete="name"
              className="w-full px-4 py-3 text-white bg-[#1e293b] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
            />

            <input
              id="reg-email"
              type="email"
              placeholder="Email Address"
              required
              autoComplete="email"
              className="w-full px-4 py-3 text-white bg-[#1e293b] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />

            <input
              id="reg-password"
              type="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 text-white bg-[#1e293b] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />

            <input
              id="reg-confirm"
              type="password"
              placeholder="Confirm Password"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 text-white bg-[#1e293b] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
              value={regConfirm}
              onChange={(e) => setRegConfirm(e.target.value)}
            />

            {regError && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                ⚠ {regError}
              </p>
            )}

            {regSuccess && (
              <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                ✓ {regSuccess}
              </p>
            )}

            <button
              id="reg-submit"
              type="submit"
              disabled={regLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {regLoading ? "Creating Account…" : "Create Account →"}
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-5">
          {activeTab === "login"
            ? "Don't have an account? Switch to Register."
            : "Already have an account? Switch to Login."}
        </p>
      </div>
    </div>
  );
}

export default Login;
