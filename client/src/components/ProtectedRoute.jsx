import { useUser, SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom"

const ADMIN_EMAIL = "suhailbaloch2000@gmail.com"; // Replace with your admin email

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) return null; // or a spinner

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  // Restrict to specific admin email
  if (user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return (
      <div className="text-center text-red-500 mt-10">
        Access denied. You are not authorized to view this page.
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;