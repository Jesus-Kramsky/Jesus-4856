import { useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input, Label } from "@heroui/react";

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

  const handleLogin = () => {
    if (!validateRequiredFields()) {
      setError("Los campos son obligatorios");
      return;
    }

    //Cambiar active_session a true en el localStorage para que el usuario pueda acceder al dashboard
    const storedUser = localStorage.getItem("user_session");
    storedUser &&
      localStorage.setItem(
        "user_session",
        JSON.stringify({ ...JSON.parse(storedUser), active_session: true }),
      );

    if (!storedUser) {
      setError("Usuario no registrado. Por favor, regístrese primero.");
      return;
    }

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (
        formData.email === parsedUser.email &&
        formData.password === parsedUser.password
      ) {
        navigate("/dashboard");
        return;
      }
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
              Password:
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
