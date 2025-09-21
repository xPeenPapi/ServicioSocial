import "bootstrap/dist/css/bootstrap.min.css";
import "./crearcuestionario.css";

export default function VerdaderoFalsoForm({ pregunta, onPreguntaChange, onCorrectaChange }) {
  return (
    <div className="d-flex gap-3 flex-wrap mb-3 w-100">
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
      <div className="col-sm respuesta respuesta-a p-4 gray-border-bottom w-100 d-flex justify-content-between">
        <div className="d-flex gap-3">
          <p className="gray-text m-0">Verdadero</p>
          <input
            type="radio"
            name="respuesta-correcta"
            checked={pregunta.correctAnswerIndex === 0}
            onChange={() => onCorrectaChange(0)}
          />
        </div>
      </div>
      <div className="col-sm respuesta respuesta-b p-4 gray-border-bottom w-100 d-flex justify-content-between">
        <div className="d-flex gap-3">
          <p className="gray-text m-0">Falso</p>
          <input
            type="radio"
            name="respuesta-correcta"
            checked={pregunta.correctAnswerIndex === 1}
            onChange={() => onCorrectaChange(1)}
          />
        </div>
      </div>
    </div>
  );
}