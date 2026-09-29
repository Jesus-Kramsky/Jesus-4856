import { useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input, Label } from "@heroui/react";

export default function Login() {
  let state = useState({
    email: "",
    password: "",
    name: "",
    balance: 0,
  });

  const [formData, setFormData] = state;
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    if (localStorage.getItem("user_session")) {
      if (
        formData.email ===
          JSON.parse(localStorage.getItem("user_session")!).email &&
        formData.password ===
          JSON.parse(localStorage.getItem("user_session")!).password
      ) {
        navigate("/dashboard");
      }
    }
    setError("Email o contraseña incorrectos");
    console.log(error);
    return;
  };

  const handleRegister = () => {
    localStorage.setItem("user_session", JSON.stringify(formData));
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1>Iniciar Sesión</h1>
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
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <Button onClick={handleLogin}>Inicio de Sesión</Button>
          <Button onClick={handleRegister}>Registrarse</Button>
        </div>
      </div>
    </div>
  );
}
