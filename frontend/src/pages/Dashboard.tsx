import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import Balance from "../components/Balance";
import DaySummary from "../components/DaySummary";
import BetsResults from "../components/BetsResults";
import SnailVictories from "../components/SnailVictories";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    //No se eliman los datos para que el usuario pueda volver a iniciar sesión sin registrarse de nuevo
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center  min-h-screen p-4 gap-4">
      <div className="flex flex-row p-4 justify-between min-w-screen border border-gray-700 rounded-lg gap-4">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido {JSON.parse(localStorage.getItem("user_session")!).name}
        </h1>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </div>
      <div className="flex flex-row min-w-screen gap-4">
        <Balance />
        <DaySummary />
      </div>
      <div className="flex flex-row min-w-screen gap-4">
        <BetsResults />
        <SnailVictories />
      </div>
    </div>
  );
}
