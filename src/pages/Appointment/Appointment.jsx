import React, { useEffect, useState } from "react";
import "./Appointment.css";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { InputText } from "../../common/InputText/InputText";
import { useNavigate } from "react-router-dom";
import { addMeAppointment } from "../../services/apiCalls";
import { checkInputs } from "../../helpers/useful";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Appointment = () => {

  const navigate = useNavigate();
  const [dateForTransform, setDateForTransform] = useState(new Date());
  const ReduxCredentials = useSelector(userData);
  const { token } = ReduxCredentials.credentials;
  

    // Hooks para validación de errores

    const [credenciales, setCredenciales] = useState({
      dental_intervention_id: "",
      doctor_id: "",
      date: dayjs(dateForTransform).format("YYYY-MM-DD hh:mm:ss"),
    });
    const [credencialesError, setCredencialesError] = useState({
      dental_intervention_idError: "",
      doctor_idError: "",
      dateError: "",
    })
    const [credencialesIsValid, setCredencialesIsValid] = useState({
      dental_intervention_idIsValid: false,
      doctor_idIsValid: false,
      dateIsValid: true,
    })
      // Hook validación final que activa el botón de envío de datos
    const [activeForm, setActiveForm] = useState(false);
  
    // Manejador de errores. Actualiza el estado del componente
  
    const inputHandler = (e) => {
      setCredenciales((preveState => ({...preveState, [e.target.name]: e.target.value})));
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
  const addAppointment = () => {
    addMeAppointment(credenciales, token)
    .then(respuesta => {
      let nameUser = ReduxCredentials.credentials.nameUser;
      if(nameUser){
        setCongratulations(`Enhorabuena ${nameUser}, has solicitado una nueva cita`);
        setTimeout(() => {
          navigate("/myAppointments");
        }, 3000);
      }
      else{
        setCongratulations(`Error: ${respuesta.data}`)
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    })
    .catch((error) => console.log(error));
  };

  return (
    <div className="appointmentDesign">
      <div className="titleDesign">
        <h2>Pedir cita</h2>
      </div>
      {congratulations !== "" ? (
        <div>{congratulations}</div>
      ) : (
        <>
      <div className="calendarDesign react-calendar__tile">
        <Calendar onChange={setDateForTransform} value={dateForTransform}/>
      </div>
      <div>
      <p>Fecha seleccionada: {dateForTransform.toLocaleDateString("es-ES")}</p>
      <InputText
        className={
          credencialesError.dental_intervention_idError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="number"
        maxLength="1"
        name="dental_intervention_id"
        placeholder="Id código Tratamiento"
        required={true}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.dental_intervention_idError}</div>
      <InputText
        className={
          credencialesError.doctor_idError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="number"
        maxLength="1"
        name="doctor_id"
        placeholder="Id Dentista"
        required={false}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.doctor_idError}</div>
      </div>
      <div className={activeForm ? "buttonOff buttonOn" : "buttonOff" } 
      onClick={activeForm ? () => {addAppointment();} : () => {} }>Solicitar
      </div>
      </>
      )}
    </div>
  );
};
