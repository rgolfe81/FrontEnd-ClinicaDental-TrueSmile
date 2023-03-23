import React, { useEffect, useState } from "react";
import "./Appointment.css";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { InputText } from "../../common/InputText/InputText";
import { useNavigate } from "react-router-dom";
import { addMeAppointment } from "../../services/apiCalls";
import { checkInputs } from "../../helpers/useful";

export const Appointment = () => {

  const navigate = useNavigate;
  const [fecha, setFecha] = useState(new Date());

  useEffect(()=>{
    console.log("Fecha escogida: ", dayjs(fecha).format("dddd DD MM YYYY"));
    let chooseDate = dayjs(fecha).format("dddd DD MM YYYY");
    console.log(chooseDate);
  },[fecha]);

    // Hooks para validación de errores

    const [credenciales, setCredenciales] = useState({
      service: "",
      doctor: "",
    });
    const [credencialesError, setCredencialesError] = useState({
      serviceError: "",
      doctorError: "",
    })
    const [credencialesIsValid, setCredencialesIsValid] = useState({
      serviceIsValid: false,
      doctorIsValid: false,
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
    addMeAppointment(credenciales, fecha)
    .then(respuesta => {
      let nameUser = respuesta.data.name
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
        <Calendar onChange={setFecha} value={fecha}/>
      </div>
      <div>
      <p>Fecha seleccionada: {fecha.toLocaleDateString("es-ES")}</p>
      <InputText
        className={
          credencialesError.serviceError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="number"
        maxLength="1"
        name="service"
        placeholder="Id código Tratamiento"
        required={true}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.serviceError}</div>
      <InputText
        className={
          credencialesError.doctorError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        type="number"
        maxLength="1"
        name="doctor"
        placeholder="Id Dentista"
        required={false}
        changeFunction={(e) => inputHandler(e)}
        blurValidateFunction={(e) => inputValidate(e)}
      />
      <div>{credencialesError.doctorError}</div>
      </div>
      <div className={activeForm ? "buttonOff buttonOn" : "buttonOff" } 
      onClick={activeForm ? () => {addAppointment();} : () => {} }>Solicitar
      </div>
      </>
      )}
    </div>
  );
};
