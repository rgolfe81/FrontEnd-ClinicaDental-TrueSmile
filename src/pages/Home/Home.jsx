import React from "react";
import { useSelector } from "react-redux";
import { Navigator } from "../../common/Navigator/Navigator";
import { userData } from "../userSlice";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Img_01 from "../../img/img_01.png";
import Img_02 from "../../img/img_02.png";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

export const Home = () => {
  const credentialsRdx = useSelector(userData);
  const { token, usuario } = credentialsRdx.credentials;
  return (
    <>
      <div className="homeDesign">
        <div className="buttonsAppointmentsDesign">
          {(token && usuario?.userId === 2) || usuario?.userId === 4 ? (
            <Navigator ruta={"Ver mis citas"} destino={"/myAppointments"} />
          ) : null}

          {token && usuario?.roleId === 2 ? (
            <>
              <Navigator ruta={"Ver usuarios"} destino={"/users"} />
              <Navigator ruta={"Ver citas"} destino={"/myAppointments"} />
            </>
          ) : null}

          {token &&
          usuario?.userId !== 2 &&
          usuario?.userId !== 4 &&
          usuario?.roleId !== 2 ? (
            <>
              <Navigator ruta={"Pedir cita"} destino={"/appointment"} />
              <Navigator ruta={"Ver mis citas"} destino={"/myAppointments"} />
            </>
          ) : null}
        </div>

        <Container className="transparent">
          <Row className={{ margin: 0 }}>
            <Col sm={12} md={6}>
              <h3 className="mt-4">Bienvenido</h3>
              <p className="text-justify">
                La clínica dental TRUESMILE, abierta desde el año 1981, cuenta
                con profesionales especializados que podrán solucionar cualquier
                problema derivado de su salud dental y atender a cualquier
                demanda estética dento-facial ofreciéndole siempre los últimos
                avances en todas las especialidades odontológicas, para lo cual
                cuenta con un equipo de profesionales que se actualiza
                constantemente.
                <br />
                Deseamos que nos confíen su salud bucodental sabiendo que le
                prestaremos una atención exclusiva y personalizada.
              </p>
              <div className="text-center">
                <img src={Img_01} alt="Imagen portada" className="imgDesign" />
              </div>
              <p className="mt-4">
                Combinando experiencia y tecnología de vanguardia, les ofrecemos
                el mejor servicio de calidad y confianza.
                <br />
                Valoramos toda una serie de factores y establecemos un plan
                terapéutico personalizado para devolverle una sonrisa saludable.
              </p>
              <h3 className="mt-4">Algunos consejos ...</h3>
              <h5 className="mt-4">Cepillarse los dientes</h5>
              <p>
                Es muy importante cepillarse los dientes después de cada comida
              </p>
              <h5>Revisiones</h5>
              <p>
                Revisiones periódicas cada 6 meses, la prevención es el mejor
                tratamiento
              </p>
              <h5>Ante cualquier molestia...</h5>
              <p>no dude en ponerse en contacto con nosotros</p>
            </Col>

            <Col sm={12} md={6}>
              <div className="text-center">
                <img src={Img_02} alt="imagen tratamientos" className="mt-4" />
              </div>
              <h3 className="mt-4">Tratamientos</h3>
              <h6 className="mt-4"><u>Odontología conservadora</u></h6>
              <p>Obturaciones, reconstrucciones dentales, endodoncias</p>
              <h6><u>Odontología deportiva</u></h6>
              <p>Protectores para deportes de contacto.</p>
              <h6><u>Periodoncia:</u></h6>
              <p>
                Limpiezas - tartrectomía, raspados y alisados radiculares,
                obturaciones a retro, tratamiento de las encías (gingivectomías,
                gingivoplastias, ...)
              </p>
              <h6><u>Prostodoncia:</u></h6>
              <p>
                Prótesis fija (puentes y coronas), prótesis sobre implantes,
                prótesis removibles.
              </p>
              <h6><u>Implantes, cirugía oral</u></h6>
              <p>
                extracciones dentales, extracciones de terceros molares (muelas
                del juicio), extracciones de caninos, extirpación de quistes,
                frenectomía (cirugía de frenillos), biopsias, implantación de
                hueso y membrana.
              </p>
              <h6><u>Ortodoncia</u></h6>
              <p>Fijación con braquets y aparantología funcional</p>
              <h6><u>Estética dental</u></h6>
              <p>
                blanqueamientos dentales, carillas, coronas de porcelana sin
                metal (circonio, feldespáticas, ...)
              </p>
              <h6><u>Odontopediatría:</u></h6>
              <p>
                Obturaciones en dentición temporal, pulpotomías, pulpectomías,
                extracciones dentales, mantenedores de espacio, fluoraciones
              </p>
            </Col>
          </Row>
        </Container>

        <div className="footerDesign">
          <footer className="w-100">
            <Container fluid className="formatFooter">
              <Row className={{ margin: 0 }}>
                <Col sm={12} md={4} className="text-center">
                  <h4 className="mb-3">Contacto</h4>
                  <p>Teléfono: 679 762 539</p>
                  <p>info@truesmile.com</p>
                  <p>
                    Calle Enric Valor, 1<br /> 46191 Vilamarxant
                  </p>
                </Col>
                <Col sm={12} md={4} className="text-center">
                  <h4 className="mb-3">Horarios</h4>
                  <p>Lunes - Viernes: 9:00 - 20:00</p>
                  <p>Sábados: 9:00 - 14:00</p>
                </Col>
                <Col sm={12} md={4} className="text-center">
                  <h4 className="mb-4">Redes sociales</h4>
                  <div className="socialNetworks">
                    <div>
                      <a href="#">
                        <BsInstagram className="text-white" size={30} />
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <BsFacebook className="text-white" size={30} />
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <BsTwitter className="text-white" size={30} />
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
      </div>
    </>
  );
};
