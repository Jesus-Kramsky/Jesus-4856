import { Navigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  //verificar si active_session es true en el localStorage
  const isAuthenticated = JSON.parse(
    localStorage.getItem("user_session") || "{}",
  ).active_session;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
