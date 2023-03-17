import React, { useEffect, useState } from "react";
import { InputText } from "../../common/InputText/InputText";
import { checkInputs } from "../../helpers/useful";
import "./Login.css";

export const Login = () => {
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });
  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  })
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const inputHandler = (e) => {
    setCredenciales((preveState => ({...preveState, [e.target.name]: e.target.value,})));
  };

  const inputValidate = (e) => {
    checkInputs(e, credenciales, setCredencialesError, setIsEmailValid, setIsPasswordValid);
  }

  useEffect(()=>{
    console.log("Credenciales vale : ", credenciales);
}, [credenciales]);

  return (
    <div className="loginDesign">
      <div className="titleDesign">
        <h2>Login</h2>
      </div>
      <InputText
        type="email"
        name="email"
        placeholder="escribe un email"
        changeFunction={(e) => inputHandler(e)}
        validateFunction={(e) => inputValidate(e)}
      />
        <div>{credencialesError.emailError}</div>
      <InputText
        type="password"
        name="password"
        placeholder="escribe el password"
        changeFunction={(e) => inputHandler(e)}
        validateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.passwordError}</div>
      <div className={(isEmailValid && isPasswordValid) ? "buttonOn" : "buttonOff" } /*onClick={() => loginFunction}*/>Login</div>
    </div>
  );
};