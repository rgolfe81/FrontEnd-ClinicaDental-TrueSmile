import { useSelector } from "react-redux";
import {
  bringAllAppointments,
  bringDoctorAppointments,
  bringPatientAppointments,
  deleteAppointment,
} from "../../services/apiCalls";
import { userData } from "../userSlice";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./MyAppointments.css";

export const MyAppointments = () => {
  const ReduxCredentials = useSelector(userData);
  const { token, usuario } = ReduxCredentials.credentials;
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let appointments = [];
        let response;
        switch (true) {
          case (token && usuario.userId === 2) || usuario.userId === 4:
            response = await bringDoctorAppointments(token);
            appointments = response.data;
            break;
          case token &&
            usuario.userId !== 2 &&
            usuario.userId !== 4 &&
            usuario.roleId !== 2:
            response = await bringPatientAppointments(token);
            appointments = response.data;
            break;
          case token && usuario.roleId === 2:
            response = await bringAllAppointments(token);
            appointments = response.data;
            break;
          default:
            console.log("Tipo de usuario no definido");
        }
        setMyAppointments(appointments);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, usuario.userId]);

  const deleteThisAppointment = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que quieres eliminar esta cita?"
    );
    if (confirm) {
      try {
        await deleteAppointment(id, token);
        const updatedAppointments = myAppointments.filter(
          (appointment) => appointment.id !== id
        );
        setMyAppointments(updatedAppointments);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="myAppointmentDesign">
      <div className="titleDesign">
        {usuario.roleId === 2 ? <h2>Todas las citas</h2> : <h2>Mis citas</h2>}
      </div>
      {myAppointments.map((appointment) => (
        <div key={appointment.id} className="tableDesign">
          {
            <Table striped bordered className="bg-white border-3">
              <thead>
                <tr>
                  <td>nº</td>
                  <td>{appointment.id}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fecha</td>
                  <td>{dayjs(appointment.date).format("dddd DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td>Tratamiento</td>
                  <td>{appointment.Dental_intervention.dental_method}</td>
                </tr>
                <tr>
                  <td>Precio</td>
                  <td>{appointment.Dental_intervention.price}€</td>
                </tr>
                <tr>
                  <td>Paciente</td>
                  <td>
                    {appointment.Patient.User.name}{" "}
                    {appointment.Patient.User.surname}
                  </td>
                </tr>
                <tr>
                  <td>Dentista</td>
                  <td>
                    {appointment.Doctor.User.name}{" "}
                    {appointment.Doctor.User.surname}
                  </td>
                </tr>
                <tr>
                  <td>Especialidad</td>
                  <td>{appointment.Doctor.medical_speciality}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="text-center">
                    <button
                      className="buttonDesign"
                      onClick={() => deleteThisAppointment(appointment.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          }
        </div>
      ))}
    </div>
  );
};
