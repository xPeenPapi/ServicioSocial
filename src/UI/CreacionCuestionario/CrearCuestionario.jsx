import "bootstrap/dist/css/bootstrap.min.css";
import "./crearcuestionario.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import QuizForm from "./QuizForm";
import VerdaderoFalsoForm from "./VerdaderoFalsoForm";

function CrearCuestionario() {
  const [mismoTiempo, setMismoTiempo] = useState(false);
  const [mismosPuntos, setMismosPuntos] = useState(false);
  const [valorPregunta, setValorPregunta] = useState("un-punto");

  const [preguntas, setPreguntas] = useState([
    {
      numero: 1,
      tipo: "quiz",
      question: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
      tiempo: 30,
      retroalimentacion: "si",
    },
  ]);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(0); // índice de la pregunta seleccionada
  const [titulo, setTitulo] = useState("");
  const [opcion, setOpcion] = useState("quiz");
  const [mismaRetro, setMismaRetro] = useState(false);

  const handleTipoPreguntaChange = (tipo) => {
    setPreguntas((prev) =>
      prev.map((p, idx) =>
        idx === preguntaSeleccionada
          ? {
              ...p,
              tipo,
              // Si cambia a quiz, agrega options; si cambia a vf, elimina options
              options: tipo === "quiz" ? ["", "", "", ""] : undefined,
            }
          : p
      )
    );
    setOpcion(tipo);
  };

  // Agrega una nueva pregunta
  const handleAgregarPregunta = () => {
    setPreguntas((prev) => [
      ...prev,
      {
        numero: prev.length + 1,
        tipo: "quiz",
        question: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
        tiempo: 30,
        retroalimentacion:
          preguntas[preguntaSeleccionada]?.retroalimentacion || "si",
      },
    ]);
    setPreguntaSeleccionada(preguntas.length);
    setOpcion("quiz");
  };

  const handleRetroalimentacionChange = (pregIdx, value) => {
    if (mismaRetro) return;
    setPreguntas((prev) =>
      prev.map((p, i) =>
        i === pregIdx ? { ...p, retroalimentacion: value } : p
      )
    );
  };

  const handleMismaRetroChange = (e) => {
    const checked = e.target.checked;
    setMismaRetro(checked);
    if (checked) {
      // Aplica el valor de la pregunta seleccionada a todas
      const retro = preguntas[preguntaSeleccionada].retroalimentacion || "si";
      setPreguntas((prev) =>
        prev.map((p) => ({ ...p, retroalimentacion: retro }))
      );
    }
  };

  const handleRetroalimentacionGlobalChange = (value) => {
    if (mismaRetro) {
      setPreguntas((prev) =>
        prev.map((p) => ({ ...p, retroalimentacion: value }))
      );
    } else {
      setPreguntas((prev) =>
        prev.map((p, i) =>
          i === preguntaSeleccionada ? { ...p, retroalimentacion: value } : p
        )
      );
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const rol = localStorage.getItem("tipousuario");
    if (isLoggedIn === "true") {
      if (rol === "1") {
        console.log("Rol de usuario no permitido en esta página");
        navigate("/graficas");
      } else if (rol === "2") {
        navigate("/crearcuestionario");
      }
    }

    setPreguntas((prev) =>
      prev.map((p) => ({
        ...p,
        valor: p.valor || valorPregunta,
      }))
    );
  }, [navigate]);

  // Cambia el texto de la pregunta
  const handlePreguntaChange = (idx, value) => {
    setPreguntas((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, question: value } : p))
    );
  };

  // Cambia una opción de respuesta
  const handleOpcionChange = (pregIdx, optIdx, value) => {
    setPreguntas((prev) =>
      prev.map((p, i) =>
        i === pregIdx
          ? {
              ...p,
              options: p.options.map((opt, j) => (j === optIdx ? value : opt)),
            }
          : p
      )
    );
  };

  const generarSalaId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  // Maneja el cambio de texto en el título
  const handleTituloChange = (e) => setTitulo(e.target.value);

  // Maneja el cambio de respuesta correcta
  const handleCorrectaChange = (pregIdx, value) => {
    setPreguntas((prev) =>
      prev.map((p, i) =>
        i === pregIdx ? { ...p, correctAnswerIndex: value } : p
      )
    );
  };

  // Maneja el cambio de tiempo
  const handleTiempoChange = (pregIdx, value) => {
    if (mismoTiempo) {
      setPreguntas((prev) =>
        prev.map((p) => ({ ...p, tiempo: parseInt(value, 10) }))
      );
    } else {
      setPreguntas((prev) =>
        prev.map((p, i) =>
          i === pregIdx ? { ...p, tiempo: parseInt(value, 10) } : p
        )
      );
    }
  };

  // Checkbox: mismo tiempo para todas las preguntas
  const handleMismoTiempoChange = (e) => {
    const checked = e.target.checked;
    setMismoTiempo(checked);
    if (checked) {
      // Aplica el tiempo de la pregunta seleccionada a todas
      const tiempo = preguntas[preguntaSeleccionada].tiempo;
      setPreguntas((prev) => prev.map((p) => ({ ...p, tiempo })));
    }
  };

  // Checkbox: mismos puntos para todas las preguntas
  const handleMismosPuntosChange = (e) => {
    const checked = e.target.checked;
    setMismosPuntos(checked);
    if (checked) {
      // Aplica el valor de la pregunta seleccionada a todas
      const valor = preguntas[preguntaSeleccionada].valor || valorPregunta;
      setPreguntas((prev) => prev.map((p) => ({ ...p, valor })));
    }
  };

  // Selecciona una pregunta para editar
  const handleSeleccionarPregunta = (idx) => {
    setPreguntaSeleccionada(idx);
    setOpcion(preguntas[idx].tipo);
  };

  const handleValorPreguntaChange = (value) => {
    setValorPregunta(value);
    if (mismosPuntos) {
      setPreguntas((prev) => prev.map((p) => ({ ...p, valor: value })));
    } else {
      setPreguntas((prev) =>
        prev.map((p, i) =>
          i === preguntaSeleccionada ? { ...p, valor: value } : p
        )
      );
    }
  };

  // Elimina una pregunta
  const handleEliminarPregunta = (idx) => {
    if (preguntas.length === 1) return; // No permitir eliminar la última pregunta
    // Elimina la pregunta y recalcula los números
    const nuevasPreguntas = preguntas
      .filter((_, i) => i !== idx)
      .map((p, i) => ({
        ...p,
        numero: i + 1, // Reasigna el número de pregunta
      }));
    setPreguntas(nuevasPreguntas);
    setPreguntaSeleccionada(idx > 0 ? idx - 1 : 0);
  };

  // Envía el cuestionario al backend
  const handleGuardar = async () => {
    const salaid = generarSalaId();
    const userId = localStorage.getItem("iduser");
    const username = localStorage.getItem("username");

    if (!titulo.trim()) {
      alert("Ingrese el nombre del cuestionario");
      return;
    }

    const payload = {
      salaid,
      userId,
      username,
      tituloform: titulo,
      questions: preguntas.map((p) => ({
        ...p,
        valor: p.valor || valorPregunta, // Asegura que todas las preguntas tengan un valor
      })),
    };

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/crearsala`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Sala creada exitosamente");
      navigate("/graficas");
    } catch (error) {
      alert("Error al crear la sala");
      console.error("Error al crear la sala:", error);
    }
  };

  const redirectToGraficas = () => {
    navigate("/graficas");
  };

  return (
    <div className="container-fluid contenedor-base d-flex flex-column p-0">
      <nav className="navbar navbar-expand-lg navbar-creacion-cuestionario p-3 shadow">
        <div className="container-md">
          <div className="d-flex gap-2 align-items-center">
            <img id="logo" src="../../../public/fondo/LogoAC.png" alt="" />

            <h4 className="verde m-0">
              <strong>ActiveClassroom</strong>
            </h4>
          </div>
          <button
            className="navbar-toggler mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="navbar-creacion-cuestionario-interno container-fluid d-flex flex-lg-row gap-3 justify-content-center align-items-center p-0">
              <div className="botones-izq d-flex gap-2 flex-wrap container-fluid justify-content-end p-0">
                <input
                  type="text"
                  placeholder="Ingresa el título del cuestionario"
                  className="input-cuestionario bold-span"
                  value={titulo}
                  onChange={handleTituloChange}
                />
                <button
                  className="white-btn-cuestionario gray-border-bottom scale boton-nav"
                  onClick={redirectToGraficas}
                >
                  Salir
                </button>
                <button
                  className="green-btn-cuestionario green-border-bottom scale boton-nav"
                  onClick={handleGuardar}
                >
                  Crear Sala
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="cuestionario container-fluid p-0 d-flex justify-content-center">
        <div className="row expand limitar">
          <div className="col-sm contenedor-preguntas-agregar p-3 d-flex flex-column gap-3">
            <div className="contenedor-preguntas-agregar-interno d-flex flex-column gap-3">
              {preguntas.map((preg, idx) => (
                <div
                  className={`previsualizacion-pregunta ${
                    preguntaSeleccionada === idx ? "selected" : ""
                  }`}
                  key={preg.numero}
                  onClick={() => handleSeleccionarPregunta(idx)}
                  style={{
                    cursor: "pointer",
                    background:
                      preguntaSeleccionada === idx ? "#e0ffe0" : "white",
                  }}
                >
                  <div className="titulo-iconos mb-1 d-flex justify-content-between align-items-center">
                    <span className="gray-text bold-span d-flex gap-2">
                      Pregunta {preg.numero}
                    </span>
                  </div>
                  <div className="miniatura-pregunta gray-text pointer">
                    {preg.question || "Sin pregunta"}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="green-btn-cuestionario green-border-bottom btn-agregar-pregunta"
              onClick={handleAgregarPregunta}
            >
              Agregar nueva pregunta
            </button>
          </div>
          <div className="col-8 p-0 m-0 contenedor-preguntas container-sm d-flex align-items-center justify-content-center">
            <div className="contenedor-preguntas-interno p-4 flex flex-column gap-4">
              <input
                type="text"
                placeholder="Escribe la pregunta"
                className="container-fluid text-center p-3 input-pregunta green-border-bottom"
                value={preguntas[preguntaSeleccionada].question}
                onChange={(e) =>
                  handlePreguntaChange(preguntaSeleccionada, e.target.value)
                }
              />
              <div className="seccion-preguntas">
                {preguntas[preguntaSeleccionada].tipo === "quiz" && (
                  <QuizForm
                    pregunta={preguntas[preguntaSeleccionada]}
                    onOpcionChange={(optIdx, value) =>
                      handleOpcionChange(preguntaSeleccionada, optIdx, value)
                    }
                    onCorrectaChange={(value) =>
                      handleCorrectaChange(preguntaSeleccionada, value)
                    }
                    onPreguntaChange={(value) =>
                      handlePreguntaChange(preguntaSeleccionada, value)
                    }
                  />
                )}
                {preguntas[preguntaSeleccionada].tipo === "verdadero-falso" && (
                  <VerdaderoFalsoForm
                    pregunta={preguntas[preguntaSeleccionada]}
                    onCorrectaChange={(value) =>
                      handleCorrectaChange(preguntaSeleccionada, value)
                    }
                    onPreguntaChange={(value) =>
                      handlePreguntaChange(preguntaSeleccionada, value)
                    }
                  />
                )}
              </div>
            </div>
          </div>

          <div className="col-sm d-flex flex-column gap-3 shadow p-3 justify-content-between">
            <div className="d-flex flex-column gap-3">
              <div className="flex flex-column gap-2">
                <span className="bold-span gray-text">Tipo de pregunta</span>
                <select
                  className="select-cuestionario gray-text"
                  name="tipo-pregunta"
                  value={preguntas[preguntaSeleccionada].tipo}
                  onChange={(e) => handleTipoPreguntaChange(e.target.value)}
                >
                  <option value="quiz">Quiz</option>
                  <option value="verdadero-falso">Verdadero o falso</option>
                </select>
              </div>
              <div className="flex flex-column gap-2">
                <span className="bold-span gray-text">Límite de tiempo</span>
                <select
                  className="select-cuestionario gray-text"
                  name="limite-tiempo"
                  value={preguntas[preguntaSeleccionada].tiempo}
                  onChange={(e) =>
                    handleTiempoChange(preguntaSeleccionada, e.target.value)
                  }
                  disabled={mismoTiempo}
                >
                  <option value={10}>10 segundos</option>
                  <option value={20}>20 segundos</option>
                  <option value={30}>30 segundos</option>
                  <option value={40}>40 segundos</option>
                  <option value={50}>50 segundos</option>
                  <option value={60}>1 minuto</option>
                  <option value={120}>2 minutos</option>
                  <option value={180}>3 minutos</option>
                  <option value={240}>4 minutos</option>
                  <option value={300}>5 minutos</option>
                </select>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="mismos-tiempo-preguntas"
                    checked={mismoTiempo}
                    onChange={handleMismoTiempoChange}
                  />
                  <span className="gray-text">
                    Aplicar el mismo tiempo para todas las preguntas
                  </span>
                </div>
              </div>
              <div className="flex flex-column gap-2">
                <span className="bold-span gray-text">
                  Valor de la pregunta
                </span>
                <select
                  className="select-cuestionario gray-text"
                  name="valor-pregunta"
                  value={preguntas[preguntaSeleccionada].valor || valorPregunta}
                  onChange={(e) => handleValorPreguntaChange(e.target.value)}
                  disabled={mismosPuntos}
                >
                  <option value="un-punto">1 punto</option>
                  <option value="dos-puntos">2 puntos</option>
                  <option value="cinco-puntos">5 puntos</option>
                  <option value="diez-puntos">10 puntos</option>
                </select>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="mismos-puntos-preguntas"
                    checked={mismosPuntos}
                    onChange={handleMismosPuntosChange}
                  />
                  <span className="gray-text">
                    Mismos puntos para todas las preguntas
                  </span>
                </div>
              </div>
              <div className="flex flex-column gap-2">
                <span className="bold-span gray-text">
                  Retroalimentación inmediata
                </span>
                <select
                  className="select-cuestionario gray-text"
                  name="retroalimentacion"
                  value={
                    preguntas[preguntaSeleccionada].retroalimentacion || "si"
                  }
                  onChange={(e) =>
                    mismaRetro
                      ? handleRetroalimentacionGlobalChange(e.target.value)
                      : handleRetroalimentacionChange(
                          preguntaSeleccionada,
                          e.target.value
                        )
                  }
                  disabled={mismaRetro}
                >
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    id="misma-retro-preguntas"
                    checked={mismaRetro}
                    onChange={handleMismaRetroChange}
                  />
                  <span className="gray-text">
                    Retroalimentación inmediata para todas las preguntas
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-column gap-2">
              <button
                className="white-btn-cuestionario gray-border-bottom"
                onClick={() => handleEliminarPregunta(preguntaSeleccionada)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearCuestionario;
