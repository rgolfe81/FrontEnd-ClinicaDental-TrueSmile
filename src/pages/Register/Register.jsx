import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../common/InputText/InputText";
import { checkInputs } from "../../helpers/useful";
import { registerMe } from "../../services/apiCalls";
import "./Register.css";
import {
  FaCity,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaRegAddressCard,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";

export const Register = () => {
  const navigate = useNavigate();

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
    dniError: "",
    nameError: "",
    surnameError: "",
    cityError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
  });
  const [credencialesIsValid, setCredencialesIsValid] = useState({
    dniIsValid: false,
    nameIsValid: false,
    surnameIsValid: false,
    cityIsValid: false,
    phoneIsValid: false,
    emailIsValid: false,
    passwordIsValid: false,
  });
  // Hook validación final que activa el botón de envío de datos
  const [activeForm, setActiveForm] = useState(false);

  // Manejador de errores. Actualiza el estado del componente

  const inputHandler = (e) => {
    setCredenciales((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  // Función del ciclo de vida del componente

  useEffect(() => {
    for (let error in credencialesError) {
      if (credencialesError[error] !== "") {
        setActiveForm(false);
        return;
      }
    }
    for (let vacio in credenciales) {
      if (credenciales[vacio] === "") {
        setActiveForm(false);
        return;
      }
    }
    for (let validated in credencialesIsValid) {
      if (credencialesIsValid[validated] === false) {
        setActiveForm(false);
        return;
      }
    }
    setActiveForm(true);
  });

  // Llamada a la función control de errores de los inputs

  const inputValidate = (e) => {
    let error = "";
    let checked = checkInputs(e.target.name, e.target.value, e.target.required);
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

  const [congratulations, setCongratulations] = useState("");

  const registrame = () => {
    registerMe(credenciales)
      .then((respuesta) => {
        let nameUser = respuesta.data.name;
        if (nameUser) {
          setCongratulations(
            `Enhorabuena ${nameUser}, te has registrado correctamente`
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setCongratulations(`Error: ${respuesta.data}`);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })

      .catch((error) => console.log(error));
  };

  return (
    <div className="registerDesign">
      <div className="boxDesignRegister">
        <div className="titleDesign">
          <h2>Registro Usuario</h2>
        </div>
        {congratulations !== "" ? (
          <div>{congratulations}</div>
        ) : (
          <>
            <div>
              <FaRegAddressCard className="iconDesign" />
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
            </div>
            <div>{credencialesError.dniError}</div>
            <div>
              <FaUser className="iconDesign" />
              <InputText
                className={
                  credencialesError.nameError === ""
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
            </div>
            <div>{credencialesError.nameError}</div>
            <div>
              <FaUserPlus className="iconDesign" />
              <InputText
                className={
                  credencialesError.surnameError === ""
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
            </div>
            <div>{credencialesError.surnameError}</div>
            <div>
              <FaCity className="iconDesign" />
              <InputText
                className={
                  credencialesError.cityError === ""
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
            </div>
            <div>{credencialesError.cityError}</div>
            <div>
              <FaPhone className="iconDesign" />
              <InputText
                className={
                  credencialesError.phoneError === ""
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
            </div>
            <div>{credencialesError.phoneError}</div>
            <div>
              <FaEnvelope className="iconDesign" />
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
            </div>
            <div>{credencialesError.emailError}</div>
            <div>
              <FaLock className="iconDesign" />
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
            </div>
            <div>{credencialesError.passwordError}</div>
            <div
              className={activeForm ? "buttonOff buttonOn" : "buttonOff"}
              onClick={
                activeForm
                  ? () => {
                      registrame();
                    }
                  : () => {}
              }
            >
              Registrarse
            </div>
          </>
        )}
      </div>
    </div>
  );
};
