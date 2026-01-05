import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, toggleDarkMode } from "../../redux/userAction";
import {
  User as UserIcon,
  LogOut,
  Package,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, darkMode } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`text-sm font-medium transition-colors px-4 py-2 rounded-full ${
          isActive
            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-main)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg-main)]/60">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <Package size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-[var(--text-main)]">
            Habesha Wear
          </span>
        </Link>

        {/* CENTER: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-2 p-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full shadow-sm">
          <NavLink to="/">Shop</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          <NavLink to="/about">About</NavLink>
          {/* Placeholder link for visual balance */}
        </div>

        {/* RIGHT: Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2.5 rounded-full text-(--text-secondary) hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] transition-colors border border-transparent hover:border-[var(--border-color)]"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="h-6 w-px bg-[var(--border-color)]" />

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 pl-3 pr-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] hover:shadow-md transition-all group"
              >
                <span className="text-sm font-semibold text-[var(--text-main)]">
                  {user.name.split(" ")[0]}
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white ring-2 ring-white dark:ring-slate-800 group-hover:ring-purple-200 dark:group-hover:ring-purple-900 transition-all">
                  <UserIcon size={14} strokeWidth={2.5} />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl p-2 animate-slide-up flex flex-col gap-1">
                  <div className="px-3 py-2 border-b border-[var(--border-color)] mb-1">
                    <p className="text-xs text-[var(--text-secondary)] font-medium uppercase">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-[var(--text-main)] truncate">
                      {user.email}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-bold uppercase mt-1 inline-block">
                      {user.role}
                    </span>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-main)] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors"
                  >
                    <Package size={16} /> Dashboard
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-main)] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors"
                  >
                    <ShoppingBag size={16} /> Shop
                  </Link>

                  <div className="h-px bg-[var(--border-color)] my-1" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors w-full text-left font-medium"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="btn-primary text-sm px-5 py-2 rounded-full !shadow-none hover:!shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 text-[var(--text-secondary)]"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="p-2 text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[var(--bg-main)] border-b border-[var(--border-color)] p-4 flex flex-col gap-2 shadow-2xl animate-fade-in">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-3 bg-[var(--bg-card)] rounded-xl text-[var(--text-main)] border border-[var(--border-color)] font-medium"
          >
            Shop
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-[var(--bg-card)] rounded-xl text-[var(--text-main)] border border-[var(--border-color)] font-medium"
              >
                Dashboard
              </Link>
              <div className="h-px bg-[var(--border-color)]" />
              <div className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-main)]">
                    {user.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-3 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl font-bold text-center"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-outline text-center"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
