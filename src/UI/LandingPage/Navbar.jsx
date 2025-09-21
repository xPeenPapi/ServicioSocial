import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/fondo/LogoAC.png"

function Navbar({onAcercaClick}) {
  const navigate = useNavigate();

  const toSignup = () => {
    navigate("/signup");
  };

  const toLogin = () => {
    navigate("/login");
  };

  const toCrearCuestionario = () => {
    navigate("/crearcuestionario");
  };

  const toAcercade = () => {
    
  };

  const toGraficas = () => {
    navigate("/graficas");
  };

  const toRoles = () => {
    navigate("/roles");
  };

  const toCodigoClase = () => {
    navigate("/codigo");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow p-3">
        <div className="container-md">
  
          <img id="logo" src="../../../public/fondo/LogoAC.png" alt=""/>

          <div>
            <a className="navbar-brand verde" href="">
              <strong>ActiveClassroom</strong>
            </a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto gap-4">
              <li className="nav-item" onClick={toLogin}>
                <a href="#" className="nav-link gray-text">
                  Inicia sesión
                </a>
              </li>
              <li className="nav-item" onClick={onAcercaClick}>
                <a href="#" className="nav-link gray-text">
                  Acerca de
                </a>
              </li>
            </ul>

            <div className="ms-lg-3 mt-3 mt-lg-0">
              <button
                type="button"
                className="btn primary-color-btn"
                onClick={toRoles}
              >
                Regístrate
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
