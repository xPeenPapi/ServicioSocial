import "./login.css";
import "../../validacionesForm/validaciones.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import microsoftLogo from "../../../public/logos/microsoft-logo.png"; // Añadir esta línea
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react"; // Añadir estos hooks
import { loginRequest } from "../../AuthConfig";

const apiUrl = import.meta.env.VITE_API_URL;
function Login() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount();

  const navigate = useNavigate();
  const[Login] = useState({
      username: "",
      password: ""
  })

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const rol = localStorage.getItem("tipousuario");
      if (isLoggedIn === "true") {
        if (rol === "1") {
          navigate("/codigo");
        } else if (rol === "2") {
          navigate("/graficas");
        }
      }
      if (account) {
        handleMicrosoftLogin();
      }
  }, [account, navigate]);


  const loguear =  async () =>{
    try {
      Login.username = username;
      Login.password = password;
      const datosUser = await axios.post(apiUrl + '/api/login', Login)
      console.log(datosUser.statusText);
      //console.log(datosUser);
      if(datosUser.data.length > 0){
        
        guardarDatos(datosUser.data[0]);
      }else{
        alert("Nombre de usuario o contraseña incorrectos")
      }
      
    } catch (error) {
      console.error("Ha ocurrido un error en la conexion", error)
    }
    
  }

  const guardarDatos = (userData) => {
    console.log(userData)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('iduser', userData.id);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('correo', userData.correo);
    localStorage.setItem('password', userData.password);
    localStorage.setItem('tipousuario', userData.tipousuario);

    if(userData.tipousuario == 1){
      alert("Alumno iniciado")
      navigate("/codigo")
    }else{
      alert("Maestro Iniciado")
      navigate("/graficas")
    }
  }

  const toRoles = () => {
    navigate("/roles");
  };

  

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google credential:", credentialResponse);
    const token = credentialResponse.credential;
    try {
      // Ejemplo: enviar el token JWT a tu backend para validarlo/crear sesión
      const { data } = await axios.post(`${apiUrl}/api/login/google`, { token });
      if (data.user) {
        guardarDatos(data.user);
        navigate("/codigo")
      } else {
        alert("Error al iniciar sesión con Google");
      }
    } catch (err) {
      console.error("Error en backend Google login", err);
    }
    navigate("/codigo")
  };
  
  const handleGoogleError = () => {
    console.error("Login con Google fallido");
    alert("No se pudo iniciar sesión con Google");
  };

  const handleMicrosoftLogin = useCallback(async () => {
    try {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account
      });

      const { data } = await axios.post(`${apiUrl}/api/login/microsoft`, {
        token: tokenResponse.accessToken
      });

      if (data.user) {
        guardarDatos(data.user);
        navigate("/codigo");
      }
    } catch (error) {
      console.error("Error en login Microsoft:", error);
      alert("Error al iniciar sesión con Microsoft");
    }
  }, [instance, account, navigate]);

    const MicrosoftLoginButton = () => (
    <div
      onClick={() => instance.loginRedirect(loginRequest)}
      className="white-btn scale flex-btn gray-border-bottom small-font"
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img
        src={microsoftLogo}
        alt="microsoft-logo"
        width={"24px"}
        height={"24px"}
      />
      <span style={{ marginLeft: "8px" }}>Acceder con Microsoft</span>
    </div>
  );

  
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="div-fondo"
      >
        <div className="formulario">
          <h5 className="verde small-font">
            <strong>ActiveClassroom</strong>
          </h5>
          <p className="gray-text centrar-parrafo small-font">
            <strong>Inicia sesión</strong>
          </p>
          <div className="contenedor-formulario">
            <span className="gray-text">Nombre de usuario</span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="small-font" 
              />
          </div>

          <div className="contenedor-formulario">
            <span className="gray-text">Contraseña</span>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="small-font" 
            />
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <span className="gray-text">Recuérdame</span>
          </div>
          <button className="green-btn scale green-border-bottom small-font" onClick={loguear}>
            Iniciar sesión
          </button>
          
          <hr />
          <button
            className="white-btn scale gray-border-bottom small-font"
            onClick={toRoles}
          >
            Regístrate
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
