import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userData, userout } from '../../pages/userSlice'
import { Navigator } from '../Navigator/Navigator'
import "./Header.css"

export const Header = () => {

  const dispatch = useDispatch();
  const datosCredencialesRedux = useSelector(userData);
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(userout({credentials:{}}));
    navigate("/");
  };

  return (
    <div className='headerDesign'>
      <div className='buttonsNavigatorDesign'>
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
          <div className='navigatorDesign' onClick={()=>logoutFunction()}>Logout</div>
          </>
        )}
      </div>
      <div className="textUserDesign">
        {datosCredencialesRedux.credentials.token ? (
          <p>Usuario: {datosCredencialesRedux.credentials.nameUser}</p>
        ) : null}
      </div>
    </div>
  )
  }