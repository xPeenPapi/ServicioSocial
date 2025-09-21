import React from "react";
import "./roles.css";
import imagenEstudiante from "./estudiante.png";
import imagenProfesor from "./profesor.jpg";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();
  function Asignrol(rol){
    
    localStorage.setItem("rol", rol);
  
    navigate("/signup");
  }

  return (
    <div className="roles-container">
      <main className="main-content">
        <div className="contenido-interno-roles">
          <h3 className="text-center verde">
            <strong>ActiveClassroom</strong>
          </h3>
          <p className="text-center verde">Por favor, selecciona tu rol</p>
          <div className="roles">
            <div className="role-card" onClick={() => Asignrol(1)}>
              <img
                src={imagenEstudiante}
                alt="Estudiante"
                className="role-icon"
              />
              <h2 className="role-title">Un estudiante</h2>
              <p className="role-description">
                Para participar en actividades divertidas en el aula.
              </p>
            </div>

            <div className="role-card"  onClick={() => Asignrol(2)}>
              <img src={imagenProfesor} alt="Profesor" className="role-icon" />
              <h2 className="role-title">Un profesor</h2>
              <p className="role-description">
                Instruir, involucrar y evaluar a mis alumnos.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Roles; 
