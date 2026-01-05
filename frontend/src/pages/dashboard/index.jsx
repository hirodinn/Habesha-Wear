import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomerView from "./views/CustomerView";
import VendorView from "./views/VendorView";
import AdminView from "./views/AdminView";

const Dashboard = () => {
  const { user } = useSelector((state) => state);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-400 mb-6">
          Please log in to view your dashboard.
        </p>
        <Link
          to="/login"
          className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Role-based Switching
  switch (user.role) {
    case "customer":
      return <CustomerView />;
    case "vendor":
      return <VendorView />;
    case "admin":
    case "owner":
      return <AdminView />;
    default:
      return (
        <div className="text-center py-12">
          <h2 className="text-xl text-red-500">Unknown Role: {user.role}</h2>
          <p className="text-gray-400">
            Your account has an invalid role configuration.
          </p>
        </div>
      );
  }
};

export default Dashboard;
