import { useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "@heroui/react";

export default function Login() {
  let state = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = state;
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem(
      "user_session",
      JSON.stringify({ email: "test@example.com", password: "password" }),
    );
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen border p-4 rounded-lg">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1>Iniciar Sesión</h1>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <Button onClick={handleLogin}>Simular Inicio de Sesión</Button>
          <Button onClick={() => navigate("/register")}>Registrarse</Button>
        </div>
      </div>
    </div>
  );
}
