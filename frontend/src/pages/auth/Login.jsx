import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userAction";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="card-standard p-8 md:p-10 shadow-2xl shadow-purple-500/5">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-[var(--text-main)]">
              Welcome Back
            </h2>
            <p className="text-[var(--text-secondary)]">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-200 text-sm flex items-center gap-2 animate-slide-up">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error.message || "Login failed"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">
                Email
              </label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-[var(--text-secondary)]">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 group text-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
              {!loading && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              New to Habesha Wear?{" "}
              <Link
                to="/register"
                className="text-[var(--text-main)] font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
