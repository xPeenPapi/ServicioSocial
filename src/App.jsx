import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./UI/Login/Login.jsx";
import LandingPage from "../src/UI/LandingPage/LandingPage.jsx";
import Signup from "./UI/Signup/Signup.jsx";
import Roles from "./UI/RoleSelection/Roles.jsx";
import Codigo from "./UI/CodigoClase/codigo.jsx";
import CrearCuestionario from "./UI/CreacionCuestionario/CrearCuestionario.jsx";
import ResponderCuestionario from "./UI/ResponderCuestionario/ResponderCuestionario.jsx";
import Leaderboard from "./UI/Leaderboard/Leaderboard.jsx";
import Graficas from "./UI/Graficas/Graficas.jsx";
import ComponenteCarga from "./UI/ComponenteCarga/ComponenteCarga.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/codigo" element={<Codigo />} />
        <Route path="/crearcuestionario" element={<CrearCuestionario />} />
        <Route
          path="/respondercuestionario"
          element={<ResponderCuestionario />}
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/graficas" element={<Graficas />} />
        <Route path="/carga" element={<ComponenteCarga />} />
      </Routes>
    </Router>
  );
}

export default App;
