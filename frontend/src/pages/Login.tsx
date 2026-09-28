import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem(
      "user_session",
      JSON.stringify({ email: "test@example.com" }),
    );
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Iniciar Sesión</h1>
      <button onClick={handleLogin}>Simular Inicio de Sesión</button>
    </div>
  );
}
