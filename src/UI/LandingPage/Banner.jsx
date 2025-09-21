import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./banner.css";
import "../LandingPage/video.css";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const rol = localStorage.getItem("tipousuario");
      if (isLoggedIn === "true") {
        if (rol === "1") {
          navigate("/codigo");
        } else if (rol === "2") {
          navigate("/graficas");
        }
      }
    }, [navigate]);

  return (
    <div className="container-fluid py-5">
      <div className="banner container p-0">
        <div className="bg-container container-fluid p-4 p-md-5 text-center">
          <div className="contenido-interno-banner col-lg-8 col-md-10 col-12 mx-auto">
            <h1 className="text-white fs-3 fs-md-2">
              <strong>
                Sigue el progreso de tus estudiantes con retroalimentación en
                tiempo real
              </strong>
            </h1>
            <p className="text-white fs-6 fs-md-5">
              El factor número uno para el aprendizaje y desarrollo de los
              estudiantes es una gran retroalimentación. ¿Y si pudieras eliminar
              las barreras y asegurarte de que los estudiantes reciban la ayuda
              que necesitan, cuando la necesitan?
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-3">
              <button
                className="btn primary-color-btn px-4 py-2"
                onClick={() => navigate("/roles")}
              >
                Pruébalo gratis
              </button>
              <button className="btn transparent-white-btn px-4 py-2">
                Más información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
