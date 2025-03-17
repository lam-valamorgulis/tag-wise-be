import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth0();

  const isUser = isAuthenticated && user;

  if (!isUser) {
    return <Navigate to="/login" />;
  }
  return <Navigate to="/dashboard" />;
}
