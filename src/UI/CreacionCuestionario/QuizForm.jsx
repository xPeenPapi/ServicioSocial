import "bootstrap/dist/css/bootstrap.min.css";
import "./crearcuestionario.css";

export default function QuizForm({ pregunta, onOpcionChange, onCorrectaChange, onPreguntaChange }) {
  return (
    <div className="seccion-preguntas">
      {/* Si quieres permitir editar la pregunta desde aquí, agrega este input */}
      {/* 
      <input
        type="text"
        placeholder="Escribe la pregunta"
        className="container-fluid text-center p-3 input-pregunta green-border-bottom"
        value={pregunta.question}
        onChange={e => onPreguntaChange(e.target.value)}
      />
      */}
      <div className="d-flex gap-3 flex-wrap mb-3 w-100">
        <div className="col-sm respuesta respuesta-a p-4 bold-span gray-border-bottom w-100 d-flex">
          <input
            type="text"
            placeholder="Respuesta 1"
            className="w-100 input-respuesta input-a"
            value={pregunta.options[0]}
            onChange={e => onOpcionChange(0, e.target.value)}
          />
          <input
            type="radio"
            name="respuesta-correcta"
            checked={pregunta.correctAnswerIndex === 0}
            onChange={() => onCorrectaChange(0)}
          />
        </div>
        <div className="col-sm respuesta respuesta-b p-4 bold-span gray-border-bottom w-100 d-flex">
          <input
            type="text"
            placeholder="Respuesta 2"
            className="w-100 input-respuesta input-b"
            value={pregunta.options[1]}
            onChange={e => onOpcionChange(1, e.target.value)}
          />
          <input
            type="radio"
            name="respuesta-correcta"
            checked={pregunta.correctAnswerIndex === 1}
            onChange={() => onCorrectaChange(1)}
          />
        </div>
      </div>
      <div className="d-flex gap-3 flex-wrap">
        <div className="col-sm respuesta respuesta-c p-4 bold-span gray-border-bottom w-100 d-flex">
          <input
            type="text"
            placeholder="Respuesta 3"
            className="w-100 input-respuesta input-c"
            value={pregunta.options[2]}
            onChange={e => onOpcionChange(2, e.target.value)}
          />
          <input
            type="radio"
            name="respuesta-correcta"
            checked={pregunta.correctAnswerIndex === 2}
            onChange={() => onCorrectaChange(2)}
          />
        </div>
        <div className="col-sm respuesta respuesta-d p-4 bold-span gray-border-bottom w-100 d-flex">
          <input
            type="text"
            placeholder="Respuesta 4"
            className="input-respuesta input-d w-100"
            value={pregunta.options[3]}
            onChange={e => onOpcionChange(3, e.target.value)}
          />
          <input
            type="radio"
            name="respuesta-correcta"
            checked={pregunta.correctAnswerIndex === 3}
            onChange={() => onCorrectaChange(3)}
          />
        </div>
      </div>
    </div>
  );
}