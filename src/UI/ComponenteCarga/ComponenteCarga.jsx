import React, { forwardRef } from "react";
import "./componentecarga.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ComponenteCarga = forwardRef(({ tituloAMostrar }, ref) => {
  return (
    <dialog ref={ref} className="p-4 circular dialog-carga gray-border-bottom">
      <h3 className="titulo-carga verde bold-span text-left">
        {tituloAMostrar}
      </h3>
      <p className="gray-text bold-span">Espera un momento...</p>
      <div className="growing-spinners d-flex justify-content-between gap-2 contenedor-spinners">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="spinner-grow text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <div className="spinner-grow text-dark" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    </dialog>
  );
});

export default ComponenteCarga;
