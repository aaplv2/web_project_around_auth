import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";

export default function Login({ handleLogin }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    auth.authorize(email, password).then((data) => {
      if (data.jwt) {
        setEmail("");
        setPassword("");
        handleLogin();
        history.push("/profile");
      }
    });
  };
  return (
    <div className="login">
      <h2 className="login__title">Inicia sesión</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          value={email}
          placeholder="Correo electrónico"
          required
        ></input>
        <input
          className="login__input"
          type="password"
          value={password}
          placeholder="Contraseña"
          required
        ></input>
        <button className="login__button" type="submit">
          Inicia sesión
        </button>
      </form>
      <p className="login__signin">
        ¿Aún no eres miembro?{""}
        <link className="login__link">Regístrate aquí</link>
      </p>
    </div>
  );
}
