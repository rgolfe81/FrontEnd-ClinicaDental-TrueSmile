import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { bringPatientAppointments } from '../../services/apiCalls';
import { userData } from '../userSlice';
import "./MyAppointments.css"

export const MyAppointments = () => {

  const [myPatientAppointments, setmyPatientAppointments] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const { token } = ReduxCredentials.credentials;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await bringPatientAppointments(token);
        setmyPatientAppointments(respuesta.data);
        console.log(respuesta.data)
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  if (!myPatientAppointments) {
    return <div>Cargando datos ...</div>;
  }

  return (
    <div className='myAppointmentDesign'>
        <div className="titleDesign">
            <h2>Mis citas</h2>
        </div>
        {myPatientAppointments.map(appointment =>
          <div key={appointment.id} className='tableDesign'>
              {
                  <Table striped bordered>
                  <thead>
                    <tr>
                      <td>nº</td>
                      <td>{appointment.id}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>Fecha</td>
                    <td>{dayjs(appointment.date).format("dddd DD MM YYYY")}</td>
                  </tr>
                  <tr>
                    <td>Tratamiento</td>
                    <td>{appointment.Dental_intervention.dental_method}</td>
                  </tr>
                  <tr>
                    <td>Precio</td>
                    <td>{appointment.Dental_intervention.price}</td>
                  </tr>
                  <tr>
                    <td>Dentista</td>
                    <td>{appointment.Doctor.User.name} {appointment.Doctor.User.surname}</td>
                  </tr>
                  <tr>
                    <td>Especialidad</td>
                    <td>{appointment.Doctor.medical_speciality}</td>
                  </tr>
                </tbody>
                </Table>
              }
          </div>
        )}
    </div>
  )
}
