import React from 'react'
import { Navigator } from '../Navigator/Navigator'
import "./Header.css"

export const Header = () => {
  return (
    <div className='headerDesign'>
      <Navigator ruta={"Home"} destino={"/"}/>
      <Navigator ruta={"Login"} destino={"/login"} />
      <Navigator ruta={"Register"} destino={"/register"}/>
    </div>
  )
  }