import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { GeneralCloseWrapper } from "../../components/GeneralCloseWrapper";
import { ArrowsArrowRight1 } from "../../icons/ArrowsArrowRight1";
import { ArrowsArrowRight1_1 } from "../../icons/ArrowsArrowRight1_1";
import { ArrowsArrowRight1_2 } from "../../icons/ArrowsArrowRight1_2";
import { ArrowsArrowRight1_4 } from "../../icons/ArrowsArrowRight1_4";
import { GeneralBan1 } from "../../icons/GeneralBan1";
import { SocialConnectionLove1 } from "../../icons/SocialConnectionLove1";
import "./style.css";


export const AllyStart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkSession = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
  
      if (!user || !token || user.userRol !== "ally") {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate("/iniciarSesion");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/verificar-sesion", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate("/iniciarSesion");
          return;
        }
  
        if (!response.ok) {
          console.error("Error inesperado verificando sesión");
          navigate("/iniciarSesion");
          return;
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate("/iniciarSesion");
      } finally {
        setLoading(false);
      }
    };
  
    checkSession();
  }, [navigate]);
  
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Verificando sesión...</h2>
      </div>
    );
  }
  

  return (
    <div className="inicio">
      <div className="div-3">
        <div className="group-wrapper">
          <div className="group">
            <div className="overlap-wrapper">
              <div className="overlap">
                <div className="rectangle" />

                <img
                  className="img"
                  alt="Rectangle"
                  src="/img/rectangle-59.svg"
                />

                <div className="container">
                  <div className="sub-container">
                    <div className="abstract-grid">
                      <img
                        className="pattern"
                        alt="Pattern"
                        src="/img/pattern.png"
                      />
                    </div>

                    <div className="text-container-wrapper">
                      <div className="text-container">
                        <div className="frame" />

                        <div className="text-wrapper-2">5</div>

                        <div className="paragraph">DONADORES</div>
                      </div>
                    </div>

                    <button className="div-wrapper">
                      <div className="text">¡DONA YA!</div>
                    </button>
                  </div>

                  <div className="sub-container-2">
                    <div className="abstract-design">
                      <div className="overlap-group">
                        <div className="shape" />

                        <img
                          className="shape-2"
                          alt="Shape"
                          src="/img/shape.svg"
                        />
                      </div>
                    </div>

                    <div className="overlap-group-wrapper">
                      <div className="overlap-2">
                        <div className="shape-3" />

                        <img
                          className="shape-4"
                          alt="Shape"
                          src="/img/shape-1.svg"
                        />
                      </div>
                    </div>

                    <div className="text-container-2">
                      <div className="number">300+</div>

                      <div className="text-2">Projects completed</div>
                    </div>

                    <div className="text-container-2">
                      <div className="number">16+</div>

                      <div className="text-2">Awards Received</div>
                    </div>

                    <div className="text-container-2">
                      <div className="number">12+</div>

                      <div className="text-2">Years of experience</div>
                    </div>

                    <div className="text-container-2">
                      <div className="number">34+</div>

                      <div className="text-2">Team members</div>
                    </div>
                  </div>
                </div>

                <div className="avatar-stacked">
                  <div className="overlap-3">
                    <img
                      className="ellipse"
                      alt="Ellipse"
                      src="/img/ellipse-79.svg"
                    />

                    <img
                      className="ellipse-2"
                      alt="Ellipse"
                      src="/img/ellipse-80.svg"
                    />

                    <img
                      className="ellipse-3"
                      alt="Ellipse"
                      src="/img/ellipse-81.svg"
                    />

                    <div className="group-2">
                      <div className="overlap-group-2">
                        <div className="text-wrapper-3">12</div>

                        <img
                          className="group-3"
                          alt="Group"
                          src="/img/group-121.png"
                        />
                      </div>
                    </div>
                  </div>

                  <img className="vector" alt="Vector" src="/img/vector.png" />
                </div>

                <div className="centered-menu">
                  <img className="image" alt="Image" src="/img/image-12.png" />

                  <div className="logo">
                    <div className="mexicanos-primero">
                      Mexicanos Primero
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jalisco
                    </div>
                  </div>

                  <div className="nav-menu">
                    <div className="text-wrapper-4">Proyectos</div>

                    <div className="text-wrapper-5" onClick={() => navigate("/mapado")} style={{ cursor: "pointer" }}>Mapa</div>

                    <div className="text-wrapper-6" onClick={() => navigate("/aliado/catalogo/escuelas")} style={{ cursor: "pointer" }}>Escuelas</div>

                  </div>

                  <button className="button-2" onClick={() => navigate("/perfilScreen")} style={{ cursor: "pointer" }}> <div className="text-wrapper-10">Perfil</div> </button>
                  <button 
  className="button-2" 
  onClick={() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate("/iniciarSesion");
  }}
  style={{ cursor: "pointer" }}
>
  <div className="text-wrapper-10">Cerrar sesión</div>
</button>

                </div>

                <img className="line" alt="Line" src="/img/line-44.svg" />

                <div className="ellipse-4" />

                <img className="image-2" alt="Image" src="/img/image-13.png" />
              </div>
            </div>
          </div>
        </div>

        <div className="plano">
          <div className="group">
            <div className="overlap-wrapper-2">
              <div className="overlap-4">
                <div className="overlap-group-3">
                  <img
                    className="rectangle-2"
                    alt="Rectangle"
                    src="/img/rectangle-1723.png"
                  />

                  <img
                    className="rectangle-3"
                    alt="Rectangle"
                    src="/img/rectangle-1724.svg"
                  />

                  <img
                    className="ellipse-5"
                    alt="Ellipse"
                    src="/img/ellipse-89.svg"
                  />

                  <button className="field-wrapper">
                    <div className="field">Navegar</div>
                  </button>

                  <div className="sub-headings">MEXICANOS</div>

                  <div className="sub-headings-2">PRIMERO</div>

                  <p className="we-love-developers">
                    <span className="span">Somos una </span>

                    <span className="text-wrapper-11">asociación civil</span>

                    <span className="span">
                      {" "}
                      apolítica y sin fines de lucro fundada en el 2013.
                      <br />
                      <br />
                      Defendemos el
                    </span>

                    <span className="text-wrapper-11">
                      {" "}
                      derecho a la educación
                    </span>

                    <span className="span">
                      {" "}
                      con una visión centrada en el aprendizaje de NNA de
                      escuelas públicas del estado de Jalisco.
                    </span>
                  </p>

                  <ArrowsArrowRight1_1 className="arrows-arrow-right" />
                  <ArrowsArrowRight1_2 className="arrows-arrow-right-1-2" />
                  <div className="ellipse-6" />

                  <div className="ellipse-7" />
                </div>

                <div className="ellipse-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="overlap-5">
          <div className="group-wrapper">
            <div className="group">
              <div className="overlap-wrapper-2">
                <div className="overlap-6">
                  <div className="team">
                    <div className="overlap-group-4">
                      <div className="element" />

                      <div className="element-2" />

                      <img
                        className="element-3"
                        alt="Element"
                        src="/img/2.png"
                      />

                      <p className="p">
                        <span className="text-wrapper-12">
                          Dona o recibe aportaciones con tal solo un clic a
                          través del{" "}
                        </span>

                        <span className="text-wrapper-13">nuevo</span>

                        <span className="text-wrapper-12">
                          {" "}
                          sistema de match en{" "}
                        </span>

                        <span className="text-wrapper-13">
                          Mexicanos Primero Jalisco
                        </span>

                        <span className="text-wrapper-12">.</span>
                      </p>

                      <img
                        className="element-4"
                        alt="Element"
                        src="/img/4.png"
                      />

                      <img
                        className="element-5"
                        alt="Element"
                        src="/img/3.png"
                      />

                      <p className="we-love-developers-2">
                        <span className="text-wrapper-14">
                          OXFAM CEO
                          <br />
                        </span>

                        <span className="text-wrapper-15">Robin Roth</span>
                      </p>

                      <GeneralCloseWrapper />
                      <GeneralBan1
                        className="general-ban"
                        color="#FAFAFA"
                        opacity="0.6"
                      />
                    </div>

                    <div className="we-love-developers-3">
                      Consigue ese Match
                    </div>

                    <img className="line-2" alt="Line" src="/img/line.svg" />
                  </div>

                  <img
                    className="avatar"
                    alt="Avatar"
                    src="/img/avatar-72px.svg"
                  />

                  <div className="rectangle-4" />

                  <SocialConnectionLove1 className="social-connection" />
                  <ArrowsArrowRight1
                    className="arrows-arrow-right-1"
                    color="#FAFAFA"
                  />
                  <ArrowsArrowRight1_4 className="arrows-arrow-right-1-4" />
                  <div className="ellipse-9" />

                  <img
                    className="image-3"
                    alt="Image"
                    src="/img/image-13.png"
                  />

                  <button className="button-3">
                    <div className="text-wrapper-10">Registrate</div>
                  </button>

                  <img
                    className="image-4"
                    alt="Image"
                    src="/img/image-28.png"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ubicacin-cercana">
            <div className="group-5">
              <div className="overlap-7">
                <div className="LOGIN">
                  <div className="overlap-8">
                    <img
                      className="rectangle-5"
                      alt="Rectangle"
                      src="/img/rectangle-59-1.svg"
                    />

                    <img
                      className="rectangle-6"
                      alt="Rectangle"
                      src="/img/rectangle-1722.svg"
                    />

                    <img
                      className="oxfam-logo"
                      alt="Oxfam logo"
                      src="/img/oxfam-logo-1-3.png"
                    />

                    <img
                      className="st-jude-childrens"
                      alt="St jude childrens"
                      src="/img/st-jude-childrens-research-hospital-logo-768x768-3.png"
                    />

                    <img
                      className="bc-b-d"
                      alt="Bc b d"
                      src="/img/b27c3703-6b81-49d0-a066-5633a9d3dc28-3.png"
                    />

                    <div className="frame-2">
                      <img
                        className="line-3"
                        alt="Line"
                        src="/img/line-2.svg"
                      />

                      <footer className="footer">
                        <p className="element-all-rights">
                          © 2025 All Rights Reserved
                        </p>

                        <div className="frame-3">
                          <div className="pricing">Terms</div>

                          <div className="pricing">Privacy</div>

                          <div className="pricing">Cookies</div>
                        </div>

                        <div className="frame-4">
                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group.png"
                            />
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-1.png"
                            />
                          </div>

                          <div className="mask-group-wrapper">
                            <img
                              className="mask-group"
                              alt="Mask group"
                              src="/img/mask-group-2.png"
                            />
                          </div>

                          <div className="mask-group-wrapper">
                            <div className="mask-group-2" />
                          </div>
                        </div>
                      </footer>
                    </div>

                    <div className="subscribe">
                      <div className="learn-more">Suscribete</div>

                      <div className="group-6">
                        <div className="overlap-group-5">
                          <div className="arrows-down-top-move-wrapper">
                            <img
                              className="arrows-down-top-move"
                              alt="Arrows down top move"
                              src="/img/arrows-down-top-move-1.png"
                            />
                          </div>

                          <div className="label-2">Ingresa Tu Correo</div>
                        </div>
                      </div>

                      <p className="aviso-de-privacidad">
                        <a
                          href="https://mexicanosprimerojalisco.org/pdf/aviso-privacidad-2023.pdf"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="text-wrapper-16">
                            Aviso de Privacidad
                          </span>
                        </a>

                        <span className="text-wrapper-17">{"   "}</span>
                      </p>
                    </div>
                  </div>

                  <div className="overlap-9">
                    <img
                      className="image-5"
                      alt="Image"
                      src="/img/image-22.png"
                    />

                    <div className="we-love-developers-4">
                      Ubicación Cercana
                    </div>

                    <div className="we-love-developers-5">Nuevo sistema de</div>
                  </div>
                </div>

                <p className="contacto-prado-de">
                  <span className="text-wrapper-14">
                    Contacto 
                    <br />
                  </span>

                  <span className="text-wrapper-18">
                    <br />
                  </span>

                  <span className="text-wrapper-19">
                    Prado de los Cedros #1500, Ciudad del SolZapopan, Jalisco,
                    MéxicoTel: 332-106-8253{" "}
                  </span>

                  <a
                    href="mailto:contacto@mpj.org.mx"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-wrapper-20">contactompj.org.mx</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};