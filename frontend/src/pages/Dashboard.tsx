import { useNavigate } from "react-router";
import { Button } from "@heroui/react";

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
        <div className="flex flex-1 flex-col border p-4 border-gray-700">
          <p>Saldo actual:</p>
          <h2 className="text-2xl font-bold">
            ${JSON.parse(localStorage.getItem("user_session")!).balance}
          </h2>
          <Button className="bg-green-500">Cargar saldo</Button>
        </div>
        <div className="flex flex-1 flex-col border p-4 gap-4 border-gray-700">
          <p>Resumen del día</p>
          <div className="flex flex-row justify-center items-center  gap-4">
            <div className="flex flex-col border rounded-lg p-4">
              <p>Caracoles</p>
              <p className="text-2xl font-bold">6</p>
            </div>
            <div className="flex flex-col border rounded-lg p-4">
              <p>Carreras</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center  gap-4">
            <div className="flex flex-col border rounded-lg p-4">
              <p>Apuestas</p>
              <p className="text-2xl font-bold">22</p>
            </div>
            <div className="flex flex-col border rounded-lg p-4">
              <p>Ganadas</p>
              <p className="text-2xl font-bold">36%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row min-w-screen gap-4">
        <div className="flex flex-1 flex-col border p-4 gap-4 border-gray-700">
          <p>Apuestas ganadas y perdidas</p>
        </div>
        <div className="flex flex-1 flex-col border p-4 gap-4 border-gray-700">
          <p>Victorias por caracol</p>
        </div>
      </div>
    </div>
  );
}
