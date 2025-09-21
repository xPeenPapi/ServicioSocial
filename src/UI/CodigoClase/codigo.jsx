import React, { useEffect } from "react";
import "./codigo.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import ComponenteCarga from "../ComponenteCarga/ComponenteCarga";

function Codigo() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const cargaRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const rol = localStorage.getItem("tipousuario");
    if (isLoggedIn === "true") {
      if (rol === "1") {
        navigate("/codigo");
      } else if (rol === "2") {
        console.log("Rol de usuario no permitido en esta página");
        navigate("/graficas");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const dialogRef = useRef(null);

  const abrirDialog = () => {
    dialogRef.current.showModal();
  };

  const cerrarDialog = () => {
    dialogRef.current?.close();
  };

  // Usar fetch para llamar a la API
  const handleIngresar = async () => {
    const iduser = localStorage.getItem("iduser");
    if (!codigo) {
      alert("Ingresa el código de clase");
      return;
    }

    // Obtener o inicializar el objeto de formularios respondidos
    let formulariosRespondidos =
      JSON.parse(localStorage.getItem("formulariosRespondidos")) || {};

    // Si ya existe la clave, mostrar alerta y salir
    if (formulariosRespondidos[codigo]) {
      alert("Ya has respondido este formulario");
      return;
    }

    // Mostrar componente de carga
    cargaRef.current.showModal();

    setTimeout(async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/entrarsala/${codigo}/${iduser}`);
      const data = await res.json();
      if (data && data.questions) {
        formulariosRespondidos[codigo] = true;
        localStorage.setItem(
          "formulariosRespondidos",
          JSON.stringify(formulariosRespondidos)
        );
        localStorage.setItem("formularioActual", JSON.stringify(data));
        navigate("/respondercuestionario");
      } else {
        alert("Código de sala incorrecto o sala no encontrada");
      }
    } catch (e) {
      alert("No se pudo ingresar a la sala");
    }
    }, 3000);
  };

  return (
    <>
    <ComponenteCarga
        tituloAMostrar={"Accediendo a la sala"}
        ref={cargaRef}
      />
      <div className="clase-container">
        <button
          className="white-btn scale gray-border-bottom"
          style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
        <dialog className="dialog-codigo-clase" ref={dialogRef}>
          <div>
            <h3 className="verde bold-span">Código de clase</h3>
            <p className="gray-text">
              Los códigos de clase en ActiveClassroom consisten de una secuencia
              de ocho caracteres alfanuméricos. Este código es proporcionado por
              tu profesor, si aún no tienes el tuyo pídeselo a tu profesor.
            </p>
          </div>
          <button
            className="white-btn gray-border-bottom"
            onClick={cerrarDialog}
          >
            Cerrar
          </button>
        </dialog>
        <div className="contenedor gray-border-bottom">
          <h3 className="text-center verde">
            <strong>ActiveClassroom</strong>
            <p className="text-center verde sm-font">
              Ingresa tu código de clase
            </p>
            <div className="codigo-clase shadow">
              <h4 className="gray-text">
                <strong>Empezar a trabajar</strong>
              </h4>
              <div className="input-div">
                <span className="gray-text text-left">Código de clase</span>
                <input
                  type="text"
                  className="input-codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
              <button
                className="green-btn scale green-border-bottom"
                style={{ width: "100%", marginBottom: "10px" }}
                onClick={handleIngresar}
              >
                Ingresar
              </button>
              <div
                className="codigo-clase-contenedor pointer"
                onClick={abrirDialog}
              >
                <p className="sm-font">¿Qué es un código de clase?</p>
              </div>
              <hr />
            </div>
          </h3>
        </div>
      </div>
    </>
  );
}

export default Codigo;
