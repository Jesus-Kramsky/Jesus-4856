import { useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input, Label } from "@heroui/react";
import { Hash } from "../utils/Hash";

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

  const validateRequiredFields = () => {
    const requiredFields = ["email", "password"] as const;

    return requiredFields.every((field) => {
      const value = formData[field].trim();
      return value.length > 0;
    });
  };

  const handleLogin = async () => {
    if (!validateRequiredFields()) {
      setError("Los campos son obligatorios");
      return;
    }

    const storedUser = localStorage.getItem("user_session");
    if (!storedUser) {
      setError("Usuario no registrado. Por favor, regístrese primero.");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.password_salt) {
        setError("La cuenta usa un formato anterior. Regístrese de nuevo.");
        return;
      }

      const { hash } = await Hash(formData.password, parsedUser.password_salt);
      if (formData.email === parsedUser.email && hash === parsedUser.password) {
        localStorage.setItem(
          "user_session",
          JSON.stringify({ ...parsedUser, active_session: true }),
        );
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo validar la contraseña.",
      );
      return;
    }

    setError("Email o contraseña incorrectos");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-white">
              Email:
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-white">
              Contraseña:
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <Button onClick={handleLogin}>Inicio de Sesión</Button>
          <Button onClick={() => navigate("/register")}>Registrarse</Button>
        </div>
      </div>
    </div>
  );
}
