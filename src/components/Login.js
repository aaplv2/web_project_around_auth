import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import "../blocks/login.css";
import InfoTooltip from "./InfoTooltip.js";

export default function Login({
  handleLogin,
  handleCloseTooltip,
  isInfoTooltipOpen,
  setIsInfoTooltipOpen,
}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setEmail("");
          setPassword("");
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);
          handleLogin();
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMessage("Error de autorización.");
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  return (
    <div className="login">
      <h2 className="login__title">Inicia sesión</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__form-input"
          type="email"
          name="email"
          value={email}
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          className="login__form-input"
          type="password"
          name="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <div className="form__error">
          {errorMessage && (
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={handleCloseTooltip}
              isSuccess={isSuccess}
            />
          )}
        </div>
        <button className="login__button" type="submit">
          Inicia sesión
        </button>
      </form>
      <div className="login__signin">
        <p>
          ¿Aún no eres miembro? {""}
          <Link to="/signup" className="login__link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
