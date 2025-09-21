import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./steps.css";

function Steps() {
  return (
    <div className="bg-light-green text-white p-5">
      <div className="container">
        <h2 className="text-center mb-4">
          <strong>¿Cómo funciona?</strong>
        </h2>
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card bg-standard-green text-white shadow h-100">
              <div className="card-body">
                <h5 className="card-title">1. El profesor crea la sala</h5>
                <p className="card-text">
                  El profesor crea una sala en la que podrá evaluar a sus
                  alumnos en tiempo real.
                </p>
                <p className="card-text">
                  <small className="text-white">
                    Cada sala tiene un código de acceso único.
                  </small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card bg-standard-green text-white shadow h-100">
              <div className="card-body">
                <h5 className="card-title">
                  2. Los estudiantes resuelven el cuestionario
                </h5>
                <p className="card-text">
                  Los estudiantes entran a la sala mediante el código
                  proporcionado por el profesor.
                </p>
                <p className="card-text">
                  <small className="text-white">
                    El ranking puede ser público o privado, según el profesor lo
                    decida.
                  </small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card bg-standard-green text-white shadow h-100">
              <div className="card-body">
                <h5 className="card-title">3. Recolección de los datos</h5>
                <p className="card-text">
                  Una vez completado el cuestionario, se genera un ranking según
                  el rendimiento.
                </p>
                <p className="card-text">
                  <small className="text-white">
                    El ranking ayuda a detectar estudiantes que requieran apoyo
                    adicional.
                  </small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card bg-standard-green text-white shadow h-100">
              <div className="card-body">
                <h5 className="card-title">4. Interpretación de los datos</h5>
                <p className="card-text">
                  Los datos son procesados y representados de forma amigable
                  para la evaluación.
                </p>
                <p className="card-text">
                  <small className="text-white">
                    El profesor puede elegir cómo visualizar los datos.
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
