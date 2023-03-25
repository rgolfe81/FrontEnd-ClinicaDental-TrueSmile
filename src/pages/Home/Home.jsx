import React from 'react';
import { useSelector } from 'react-redux';
import { Navigator } from '../../common/Navigator/Navigator';
import { userData } from '../userSlice';
import './Home.css';

export const Home = () => {
  const credentialsRdx = useSelector(userData);
  const { token, usuario } = credentialsRdx.credentials;

  return (
    <>
      <div className='homeDesign'>
        <div className='buttonsAppointmentsDesign'>
          {token && usuario?.userId === 2 || usuario?.userId === 4 ? (
            <Navigator ruta={'Ver mis citas'} destino={'/myAppointments'} />
          ) : null}

          {token && usuario?.userId !== 2 && usuario?.userId !== 4 ? (
            <>
              <Navigator ruta={'Pedir cita'} destino={'/appointment'} />
              <Navigator ruta={'Ver mis citas'} destino={'/myAppointments'} />
            </>
          ) : null}
        </div>
        <div className='formatHome'>Home</div>
      </div>
    </>
  );
};
