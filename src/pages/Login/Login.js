import React from "react";
import "./Login.css";
import { FormLogin } from "../../components/Forms/FormLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-background-image"></div>
        <div className="login-formulario">
          <div className="login-logo">
            <span
              className="login-faixa"
              onClick={() => {
                navigateToPage("/");
              }}
            >
              d.<span className="text-ia">IA</span>gnóstica
            </span>
          </div>
          <div className="login-section">
            <div className="login-welcome">
              <h2>Seja Bem-Vindo</h2>
            </div>
            <div className="login-form">
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
