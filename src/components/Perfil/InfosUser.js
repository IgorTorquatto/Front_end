import React from "react";
import { useSelector } from "react-redux";
import {FaUser,FaEnvelope,FaCalendarAlt,FaPhone,FaBriefcase,FaBuilding,FaRegIdCard,FaIdCard} from "react-icons/fa";
import "./InfosUser.css";
import { 
  cpf_mask,
  telefone_mask,
  data_mask, 
} from "../Forms/form-masks";

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
              <strong>E-mail:</strong> {user.data.email}
            </div>
            <div className="teste">
              <FaCalendarAlt />
              <strong>Data de Nascimento: </strong> {data_mask(user.data.pessoa.data_nascimento)}
            </div>
            <div>
              <FaPhone />
              <strong>Telefone:</strong> {telefone_mask(user.data.pessoa.telefone)}
            </div>
          </div>
          <div className="column">
              <div>
                <FaIdCard />
                <strong>CRM:</strong> {user.data.crm}
              </div>
              <div>
                <FaRegIdCard />
                <strong>CPF:</strong> {cpf_mask(user.data.pessoa.cpf)}
              </div>
              <div>
                <FaBriefcase />
                <strong>Cargo:</strong> {user.data.pessoa.cargo}
              </div>
              <div className="teste">
                <FaCalendarAlt />
                <strong>Especialidade:</strong> {user.data.especialidade}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
