import React from "react";
import "./ClinicaDados.css";
import {
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMap,
  FaMapMarked,
  FaIdCard,
} from "react-icons/fa";

export const ClinicaDados = () => {
  return (
    <>
      <div className="clinicaDados-info">
        <div className="clinicaDados-section-top">
          <h2>Dados da Clínica</h2>
          <div className="clinicaDados-details">
            <div className="column">
              <div>
                <FaBuilding />
                <strong>Nome:</strong>
              </div>
              <div>
                <FaEnvelope />
                <strong>Email:</strong>
              </div>
              <div>
                <FaPhone />
                <strong>Telefone:</strong>
              </div>
            </div>
            <div className="column">
              <div>
                <FaIdCard />
                <strong>CNPJ:</strong>
              </div>
              <div>
                <FaMapMarked />
                <strong>CEP:</strong>
              </div>
              <div>
                <FaMap />
                <strong>Endereço:</strong>
              </div>
            </div>
          </div>
          <div className="btn-clinica-editar">
            <button>Editar</button>
          </div>
        </div>

        <div className="clinicaDados-section-bottom">
            <p>teste</p>
        </div>
      </div>
    </>
  );
};
