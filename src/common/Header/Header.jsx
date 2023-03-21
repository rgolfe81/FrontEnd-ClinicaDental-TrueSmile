import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userData, userout } from '../../pages/userSlice'
import { Navigator } from '../Navigator/Navigator'
import "./Header.css"

export const Header = () => {

  const dispatch = useDispatch();
  const datosCredencialesRedux = useSelector(userData);

  const handleLogout = () => {
    dispatch(userout({}));
  };

  // console.log(datosCredencialesRedux.credentials);
  // useEffect(() => {
  //   console.log('credenciales:', datosCredencialesRedux.credentials);
  // }, [datosCredencialesRedux.credentials]);

  return (
    <div className='headerDesign'>
      <Navigator ruta={"Home"} destino={"/"}/>
      {!datosCredencialesRedux.credentials.token 
      ?(
      <>
      <Navigator ruta={"Login"} destino={"/login"} />
      <Navigator ruta={"Registro"} destino={"/register"}/>
      </>
      ):( 
      <>
      <Navigator ruta={"Perfil"} destino={"/profile"}/>
      <Navigator ruta={"Logout"} destino={"/"} onClick={handleLogout}/>
      </>
      )}
    </div>
  )
  }