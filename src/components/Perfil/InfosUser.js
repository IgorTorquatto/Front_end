import React from "react";
import { useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaPhone,
  FaBriefcase,
  FaBuilding,
  FaRegIdCard
} from "react-icons/fa";
import "./InfosUser.css";

export const InfosUser = () => {
  const { data: user } = useSelector((state) => state.tokens);

  return (
    <>
      <div className="infosuser-info">
        <h2>Dados Pessoais</h2>
        <div className="infosuser-details">
          <div className="column">
            <div>
              <FaUser />
              <strong>Nome:</strong> {user.data.pessoa.nome}
            </div>
            <div>
              <FaEnvelope />
              <strong>Email:</strong> {user.data.pessoa.email}
            </div>
            <div>
              <FaCalendarAlt />
              <strong>Data de Nascimento:</strong>{" "}
              {user.data.pessoa.dataNascimento}
            </div>
            <div>
              <FaPhone />
              <strong>Telefone:</strong> {user.data.pessoa.telefone}
            </div>
            <div>
              <FaBriefcase />
              <strong>Cargo:</strong> {user.data.pessoa.cargo}
            </div>
          </div>
          <div className="column">
              <div>
                <FaRegIdCard />
                <strong>CRM:</strong> {user.data.pessoa.crm}
              </div>
              <div>
                <FaRegIdCard />
                <strong>CPF:</strong> {user.data.pessoa.crm}
              </div>
              <div>
                <FaCalendarAlt />
                <strong>Especialidade:</strong> {user.data.pessoa.especialidade}
              </div>
              <div>
                <FaBuilding />
                <strong>Clínica:</strong> {user.data.pessoa.clinica}
              </div>
              <div>
                <FaBuilding />
                <strong>Exemplo:</strong> {user.data.pessoa.clinica}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};