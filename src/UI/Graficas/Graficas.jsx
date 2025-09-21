import "bootstrap/dist/css/bootstrap.min.css";
import "./graficas.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, /*Scatter,*/ Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);
import iconoPerfil from "../../../public/iconos/user.png";
import iconoEliminar from "../../../public/iconos/delete-icon.png";
import iconoAgregar from "../../../public/iconos/add-icon.png";
import iconoExportar from "../../../public/iconos/export-icon.png";
import iconoAyuda from "../../../public/iconos/help-icon.png";
import { useRef, useState, useEffect, use } from "react";
import fotoPerfilDummy from "../../../public/iconos/user.png";

var resultadosfinalesJSON = [];
var participaciones = [];
var cuestionario = [];
var datospai = [0, 0, 0];

/*const datosScatter = {
  datasets: [
    {
      label: "Tiempo en relación a aciertos",
      data: [
        { x: 5, y: 60 }, // X -> Tiempo que tardó en minutos, Y -> Porcentaje de aciertos
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};*/

export default function Graficas() {

  const [datosBarraAlumnos, setDatosBarraAlumnos] = useState({
  labels: [],
  datasets: [
    {
      label: "Porcentaje de aciertos",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
});

function DatosBarraAlumnos() {
  if (!participaciones || !cuestionario || !cuestionario.questions) return;

  const totalPreguntas = cuestionario.questions.length;
  const labels = [];
  const data = [];

  participaciones.forEach((alumno) => {
    let correctas = 0;
    for (let i = 0; i < totalPreguntas; i++) {
      if (
        alumno[`Respuesta pregunta ${i}`] === cuestionario.questions[i].correctAnswerIndex
      ) {
        correctas++;
      }
    }
    const porcentaje = totalPreguntas > 0 ? (correctas / totalPreguntas) * 100 : 0;
    if (porcentaje <= 50) {
      labels.push(alumno["Nombre participante"]);
      data.push(Number(porcentaje.toFixed(2)));
    }
  });

  setDatosBarraAlumnos({
    labels,
    datasets: [
      {
        label: "Porcentaje de aciertos",
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });
}

  const [datosErrorPreguntaState, setDatosErrorPregunta] = useState({
  labels: [],
  datasets: [
    {
      label: "Porcentaje de error",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
});

function DatosErrorPregunta() {
  const labels = cuestionario.questions.map((q, idx) => `Pregunta ${idx + 1}`);
  const errores = cuestionario.questions.map((q, idx) => {
    let total = 0;
    let incorrectas = 0;
    participaciones.forEach((resultado) => {
      const respuesta = resultado[`Respuesta pregunta ${idx}`];
      if (respuesta !== null && respuesta !== undefined) {
        total++;
        if (respuesta !== q.correctAnswerIndex) {
          incorrectas++;
        }
      }
    });
    // Porcentaje de error
    return total > 0 ? Number(((incorrectas / total) * 100).toFixed(2)) : 0;
  });

  setDatosErrorPregunta({
    labels,
    datasets: [
      {
        label: "Porcentaje de error",
        data: errores,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });
}


  const [datosGraficaLinea, setDatosGraficaLinea] = useState({
    labels: [],
    datasets: [
      {
        label: "Tiempo promedio por pregunta (segundos)",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  });

  function DatosGraficaLinea() {
    if (!participaciones || !cuestionario || !cuestionario.questions) return;

    const labels = cuestionario.questions.map(
      (q, idx) => `Pregunta ${idx + 1}`
    );
    const promedios = cuestionario.questions.map((q, idx) => {
      let suma = 0;
      let cuenta = 0;
      participaciones.forEach((resultado) => {
        const tiempo = resultado[`Tiempo pregunta ${idx}`];
        if (typeof tiempo === "number" && !isNaN(tiempo)) {
          suma += tiempo;
          cuenta++;
        }
      });
      return cuenta > 0 ? Number((suma / cuenta).toFixed(2)) : 0;
    });

    setDatosGraficaLinea({
      labels,
      datasets: [
        {
          label: "Tiempo promedio por pregunta (segundos)",
          data: promedios,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.3,
        },
      ],
    });
  }

  const [datosPie, setDatosPie] = useState({
    labels: ["Correctas", "Incorrectas", "Sin responder"],
    datasets: [
      {
        label: "Respuestas del cuestionario",
        data: [0, 0, 0],
        backgroundColor: [
          "rgb(48, 193, 130)",
          "rgb(255, 99, 132)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  function DatosPie() {
    let correctas = 0;
    let incorrectas = 0;
    let sinResponder = 0;

    console.log("Participaciones:", participaciones);
    participaciones.forEach((resultado) => {
      const cantidadpreguntas = cuestionario.questions.length;
      //console.log("Respuestas alumno: ", resultado["Respuesta pregunta 1"])
      console.log("Pregunta 1: ", cuestionario.questions[0].correctAnswerIndex);

      for (let i = 0; i < cantidadpreguntas; i++) {
        if (
          resultado[`Respuesta pregunta ${i}`] ==
          cuestionario.questions[i].correctAnswerIndex
        ) {
          correctas++;
        } else if (
          resultado[`Respuesta pregunta ${i}`] !=
            cuestionario.questions[i].correctAnswerIndex &&
          resultado[`Respuesta pregunta ${i}`] != null
        ) {
          incorrectas++;
        } else {
          sinResponder++;
        }
      }
    });
    datospai[0] = correctas;
    datospai[1] = incorrectas;
    datospai[2] = sinResponder;

    //Colorear grafica
    setDatosPie({
      labels: ["Correctas", "Incorrectas", "Sin responder"],
      datasets: [
        {
          label: "Respuestas del cuestionario",
          data: [correctas, incorrectas, sinResponder],
          backgroundColor: [
            "rgb(48, 193, 130)",
            "rgb(255, 99, 132)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    });
    console.log("Resultados: ", datospai);
  }

  const dialogRef = useRef(null);

  const abrirDialogExportar = () => {
    dialogRef.current.showModal();
  };

  const cerrarDialogExportar = () => {
    dialogRef.current?.close();
  };

  const dialogEliminar = useRef(null);

  const abrirDialogEliminar = () => {
    dialogEliminar.current.showModal();
  };

  const cerrarDialogEliminar = () => {
    dialogEliminar.current?.close();
  };

  const dialogAyuda = useRef(null);

  const abrirDialogAyuda = () => {
    dialogAyuda.current.showModal();
  };

  const cerrarDialogAyuda = () => {
    dialogAyuda.current?.close();
  };

  const fecha = new Date();
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaLocal = fecha.toLocaleDateString("es-MX", opciones);

  const navigate = useNavigate();
  const [cuestionarios, setCuestionarios] = useState([]);
  const [cuestionarioSeleccionadoId, setCuestionarioSeleccionadoId] =
    useState(null);
  const [cuestionarioEliminarId, setCuestionarioEliminarId] = useState("");
  const [cuestionarioExportarId, setCuestionarioExportarId] = useState("");
  const userId = localStorage.getItem("iduser");

  const cuestionarioSeleccionado = cuestionarios.find(
    (c) => c["Id de Sala"] === cuestionarioSeleccionadoId
  );

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const rol = localStorage.getItem("tipousuario");
    if (isLoggedIn === "true") {
      if (rol === "1") {
        console.log("Rol de usuario no permitido en esta página");
        navigate("/codigo");
      } else if (rol === "2") {
        navigate("/graficas");
      }
    }

    if (userId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/obtenerlistasalas/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setCuestionarios(data);
          console.log("Cuestionarios obtenidos:", data);
        })
        .catch((err) => {
          console.error("Error al obtener cuestionarios", err);
        });
    }
  }, [navigate, userId]);

  const Elegircuestionario = (c) => {
    setCuestionarioSeleccionadoId(c["Id de Sala"]);
    localStorage.setItem("resultadosfinales", "");
    fetch(
      `${import.meta.env.VITE_API_URL}/api/obtenerresultado/${c["Id de Sala"]}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos del cuestionario seleccionado:", data);
        localStorage.removeItem("resultadosfinales");
        localStorage.setItem("resultadosfinales", JSON.stringify(data));
        resultadosfinalesJSON =
        JSON.parse(localStorage.getItem("resultadosfinales")) || [];
        participaciones = resultadosfinalesJSON[0];
        cuestionario = resultadosfinalesJSON[1];

        console.log("Participaciones: ", participaciones);

        DatosPie();
        DatosGraficaLinea();
        DatosErrorPregunta();
        DatosBarraAlumnos();
      })
      .catch((err) => {
        console.error("Error al obtener datos del cuestionario", err);
      });
  };

  // Esto es para los selects de los cuestionarios ya sea eliminar o exportar
  const renderOpcionesCuestionarios = () =>
    cuestionarios.map((c) => (
      <option key={c["Id de Sala"]} value={c["Id de Sala"]}>
        {c["Titulo de formulario"]}
      </option>
    ));

  // Renderizar cuestionarios en la lista lateral
  const renderCuestionarios = () =>
    cuestionarios.map((c) => {
      // Fecha
      let fechaTexto = "Sin fecha";
      if (c["Fecha de creacion"]) {
        // Mostrar la fecha tal cual viene de la BD, en formato DD/MM/YYYY
        const [año, mes, dia] = c["Fecha de creacion"].split("-");
        fechaTexto = `Creado el ${dia}/${mes}/${año}`;
      }
      // Título
      const titulo = c["Titulo de formulario"] || "Sin título";

      return (
        <div
          key={c["Id de Sala"]}
          className={`contenedor-cuestionarios ${
            cuestionarioSeleccionadoId === c["Id de Sala"] ? "seleccionado" : ""
          }`}
          onClick={() => Elegircuestionario(c)}
          style={{ cursor: "pointer" }}
        >
          <div className="elemento-cuestionario circular pointer p-3">
            <p className="white-text bold-span m-0">{titulo}</p>
            <span className="white-text">{fechaTexto}</span>
          </div>
        </div>
      );
    });

  const toCrearCuestionario = () => {
    navigate("/crearcuestionario");
  };

  const [visible, setVisible] = useState(false);
  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const username = localStorage.getItem("username");

  const handleEliminarCuestionario = async () => {
    if (!cuestionarioEliminarId) return;
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/eliminarsala/${cuestionarioEliminarId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      alert(data); // Puedes mostrar el mensaje de éxito o error

      // Actualiza la lista de cuestionarios después de eliminar
      setCuestionarios((prev) =>
        prev.filter((c) => c["Id de Sala"] !== cuestionarioEliminarId)
      );
      setCuestionarioEliminarId("");
      cerrarDialogEliminar();
      // Si el cuestionario eliminado estaba seleccionado, deselecciónalo
      if (cuestionarioSeleccionadoId === cuestionarioEliminarId) {
        setCuestionarioSeleccionadoId(null);
      }
    } catch (error) {
      alert("Error al eliminar el cuestionario");
      console.error(error);
    }
  };

  return (
    <>
      <div className="raiz-dashboard-grafica">
        <dialog
          className="dialog-exportar centrar-dialog circular p-4"
          ref={dialogRef}
          style={{ margin: "0 auto", top: "22%" }}
        >
          <p className="verde bold-span text-left">Menú de exportación</p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
              <span className="bold-span gray-text">
                Selecciona el cuestionario a exportar
              </span>
              <select
                className="gray-text select-cuestionario"
                value={cuestionarioExportarId}
                onChange={(e) =>
                  setCuestionarioExportarId(Number(e.target.value))
                }
              >
                <option value="">Selecciona uno</option>
                {renderOpcionesCuestionarios()}
              </select>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="bold-span gray-text">
                Selecciona el formato de exportación
              </span>
              <select name="" id="" className="gray-text select-cuestionario">
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="xlsx">XLSX</option>
              </select>
            </div>
            <div className="botones-exportar d-flex gap-2">
              <button className="green-btn-cuestionario green-border-bottom">
                Exportar
              </button>
              <button
                className="white-btn-cuestionario gray-border-bottom"
                onClick={cerrarDialogExportar}
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
        <dialog
          className="dialog-exportar circular p-4"
          ref={dialogEliminar}
          style={{ margin: "0 auto", top: "30%" }}
        >
          <p className="verde bold-span text-left">Eliminar cuestionario</p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
              <span className="bold-span gray-text">
                Selecciona el cuestionario a eliminar
              </span>
              <select
                className="gray-text select-cuestionario"
                value={cuestionarioEliminarId}
                onChange={(e) =>
                  setCuestionarioEliminarId(Number(e.target.value))
                }
              >
                <option value="">Selecciona uno</option>
                {renderOpcionesCuestionarios()}
              </select>
            </div>
            <div className="botones-exportar d-flex gap-2">
              <button
                className="green-btn-cuestionario green-border-bottom"
                onClick={handleEliminarCuestionario}
              >
                Eliminar
              </button>
              <button
                className="white-btn-cuestionario gray-border-bottom"
                onClick={cerrarDialogEliminar}
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
        <dialog
          className="dialog-exportar centrar-dialog circular p-4"
          ref={dialogAyuda}
          style={{ margin: "0 auto", top: "11%" }}
        >
          <p className="verde bold-span text-left m-0">Sección de ayuda</p>
          <span className="bold-span gray-text mb-3">
            Funcionamiento de los botones
          </span>
          <div className="d-flex flex-column gap-2">
            <div className="contenedor-seccion-ayuda">
              <span className="verde bold-span">Perfil: </span>
              <span className="gray-text bold-span">
                el botón de perfil muestra información breve sobre tu cuenta de
                usuario, también proporciona la opción de cerrar sesión.
              </span>
            </div>
            <div className="contenedor-seccion-ayuda">
              <span className="verde bold-span">Agregar: </span>
              <span className="gray-text bold-span">
                el botón de agregar te permite crear un nuevo cuestionario, te
                redirige a la sección correspondiente para la creación de este.
              </span>
            </div>
            <div className="contenedor-seccion-ayuda">
              <span className="verde bold-span">Eliminar: </span>
              <span className="gray-text bold-span">
                el botón de eliminar mostrará un pequeño menú donde deberás
                seleccionar el cuestionario a eliminar.
              </span>
            </div>
            <div className="contenedor-seccion-ayuda">
              <span className="verde bold-span">Exportar: </span>
              <span className="gray-text bold-span">
                el botón de exportar mostrará un pequeño menú donde deberás
                seleccionar el cuestionario del cual quieres exportar los datos
                así como el formato de exportación.
              </span>
            </div>
          </div>
          <div className="botones-exportar mt-2">
            <button
              className="white-btn-cuestionario gray-border-bottom"
              onClick={cerrarDialogAyuda}
            >
              Cerrar
            </button>
          </div>
        </dialog>
        <div className="container-fluid p-0 cont">
          <div className="row raiz-cuestionarios-estadisticas m-0">
            <div className="col-lg-1 p-2 barra-lateral d-flex flex-column justify-content-center align-items-center shadow">
              <div className="contenedor-iconos d-flex flex-column align-items-center gap-5">
                <div className="d-flex flex-column justify-content-center align-items-center icono-barra-lateral foto-perfil contenedor-icono-interno">
                  <img
                    src={iconoPerfil}
                    alt="icono-perfil"
                    width={"40px"}
                    height={"40px"}
                    className="scale pointer"
                    onClick={toggleDropdown}
                  />
                  <p className="white-text bold-span titulo-icono text-center">
                    Perfil
                  </p>
                  {visible && (
                    <div className="info-perfil circular p-3 d-flex flex-column gap-2">
                      <div className="info-usuario d-flex gap-2">
                        <div className="foto">
                          <img
                            src={fotoPerfilDummy}
                            alt="foto-perfil"
                            className="imagen-perfil w-100"
                          />
                        </div>
                        <span className="gray-text bold-span d-flex justify-content-center align-items-center">
                          {username}
                        </span>
                      </div>
                      <button
                        className="btn-cerrar-sesion white-text bold-span circular scale"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center contenedor-icono-interno">
                  <img
                    src={iconoAgregar}
                    alt="icono-agregar"
                    width={"40px"}
                    height={"40px"}
                    className="scale pointer"
                    onClick={toCrearCuestionario}
                  />
                  <p className="white-text bold-span titulo-icono text-center">
                    Agregar
                  </p>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column contenedor-icono-interno">
                  <img
                    src={iconoEliminar}
                    alt="icono-eliminar"
                    width={"40px"}
                    height={"40px"}
                    className="scale pointer"
                    onClick={abrirDialogEliminar}
                  />
                  <p className="white-text bold-span titulo-icono text-center">
                    Eliminar
                  </p>
                </div>
                {/*
                <div className="d-flex justify-content-center align-items-center flex-column contenedor-icono-interno">
                  <img
                    src={iconoExportar}
                    alt="icono-exportar"
                    width={"40px"}
                    height={"40px"}
                    className="scale pointer"
                    onClick={abrirDialogExportar}
                  />
                  <p className="white-text bold-span titulo-icono text-center">
                    Exportar
                  </p>
                </div>
                */}
                
                <div className="d-flex justify-content-center align-items-center flex-column contenedor-icono-interno">
                  <img
                    src={iconoAyuda}
                    alt="icono-ayuda"
                    width={"40px"}
                    height={"40px"}
                    className="scale pointer"
                    onClick={abrirDialogAyuda}
                  />
                  <p className="white-text bold-span titulo-icono text-center">
                    Ayuda
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 seccion-cuestionarios clase-prueba p-4 full-height">
              <p className="white-text bold-span mb-3">Cuestionarios</p>
              <div className="d-flex flex-column gap-3 seccion-cuestionario-interno">
                {renderCuestionarios()}
              </div>
            </div>
            <div className="col-lg-9 contenedor-seccion-estadisticas-2 p-0">
              <div className="seccion-estadisticas p-4">
                <div className="seccion-estadisticas-interno">
                  <div className="titulos-cuestionario">
                    <h3 className="verde bold-span">ActiveClassroom</h3>
                    <p className="titulo-cuestionario text-center gray-text bold-span">
                      {cuestionarioSeleccionado
                        ? cuestionarioSeleccionado["Titulo de formulario"] ||
                          "Sin título"
                        : "Selecciona un cuestionario"}
                    </p>
                    {cuestionarioSeleccionado && (
                      <p
                        className="clave-cuestionario text-center gray-text bold-span"
                        style={{ fontSize: "1.2em" }}
                      >
                        Clave:{" "}
                        {cuestionarioSeleccionado["clave"] || "No asignada"}
                      </p>
                    )}
                  </div>
                  {cuestionarioSeleccionado && (
                    <>
                      <div className="contenedor-fecha d-flex justify-content-between">
                        <p className="bold-span">Estadísticas del formulario</p>
                        <p className="gray-text bold-span">{fechaLocal}</p>
                      </div>
                      <div className="contenedor-graficas row m-0 mb-4 gap-4">
                        <div className="col-sm sombra-graficas circular carta-grafica p-3">
                          <p className="verde bold-span text-left p-0">
                            Tiempo promedio por pregunta
                          </p>
                          <div className="contenedor-grafica">
                            <Line data={datosGraficaLinea}></Line>
                          </div>
                        </div>
                        <div className="col-sm sombra-graficas circular carta-grafica p-3">
                          <p className="verde bold-span text-left">Preguntas</p>
                          <div className="contenedor-grafica-pie">
                            <Pie data={datosPie} />
                          </div>
                        </div>
                      </div>
                      <div className="contenedor-graficas row m-0 gap-4">
                        <div className="col-sm sombra-graficas circular carta-grafica p-3">
                          <p className="verde bold-span text-left">
                            Preguntas con mayor índice de error
                          </p>
                          <div className="contenedor-grafica">
                            <Bar data={datosErrorPreguntaState}></Bar>
                          </div>
                        </div>
                        {/*
                        <div className="col-sm sombra-graficas carta-grafica circular p-3">
                          <p className="verde bold-span text-left">
                            Relación entre tiempo y puntuación
                          </p>
                          <div className="contenedor-grafica">
                            <Scatter data={datosScatter}></Scatter>
                          </div>
                        </div>
                        */}
                        <div className="col-sm sombra-graficas carta-grafica circular p-3">
                          <p className="verde bold-span text-left">
                            Alumnos con 50% o menos aciertos
                          </p>
                          <div className="contenedor-grafica">
                            <Bar data={datosBarraAlumnos} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
