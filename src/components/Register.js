import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import "../blocks/register.css";
import InfoTooltip from "./InfoTooltip.js";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(email, password).then((data) => {
      if (data._id) {
        setEmail("");
        setPassword("");
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        onRegister();
        navigate("/signin");
      }
    });
  };

  const handleCloseTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__form-input"
          type="email"
          name="email"
          value={email}
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          className="register__form-input"
          type="password"
          name="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button className="register__button" type="submit">
          Regístrate
        </button>
        {errorMessage && (
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={handleCloseTooltip}
            isSuccess={isSuccess}
          />
        )}
      </form>
      <p className="register__signin">
        ¿Ya eres miembro? {""}
        <Link to="/signin" className="register__link">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
