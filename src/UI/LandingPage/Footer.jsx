import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <>
      <div className="footer container-fluid bg-body-tertiary border-top">
        <div className="container inner-footer d-flex flex-wrap p-5 justify-content-around align-items-start border-bottom gap-5 text-start">
          <div className="d-flex flex-column gap-2 flex-fill">
            <p>
              <strong>Producto</strong>
            </p>
            <span className="text-muted">Inicio de sesión de maestro</span>
            <span className="text-muted">Comparar funcionalidades</span>
            <span className="text-muted">Solicitar una prueba gratis</span>
          </div>
          <div className="d-flex flex-column gap-2 flex-fill">
            <p>
              <strong>Empresa</strong>
            </p>
            <span className="text-muted">Visión</span>
            <span className="text-muted">Carreras</span>
            <span className="text-muted">Blog</span>
          </div>
          <div className="d-flex flex-column gap-2 flex-fill">
            <p>
              <strong>Recursos</strong>
            </p>
            <span className="text-muted">Enviar una idea</span>
            <span className="text-muted">Desarrollo profesional</span>
            <span className="text-muted">Recursos adicionales</span>
          </div>
          <div className="d-flex flex-column gap-2 flex-fill">
            <p>
              <strong>Soporte</strong>
            </p>
            <span className="text-muted">Centro de ayuda</span>
            <span className="text-muted">Soporte IT</span>
            <span className="text-muted">FAQ</span>
            <span className="text-muted">Contáctanos</span>
          </div>
        </div>
        <div className="container text-center p-4">
          <h6 className="m-0 text-muted">
            © 2025 ActiveClassroom. Todos los derechos reservados.
          </h6>
        </div>
      </div>
    </>
  );
}

export default Footer;
