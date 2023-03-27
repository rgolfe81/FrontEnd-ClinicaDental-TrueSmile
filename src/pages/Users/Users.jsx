import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { bringAllUsers } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./Users.css";

export const Users = () => {
  const ReduxCredentials = useSelector(userData);
  const { token, usuario } = ReduxCredentials.credentials;
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let users = [];
        if (token && usuario.roleId === 2) {
          let response = await bringAllUsers(token);
          users = response.data;
        }
        setAllUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token, usuario.roleId]);
  return (
    <div className="usersDesign">
      <div className="titleDesign">
        <h2>Usuarios</h2>
      </div>
      {allUsers.map((userBring) => (
        <div key={userBring.id} className="tableDesign">
          {
            <Table striped bordered className="bg-white border-3">
              <thead>
                <tr>
                  <td>nº</td>
                  <td>{userBring.id}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DNI</td>
                  <td>{userBring.dni}</td>
                </tr>
                <tr>
                  <td>Nombre</td>
                  <td>
                    {userBring.name} {userBring.surname}
                  </td>
                </tr>
                <tr>
                  <td>Ciudad</td>
                  <td>{userBring.city}</td>
                </tr>
                <tr>
                  <td>Teléfono</td>
                  <td>{userBring.phone}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userBring.email}</td>
                </tr>
                <tr>
                  <td>Rol</td>
                    {userBring.role_id === 1 ? <td> Usuario</td> : <td>Administrador</td>}
                </tr>
              </tbody>
            </Table>
          }
        </div>
      ))}
    </div>
  );
};
