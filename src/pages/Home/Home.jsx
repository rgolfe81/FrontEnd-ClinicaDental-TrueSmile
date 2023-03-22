import React from 'react'
import { Navigator } from '../../common/Navigator/Navigator'
import "./Home.css"

export const Home = () => {

  return (
    <>
    <div className='homeDesign'>
      <Navigator ruta={"Pedir cita"} destino={"/"} />
      Home
      <Navigator ruta={"Ver mis citas"} destino={"/"} />
    </div>
    </>
  )
}
