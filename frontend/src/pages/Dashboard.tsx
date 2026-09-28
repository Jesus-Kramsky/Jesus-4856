import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    navigate("/login");
  };

  return (
    <div className="">
      <h1>Dashboard (Área Protegida)</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
