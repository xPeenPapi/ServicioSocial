import "./leaderboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Leaderboard() {

  const navigate = useNavigate();
  function toMainPage() {
    navigate("/codigo");
  }

  return (
    <>
      <div className="contenedor-raiz-leaderboard">
        <div className="dark-bg-container d-flex justify-content-center align-items-center">
          <div className="leaderboard-contenedor container-md d-flex flex-column gap-3">
            <div className="texto">
              <h3 className="verde bold-span">ActiveClassroom</h3>
              <h5 className="white-text text-center bold-span">
                Tabla de posiciones finales
              </h5>
            </div>
            <div className="leaderboard d-flex flex-column gap-2">
              <div className="leaderboard-header green-border-bottom d-flex p-3">
                <span className="w-25 bold-span d-flex justify-content-center">
                  Posición
                </span>
                <span className="w-25 bold-span d-flex justify-content-center">
                  Estudiante
                </span>
                <span className="w-25 bold-span d-flex justify-content-center align-items-center">
                  Puntos
                </span>
              </div>
              <div className="contenedor-posicion d-flex justify-content-evenly p-3 gray-border-bottom">
                <span className="w-25 bold-span verde posicion d-flex justify-content-center">
                  1
                </span>
                <span className="w-25 bold-span verde nombre-estudiante d-flex justify-content-center">
                  Rubén
                </span>
                <span className="w-25 bold-span verde puntos d-flex justify-content-center">
                  100
                </span>
              </div>
              <div className="contenedor-posicion d-flex justify-content-evenly p-3 gray-border-bottom">
                <span className="w-25 bold-span verde posicion d-flex justify-content-center">
                  2
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde nombre-estudiante text-center">
                  Carlos
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde puntos text-center">
                  95
                </span>
              </div>
              <div className="contenedor-posicion d-flex justify-content-evenly p-3 gray-border-bottom">
                <span className="w-25 d-flex justify-content-center bold-span verde posicion text-center">
                  3
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde nombre-estudiante text-center">
                  Javier
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde puntos text-center">
                  90
                </span>
              </div>
              <div className="contenedor-posicion d-flex justify-content-evenly p-3 gray-border-bottom">
                <span className="w-25 d-flex justify-content-center bold-span verde posicion text-center">
                  4
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde nombre-estudiante text-center">
                  José
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde puntos text-center">
                  85
                </span>
              </div>
              <div className="contenedor-posicion d-flex justify-content-evenly p-3 gray-border-bottom">
                <span className="w-25 d-flex justify-content-center bold-span verde posicion text-center">
                  5
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde nombre-estudiante text-center">
                  Jorge
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde puntos text-center">
                  75
                </span>
              </div>
              <div className="contenedor-posicion d-flex justify-content-evenly p-3 gray-border-bottom">
                <span className="w-25 d-flex justify-content-center bold-span verde posicion text-center">
                  6
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde nombre-estudiante text-center">
                  Alberto
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde puntos text-center">
                  65
                </span>
              </div>
              <div className="contenedor-posicion d-flex justify-content-evenly p-3 gray-border-bottom">
                <span className="w-25 d-flex justify-content-center bold-span verde posicion text-center">
                  7
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde nombre-estudiante text-center">
                  Enrique
                </span>
                <span className="w-25 d-flex justify-content-center bold-span verde puntos text-center">
                  60
                </span>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <button className="green-btn-cuestionario green-border-bottom" onClick={toMainPage}>
                Volver a página principal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
