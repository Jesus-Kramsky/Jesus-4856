import { useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input, Label } from "@heroui/react";
import { Hash } from "../utils/Hash";

export default function Register() {
  let state = useState({
    email: "",
    password: "",
    name: "",
    balance: 0,
    active_session: false,
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

  const handleRegister = async () => {
    if (!validateRequiredFields()) {
      setError("Los campos son obligatorios");
      return;
    }
    try {
      const { hash, salt } = await Hash(formData.password);
      const user = {
        ...formData,
        password: hash,
        password_salt: salt,
        active_session: true,
      };
      localStorage.setItem("user_session", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo proteger la contraseña.",
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Registrarse</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-white">
              Nombre:
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <Button onClick={() => navigate("/login")}>
            Volver al inicio de Sesión
          </Button>
          <Button onClick={handleRegister}>Registrarse</Button>
        </div>
      </div>
    </div>
  );
}
