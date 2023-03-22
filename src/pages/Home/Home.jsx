import React from 'react'
import { useSelector } from 'react-redux'
import { Navigator } from '../../common/Navigator/Navigator'
import { userData } from '../userSlice'
import "./Home.css"

export const Home = () => {

  const credentialsRdx = useSelector(userData);
  
  return (
    <>
    <div className='homeDesign'>
      <div className='buttonsAppointmentsDesign'>
      {credentialsRdx.credentials.token ? (
        <>
          <Navigator ruta={"Pedir cita"} destino={"/appointment"} />
          <Navigator ruta={"Ver mis citas"} destino={"/myAppointments"} />
        </>) 
        : null}
      </div>
      <div className='formatHome'>Home
      </div>
    </div>
    </>
  )
}
