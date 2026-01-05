import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { darkMode } = useSelector((state) => state);

  // Apply dark mode class to html/body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-purple-500/30 overflow-x-hidden relative transition-colors duration-300">
      {/* Background Ambience (Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* Light Mode Blobs (Soft) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 dark:bg-purple-900/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-200/40 dark:bg-cyan-900/10 blur-[100px] animate-pulse delay-1000" />
      </div>

      <Navbar />

      <main className="container mx-auto px-6 py-8 relative z-10 flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-[var(--border-color)] py-12 relative z-10 bg-[var(--bg-card)]/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-400 dark:to-gray-200">
              Habesha Wear
            </div>
            <div className="text-[var(--text-secondary)] text-sm">
              © {new Date().getFullYear()} Crafted with precision.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
