import React, { useEffect, useState } from "react";
import "./Appointment.css";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { addMeAppointment } from "../../services/apiCalls";
import { checkInputs } from "../../helpers/useful";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { BsFillClipboardFill } from "react-icons/bs";
import { FaUserNurse } from "react-icons/fa";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileMedical } from '@fortawesome/free-duotone-svg-icons';
// import { duotone } from '@fortawesome/free-duotone-svg-icons';


export const Appointment = () => {
  const navigate = useNavigate();
  const [dateForTransform, setDateForTransform] = useState(new Date());
  const ReduxCredentials = useSelector(userData);
  const { token } = ReduxCredentials.credentials;

  // Hooks para validación de errores

  const [newAppointment, setNewAppointment] = useState({
    dental_intervention_id: "",
    doctor_id: "",
    date: dayjs(dateForTransform).format("YYYY-MM-DD hh:mm:ss"),
  });
  const [newAppointmentError, setNewAppointmentError] = useState({
    dental_intervention_idError: "",
    doctor_idError: "",
    dateError: "",
  });
  const [newAppointmentIsValid, setNewAppointmentIsValid] = useState({
    dental_intervention_idIsValid: false,
    doctor_idIsValid: false,
    dateIsValid: false,
  });

  // Hook validación final que activa el botón de envío de datos
  const [activeForm, setActiveForm] = useState(false);

  // Manejador de errores. Actualiza el estado del componente

  const inputHandler = (e) => {
    setNewAppointment((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  // Función del ciclo de vida del componente

  useEffect(() => {
    for (let error in newAppointmentError) {
      if (newAppointmentError[error] !== "") {
        setActiveForm(false);
        return;
      }
    }
    for (let vacio in newAppointment) {
      if (newAppointment[vacio] === "") {
        setActiveForm(false);
        return;
      }
    }
    for (let validated in newAppointmentIsValid) {
      if (newAppointmentIsValid[validated] === false) {
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
    setNewAppointmentIsValid((prevState) => ({
      ...prevState,
      [e.target.name + "IsValid"]: checked.validated,
    }));
    // Set del hook de los errores. Actualiza su estado anterior
    setNewAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const [congratulations, setCongratulations] = useState("");
  const addAppointment = () => {
    newAppointment.date = dateForTransform;

    addMeAppointment(newAppointment, token)
      .then((respuesta) => {
        let nameUser = ReduxCredentials.credentials.nameUser;
        if (nameUser) {
          setCongratulations(
            `Enhorabuena ${nameUser}, has solicitado una nueva cita`
          );
          setTimeout(() => {
            navigate("/myAppointments");
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
    <div className="appointmentDesign">
      <div className="boxDesignAppointment">
        <div className="titleDesign">
          <h2>Solicitar cita</h2>
        </div>
        {congratulations !== "" ? (
          <div>{congratulations}</div>
        ) : (
          <>
            <div className="calendarDesign react-calendar__tile">
              <Calendar
                onChange={setDateForTransform}
                value={dateForTransform}
              />
            </div>
            <div>
              <div>
                Fecha seleccionada:{" "}
                {dateForTransform.toLocaleDateString("es-ES")}
              </div>
              {/* Validación fecha seleccionada */}
              {dateForTransform < new Date()
                ? ((newAppointmentIsValid.dateIsValid = false),
                  (<div>No puedes seleccionar una fecha pasada</div>))
                : (newAppointmentIsValid.dateIsValid = true)}
              <BsFillClipboardFill size={20} />{" "}
              <select
                className={
                  newAppointmentError.dental_intervention_idError === ""
                    ? "inputBasicDesign"
                    : "inputBasicDesign inputErrorDesign"
                } name="dental_intervention_id" required={true} onChange={(e) => inputHandler(e)} onBlur={(e) => inputValidate(e)}>
                <option value="">Intervención dental</option>
                <option value="1">Odontología conservadora</option>
                <option value="2">Odontología deportiva</option>
                <option value="3">Periodoncia</option>
                <option value="4">Prostodoncia</option>
                <option value="5">Cirugía oral</option>
                <option value="6">Ortodoncia</option>
                <option value="7">Estética dental</option>
                <option value="8">Odontopediatría</option>
              </select>
              <div>{newAppointmentError.dental_intervention_idError}</div>
              <FaUserNurse size={20} />{" "}
              <select
                className={
                  newAppointmentError.doctor_idError === ""
                    ? "inputBasicDesign"
                    : "inputBasicDesign inputErrorDesign"
                } name="doctor_id" onChange={(e) => inputHandler(e)} onBlur={(e) => inputValidate(e)} required={false}> 
                <option value="">Dentista</option>
                <option value="1">Dentista general</option>
                <option value="2">Dentista pediátrico</option>
              </select>
              <div>{newAppointmentError.doctor_idError}</div>
            </div>
            <div
              className={activeForm ? "buttonOff buttonOn" : "buttonOff"}
              onClick={
                activeForm
                  ? () => {
                      addAppointment();
                    }
                  : () => {}
              }
            >
              Solicitar
            </div>
          </>
        )}
      </div>
    </div>
  );
};
