import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    //No se eliman los datos para que el usuario pueda volver a iniciar sesión sin registrarse de nuevo
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
