import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./video.css";
import video from "../../../public/video-lp/El ruido - Clase.mp4";
import { useNavigate } from "react-router-dom";

function Video({onAcercaClick}) {
  const navigate = useNavigate();

  const toRoles = () => {
    navigate("/roles");
  };

  const toCode = () => {
    navigate("/codigo");
  };
  return (
    <>
      <div className="container-fluid m-0 p-0 relative">
        <video
          src={video}
          className="object-fit-cover w-100 medium-size"
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute p-5 w-100 blacky d-flex flex-column gap-3 h-100 justify-content-center align-items-start">
          <div className="d-flex flex-column gap-3 container">
            <div className="md-width">
              <h1 className="display-6 text-white fs-1 fs-md-3 fs-lg-1">
                <strong>Aprende de una manera dinámica y divertida</strong>
              </h1>
            </div>

            <div className="md-width">
              <h6 className="text-white fs-6 fs-md-5 fs-lg-4">
                Con ActiveClassroom vuelve el proceso de aprendizaje más
                dinámico y divertido
              </h6>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn primary-color-btn p-2 fs-6 fs-md-5 fs-lg-4"
                onClick={toRoles}
              >
                Click aquí
              </button>
              <button
                type="button"
                className="btn transparent-white-btn p-2 fs-6 fs-md-5 fs-lg-4"
                onClick={onAcercaClick}
              >
                Más información
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
