import React from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../pages/userSlice'
import { Navigator } from '../Navigator/Navigator'
import "./Header.css"

export const Header = () => {

const datosCredencialesRedux = useSelector(userData);
  return (
    <div className='headerDesign'>
      <Navigator ruta={"Home"} destino={"/"}/>
      {!datosCredencialesRedux.credentials.token 
      ? 
      <>
      <Navigator ruta={"Login"} destino={"/login"} />
      <Navigator ruta={"Registro"} destino={"/register"}/>
      </>
      : 
      <>
      <Navigator ruta={"Perfil"} destino={"/profile"}/>
      <Navigator ruta={"Logout"} destino={"/"}/>
      </>
      }
    </div>
  )
  }