import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { bringProfile } from "../../services/apiCalls";
import "./Profile.css";
import { Navigator } from "../../common/Navigator/Navigator";

export const Profile = () => {
  const [profile, setProfile] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const { token, usuario } = ReduxCredentials.credentials;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await bringProfile(token);
        setProfile(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  if (!profile) {
    return <div>Cargando datos ...</div>;
  }

  return (
    <div className="profileDesign">
      <div className="titleDesign">
        <h2>Perfil Usuario</h2>
      </div>
      {token && usuario?.roleId === 2 ? (
        <div>
          <h5>Administrador</h5>
        </div>
      ) : null}
      <div className="tableDesign">
        <Table striped bordered className="bg-white border-3">
          <thead>
            <tr>
              <td>DNI</td>
              <td>{profile.dni}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nombre</td>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <td>Apellidos</td>
              <td>{profile.surname}</td>
            </tr>
            <tr>
              <td>Ciudad</td>
              <td>{profile.city}</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td>{profile.phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{profile.email}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="AppointmentsButtonsDesign">
        {usuario.userId === 2 || usuario.userId === 4 ? (
          <Navigator ruta={"Ver mis citas"} destino={"/myAppointments"} />
        ) : null}
        {token && usuario?.roleId === 2 ? (
          <>
            <Navigator ruta={"Ver usuarios"} destino={"/users"} />
            <Navigator ruta={"Ver citas"} destino={"/myAppointments"} />
          </>
        ) : null}
        {token &&
        usuario?.userId !== 2 &&
        usuario?.userId !== 4 &&
        usuario?.roleId !== 2 ? (
          <>
            <Navigator ruta={"Pedir cita"} destino={"/appointment"} />
            <Navigator ruta={"Ver mis citas"} destino={"/myAppointments"} />
          </>
        ) : null}
      </div>
    </div>
  );
};
