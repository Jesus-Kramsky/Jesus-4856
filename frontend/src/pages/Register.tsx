import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    // Guarda datos de sesión en localStorage y redirige al dashboard
    localStorage.setItem(
      "user_session",
      JSON.stringify({ email: "test@example.com", password: "password" }),
    );
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Registro</h1>
      <button onClick={handleRegister}>Simular Registro</button>
      <button onClick={() => navigate("/login")}>Volver al Login</button>
    </div>
  );
}
