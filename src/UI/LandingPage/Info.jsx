import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./info.css";

function Info({sectionRef }) {

  
  return (
    <>
      <div className="container-fluid d-flex flex-column p-5" ref={sectionRef}>
        <div className="container-md d-flex flex-column gap-3">
          <h2 className="text-center">
            <strong>Ventajas de usar ActiveClassroom</strong>
          </h2>
          <div>
            {/*Contenedor*/}
            <div className="d-flex gap-3 flex-wrap justify-content-center">
              <div className="card sm-width shadow">
                <div className="card-body">
                  <h4 className="card-title">
                    <strong>Aprendizaje interactivo</strong>
                  </h4>
                  <p className="card-text">
                    El aprendizaje es más dinámico y entretenido
                  </p>
                </div>
              </div>
              <div className="card sm-width shadow">
                <div className="card-body">
                  <h4 className="card-title">
                    <strong>Motivación y participación</strong>
                  </h4>
                  <p className="card-text">
                    Los estudiantes se sentirán más comprometidos y motivados a
                    aprender
                  </p>
                </div>
              </div>
              <div className="card sm-width shadow">
                <div className="card-body">
                  <h4 className="card-title">
                    <strong>Evaluación en tiempo real</strong>
                  </h4>
                  <p className="card-text">
                    Permite el acceso inmediato al desempeño de los alumnos
                  </p>
                </div>
              </div>
              <div className="card sm-width shadow">
                <div className="card-body">
                  <h4 className="card-title">
                    <strong>Accesibilidad y facilidad de uso</strong>
                  </h4>
                  <p className="card-text">
                    Puede ser usado desde cualquier dispositivo que tenga una
                    conexión a internet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
