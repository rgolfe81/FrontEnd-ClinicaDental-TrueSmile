import { useSelector } from 'react-redux';
import { bringDoctorAppointments, bringPatientAppointments, deleteAppointment } from '../../services/apiCalls';
import { userData } from '../userSlice';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import "./MyAppointments.css"

export const MyAppointments = () => {

  const ReduxCredentials = useSelector(userData);
  const { token, usuario } = ReduxCredentials.credentials;
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let appointments = [];
        if (usuario.userId === 2 || usuario.userId === 4) {
          const response = await bringDoctorAppointments(token);
          appointments = response.data;
        } else {
          const response = await bringPatientAppointments(token);
          appointments = response.data;
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

  if (!myAppointments) {
    return <div>Cargando datos ...</div>;
  }

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id, token);
      setMyAppointments(myAppointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='myAppointmentDesign'>
        <div className="titleDesign">
            <h2>Mis citas</h2>
        </div>
        {myAppointments.map(appointment =>
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
                  </tr><tr>
                    <td>Paciente</td>
                    <td>{appointment.Patient.User.name} {appointment.Patient.User.surname}</td>
                  </tr>
                  <tr>
                    <td>Dentista</td>
                    <td>{appointment.Doctor.User.name} {appointment.Doctor.User.surname}</td>
                  </tr>
                  <tr>
                    <td>Especialidad</td>
                    <td>{appointment.Doctor.medical_speciality}</td>
                  </tr>
                  <tr>
                    <td>
                      <button onClick={() => handleDeleteAppointment(appointment.id)}>Eliminar</button>
                    </td>
                  </tr>
                </tbody>
                </Table>
              }
          </div>
        )}
    </div>
  )
}