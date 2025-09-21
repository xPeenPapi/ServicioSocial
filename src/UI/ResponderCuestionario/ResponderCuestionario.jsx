import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./respondercuestionario.css";
import "bootstrap/dist/css/bootstrap.min.css";

let respuestas = []
let tiempotardado = []
let tiemporesactual = 0

function ResponderCuestionario() {
  const [formulario, setFormulario] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [mostrarRetro, setMostrarRetro] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [bloquearOpciones, setBloquearOpciones] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const form = JSON.parse(localStorage.getItem("formularioActual"));
  
  useEffect(() => {
    setFormulario(form);
    setTiempo(form?.questions[0]?.tiempo || 30);
  }, []);
 
  
  const tiempoFinalizadoRef = useRef(false);
  useEffect(() => {
  if (!formulario || mostrarRetro || bloquearOpciones || finalizado) return;

  tiempoFinalizadoRef.current = false;

  timerRef.current = setInterval(() => {
    
    setTiempo((t) => {
      if (t === 0) {
        clearInterval(timerRef.current);
        if (!tiempoFinalizadoRef.current) {
          tiempoFinalizadoRef.current = true;
          handleTiempoFinalizado();
          tiempotardado.push(t)
        }
        return 0;
      }
      tiemporesactual = (form?.questions[0]?.tiempo) - t
      console.log("Tiempo actual en segundos: ", tiemporesactual)
      return t - 1;
    });
  }, 1000);

  return () => {
    clearInterval(timerRef.current);
  };

}, [formulario, preguntaActual, mostrarRetro, bloquearOpciones, finalizado]);


  // ESTO DE AQUÍ FUE UN CAMBIO QUE AUN NO FUNCIONA
  useEffect(() => {
    const enviarYRecibirResultados = async () => {
      if (finalizado && formulario /*&& !showEnd*/) {
        console.log("Enviando resultados...");
        try {
          // Enviar resultados del alumno
          const apiUrl = import.meta.env.VITE_API_URL;
          const participanteid = localStorage.getItem("iduser");
          const salaid = formulario.salaid;
          const calificacion = Number(puntaje);
          const userid = formulario.userId;
          console.log("Respuestas finalzadas: ", respuestas)
          console.log("Timpeos tardados: ", tiempotardado)
          // Construir el payload
          const payload = {
            salaid,
            userid,
            username: localStorage.getItem("username"),
            participanteid: participanteid,
            calificacion,
            tituloform: formulario.tituloform,
            questions: formulario.questions.map((q, i) => ({
              ...q,
              electionindex: respuestas[i] ?? null,
              tiempo: tiempotardado[i],
            })),
          };
          console.log("Que rollo")
          await fetch(`${apiUrl}/api/enviarresultado`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          // Obtener resultados de la sala
          const res = await fetch(`${apiUrl}/api/obtenerresultado/${salaid}`);
          const resultados = await res.json();
          localStorage.setItem("resultadosSala", JSON.stringify(resultados));
        } catch (error) {
          console.error("Error al enviar o recibir resultados:", error);
        }
      }
    };

    enviarYRecibirResultados();
  }, [finalizado, formulario, puntaje, showEnd]);
  // AQUÍ TERMINA EL CAMBIO QUE AUN NO FUNCIONA

  if (!formulario) return null;

  // Evita error si ya no hay más preguntas
  if (finalizado || preguntaActual >= formulario.questions.length) {
    if (!showEnd) setShowEnd(true);
    return (
      <div className="raiz d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <h2 className="verde">¡Cuestionario terminado!</h2>
        <h3 className="white-text">Puntaje final: {puntaje}</h3>
        <p className="white-text">Espera indicaciones de tu profesor...</p>
        <button
          className="green-btn-responder-cuestionario mt-3 p-3"
          onClick={() => {
            navigate("/codigo");
          }
          }
        >
          Volver a página principal
        </button>
      </div>
    );
  }

  const pregunta = formulario.questions[preguntaActual];

  const incisosQuiz = ["A", "B", "C", "D"];
  const opcionesVF = ["Verdadero", "Falso"];

  function valorAPuntos(valor) {
    switch (valor) {
      case "un-punto":
        return 1;
      case "dos-puntos":
        return 2;
      case "cinco-puntos":
        return 5;
      case "diez-puntos":
        return 10;
      default:
        return 1;
    }
  }

  const handleSeleccion = (idx) => {
    if (mostrarRetro || bloquearOpciones) return;
    console.log("Seleccion: ", idx)
    console.log("Respuestas: ", respuestas)
    setSeleccion(idx);
  };

  const handleSiguiente = () => {
    clearInterval(timerRef.current);
    setBloquearOpciones(true);
    if (seleccion === pregunta.correctAnswerIndex) {
      setPuntaje((p) => p + valorAPuntos(pregunta.valor));
    }
    respuestas.push(seleccion)
    tiempotardado.push(tiemporesactual)
    tiemporesactual = 0
    console.log("Respuestas: ", respuestas)
    if (pregunta.retroalimentacion?.toLowerCase() === "si") {
      setMostrarRetro(true);
      setTimeout(() => {
        setMostrarRetro(false);
        setSeleccion(null);
        setBloquearOpciones(false);
        avanzarPregunta();
      }, 2000);
    } else {
      setSeleccion(null);
      setBloquearOpciones(false);
      avanzarPregunta();
    }
  };

  // Solo avanza si hay más preguntas, si no, finaliza correctamente
  const avanzarPregunta = () => {
  setSeleccion(null);
  setBloquearOpciones(false);
  setMostrarRetro(false);

  setPreguntaActual((prevPreguntaActual) => {
    console.log("Pregunta actual: ", prevPreguntaActual)
    console.log("Cantidad de preguntas: ", formulario.questions.length)
    console.log("Mensaje de pruebas")
    if (prevPreguntaActual < formulario.questions.length - 1) {
      setTiempo(formulario.questions[prevPreguntaActual + 1].tiempo || 30);
      return prevPreguntaActual + 1;
    } else {
      setFinalizado(true);
      return prevPreguntaActual; // No avanzar más allá del final
    }
  });
};

  // Al acabarse el tiempo, si es la última pregunta, muestra retroalimentación y termina
  const handleTiempoFinalizado = () => {
    setBloquearOpciones(true);
    if (pregunta.retroalimentacion?.toLowerCase() === "si") {
      setMostrarRetro(true);
      setTimeout(() => {
        setMostrarRetro(false);
        setSeleccion(null);
        setBloquearOpciones(false);
        avanzarPregunta();
      }, 2000);
    } else {
      setSeleccion(null);
      setBloquearOpciones(false);
      avanzarPregunta();
    }
  };

  // Clases para opciones
  const getOpcionClass = (idx) => {
    if (mostrarRetro) {
      if (idx === pregunta.correctAnswerIndex) return "respuesta-pregunta correcta";
      if (seleccion !== null && idx === seleccion) return "respuesta-pregunta incorrecta";
      return "respuesta-pregunta";
    }
    if (seleccion === idx) return "respuesta-pregunta seleccionada";
    return "respuesta-pregunta";
  };

  // Renderiza opciones según tipo de pregunta
  const renderOpciones = () => {
    if (pregunta.tipo === "quiz") {
      return pregunta.options.map((op, idx) => (
        <div
          key={idx}
          className={`col-sm verde bold-span ${getOpcionClass(idx)} d-flex gap-2 gray-border-bottom shadow w-100`}
          style={{
            cursor: mostrarRetro || bloquearOpciones ? "default" : "pointer",
            opacity: mostrarRetro || bloquearOpciones ? 0.8 : 1,
          }}
          onClick={() => handleSeleccion(idx)}
        >
          <div className="inciso white-text bold-span">{incisosQuiz[idx]}</div>
          {op}
        </div>
      ));
    }
    if (pregunta.tipo === "verdadero-falso") {
      return opcionesVF.map((op, idx) => (
        <div
          key={idx}
          className={`col-sm verde bold-span ${getOpcionClass(idx)} d-flex gap-2 gray-border-bottom shadow w-100`}
          style={{
            cursor: mostrarRetro || bloquearOpciones ? "default" : "pointer",
            opacity: mostrarRetro || bloquearOpciones ? 0.8 : 1,
          }}
          onClick={() => handleSeleccion(idx)}
        >
          <div className="inciso white-text bold-span">{incisosQuiz[idx]}</div>
          {op}
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="raiz">
      <div className="contenido-principal container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="contenedor-tiempo w-100 d-flex justify-content-between">
          <h3 className="m-0 titulo-formulario white-text bold-span d-flex justify-content-center align-items-center">
            {formulario.tituloform}
          </h3>
          <div className="tiempo-restante white-text d-flex justify-content-center align-items-center green-border-bottom">
            <h3 className="m-0 tiempo-restante-interno">
              <strong>{tiempo}</strong>
            </h3>
          </div>
        </div>
        <div className="contenido-principal-interno container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center gap-2 mb-3">
            <h3 className="verde text-center titulo-app-web">
              <strong>ActiveClassroom</strong>
            </h3>
            <h4 className="white-text bold-span text-center titulo-pregunta">
              Pregunta {preguntaActual + 1}/{formulario.questions.length}
            </h4>
            <div className="pregunta-principal green-border-bottom">
              <h4 className="white-text text-center titulo-pregunta m-0 bold-span">
                {pregunta.question}
              </h4>
            </div>
          </div>
          <div className="responder-cuestionario container-fluid p-0">
            <div className="respuestas-formulario">
              <div className="d-flex gap-2 mb-2 flex-wrap">
                {renderOpciones()}
              </div>
            </div>
          </div>
          <button
            className="green-btn-responder-cuestionario w-100 mt-3 p-3 green-border-bottom btn-siguiente-pregunta"
            onClick={handleSiguiente}
            disabled={seleccion === null || mostrarRetro || bloquearOpciones}
          >
            Siguiente
          </button>
          <div className="white-text mt-3">
            <strong>Puntaje actual: {puntaje}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponderCuestionario;
