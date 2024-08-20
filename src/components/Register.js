import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then
      //Hacer cosas
      ();
  };
  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          type="email"
          value={email}
          placeholder="Correo electrónico"
          required
        ></input>
        <input
          className="register__input"
          type="password"
          value={password}
          placeholder="Contraseña"
          required
        ></input>
        <button className="register__button" type="submit">
          Regístrate
        </button>
      </form>
      <p className="register__signin">
        ¿Ya eres miembro?{""}
        <link className="register__link">Inicia sesión aquí</link>
      </p>
    </div>
  );
}
