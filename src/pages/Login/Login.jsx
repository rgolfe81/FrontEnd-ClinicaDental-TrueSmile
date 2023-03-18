import React, { useEffect, useState } from "react";
import { InputText } from "../../common/InputText/InputText";
import { checkInputs } from "../../helpers/useful";
import "./Login.css";

export const Login = () => {

  // Hooks para validación de errores

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });
  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  })
  const [credencialesIsValid, setCredencialesIsValid] = useState({
    emailIsValid: false,
    passwordIsValid: false
  })
    // Hook validación final que activa el botón de envío de datos
  const [activeForm, setActiveForm] = useState(false);

  // Manejador de errores. Actualiza el estado del componente

  const inputHandler = (e) => {
    setCredenciales((preveState => ({...preveState, [e.target.name]: e.target.value,})));
  };

  // Función del ciclo de vida del componente

  useEffect(()=>{
    for(let error in credencialesError){
      if(credencialesError[error] !== ""){
        setActiveForm(false);
        return;
      }
    }
    for(let vacio in credenciales){
      if(credenciales[vacio] === ""){
        setActiveForm(false);
        return;
      }
    }
    for(let validated in credencialesIsValid){
      if(credencialesIsValid[validated] === false){
        setActiveForm(false);
        return;
      }
    }
    setActiveForm(true);
  });

  // Llamada a la función control de errores de los inputs

const inputValidate = (e) => {
  let error = "";
  let checked = checkInputs(
    e.target.name,
    e.target.value,
    e.target.required
  );
  error = checked.message; 
  // Set del hook de las validaciones. Actualiza su estado anterior
  console.log("Validado: ",credencialesIsValid)
  setCredencialesIsValid((prevState) => ({
    ...prevState,
    [e.target.name + "IsValid"]: checked.validated,
  }));
  // Set del hook de los errores. Actualiza su estado anterior
  setCredencialesError((prevState) => ({
    ...prevState,
    [e.target.name + "Error"]: error,
  }));
};

// Prueba de login haste que podamos acceder al token
const fakeLoginFunction = () => {
  console.log("Te has logeado");
};

  return (
    <div className="loginDesign">
      <div className="titleDesign">
        <h2>Iniciar sesión</h2>
      </div>
      <InputText
        className={
          credencialesError.emailError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="email"
        name="email"
        placeholder="Escribe el email"
        required={true}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
        <div>{credencialesError.emailError}</div>
      <InputText
        className={
          credencialesError.passwordError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="password"
        name="password"
        placeholder="Escribe la contraseña"
        required={true}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.passwordError}</div>
      <div className={activeForm ? "buttonOff buttonOn" : "buttonOff" } 
      onClick={activeForm ? () => {fakeLoginFunction();} : () => {} }>Login
      </div>
    </div>
  );
};