import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData, userout } from "../../pages/userSlice";
import { Navigator } from "../Navigator/Navigator";
import "./Header.css";
import Logo6 from "../../img/Logo6.png";
import { BsPersonFill } from "react-icons/bs";

export const Header = () => {
  const dispatch = useDispatch();
  const datosCredencialesRedux = useSelector(userData);
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(userout({ credentials: {} }));
    navigate("/");
  };

  return (
    <div className="headerDesign container-fluid">
      <div className="groupLogo">
        <div>
          <img
            src={Logo6} alt="imagen de Logo Clínica Dental" className="logoDesign"
          />
        </div>
        <div className="logoTitle">
          <h5>Clínica Dental</h5>
          <h3>TrueSmile</h3>
        </div>
      </div>
      <div className="buttonsNavigatorDesign">
        <Navigator ruta={"Home"} destino={"/"} />
        {!datosCredencialesRedux.credentials.token ? (
          <>
            <Navigator ruta={"Login"} destino={"/login"} />
            <Navigator ruta={"Registro"} destino={"/register"} />
          </>
        ) : (
          <>
            <Navigator ruta={"Perfil"} destino={"/profile"} />
            <div className="navigatorDesign" onClick={() => logoutFunction()}>
              Logout
            </div>
          </>
        )}
      </div>
      <div className="textUserDesign">
        {datosCredencialesRedux.credentials.token ? (
          <span>
            <BsPersonFill size={20} />{" "}
            {datosCredencialesRedux.credentials.nameUser}
          </span>
        ) : null}
      </div>
    </div>
  );
};