import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="login-layout">
      <div className="login-left">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png" 
          alt="Ilustración" 
        />
        <h2>Si tienes tiempo para lamentarte, úsalo para mejorar.</h2>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1>Inicia sesión</h1>
          <p>Usa tu cuenta de Google para acceder</p>
          
          <div className="google-button-container">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  login(credentialResponse.credential);
                  navigate("/");
                }
              }}
              onError={() => {
                alert("Error al iniciar sesión. Por favor intenta nuevamente.");
              }}
              theme="filled_blue"
              size="large"
              shape="pill"
            />
          </div>

          <p className="terms-notice">Al iniciar sesión, aceptas nuestros términos y condiciones</p>
        </div>
      </div>
    </div>
  );
};