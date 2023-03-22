import React from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice';
import "./Home.css"

export const Home = () => {

  const credentialsRdx = useSelector(userData);
  console.log (credentialsRdx.credentials.nameUser)
  return (
    <>
    <div>Usuario: {credentialsRdx.credentials.nameUser}
    </div>
    <div className='homeDesign'>
        Home
    </div>
    </>
  )
}
