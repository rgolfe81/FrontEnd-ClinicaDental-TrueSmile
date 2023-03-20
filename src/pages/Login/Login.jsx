import React, { useEffect, useState } from "react";
import { InputText } from "../../common/InputText/InputText";
import { checkInputs } from "../../helpers/useful";
import { logMe } from "../../services/apiCalls";
import "./Login.css";
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice"
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const credentialsRdx = useSelector(userData);

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

  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    if (credentialsRdx.credentials?.token) {
      //Si no existe token, redireccionamos a Home
      navigate("/");
    }
  }, []);

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

const logeame = () => {
  logMe(credenciales)
    .then(respuesta => {
      let decodificado = decodeToken(respuesta.data.token)
      let nameUser = respuesta.data.name
      let datosBackend = {
        token: respuesta.data.token,      
        usuario: decodificado,
        nameUser: nameUser,
      };
      console.log (respuesta.data);
      console.log (respuesta.data.token);
      console.log (decodificado);
      //Este es el momento en el que guardo en REDUX
      dispatch(login({ credentials: datosBackend }));

      //Mensaje después de Login
      if (datosBackend.token){
        setWelcome(`Hola ${nameUser} has iniciado sesión correctamente`);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      }
      else{
        setWelcome(`Error: ${respuesta.data}`)
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }      
    })

    .catch((error) => console.log(error));
};

  return (
    <div className="loginDesign">
      <div className="titleDesign">
        <h2>Iniciar sesión</h2>
      </div>
      {welcome !== "" ? (
        <div>{welcome}</div>
      ) : (
      <>
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
      onClick={activeForm ? () => {logeame();} : () => {} }>Login
      </div>
      </>
      )}
    </div>
  );
};