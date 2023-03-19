import React, { useState, useEffect} from 'react'
import { InputText } from '../../common/InputText/InputText';
import { checkInputs } from '../../helpers/useful';
import "./Register.css";


export const Register = () => {

  // Hooks para validación de errores

  const [credenciales, setCredenciales] = useState({
    dni: "",
    name: "",
    surname: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  });
  const [credencialesError, setCredencialesError] = useState({
    dni: "",
    name: "",
    surname: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  })
  const [credencialesIsValid, setCredencialesIsValid] = useState({
    dniIsValid: false,
    nameIsValid: false,
    surnameIsValid: false,
    cityIsValid: false,
    phoneIsValid: false,
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

// Prueba de registro hasta que podamos acceder al token
const fakeRegisterFunction = () => {
  console.log("Te has registrado");
};

  return (
    <div className="registerDesign">
      <div className="titleDesign">
        <h2>Registro Usuario</h2>
      </div>
      <InputText
        className={
          credencialesError.dniError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="text"
        maxLength="9"
        name="dni"
        placeholder="Escribe el DNI"
        required={true}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.dniError}</div>
      <InputText
        className={
          credencialesError.passwordError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="text"
        maxLength="30"
        name="name"
        placeholder="Escribe tu nombre"
        required={true}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.nameError}</div>
      <InputText
        className={
          credencialesError.passwordError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="text"
        maxLength="40"
        name="surname"
        placeholder="Escribe tus apellidos"
        required={false}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.surnameError}</div>
      <InputText
        className={
          credencialesError.passwordError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="text"
        maxLength="30"
        name="city"
        placeholder="Escribe tu ciudad"
        required={false}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.cityError}</div>
      <InputText
        className={
          credencialesError.passwordError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="text"
        maxLength="9"
        name="phone"
        placeholder="Escribe tu número de teléfono"
        required={false}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.phoneError}</div>
      <InputText
        className={
          credencialesError.emailError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="email"
        maxLength="50"
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
        maxLength="30"
        name="password"
        placeholder="Escribe la contraseña"
        required={true}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.passwordError}</div>
      <div className={activeForm ? "buttonOff buttonOn" : "buttonOff" } 
      onClick={activeForm ? () => {fakeRegisterFunction();} : () => {} }>Registrarse
      </div>
    </div>
  );
};