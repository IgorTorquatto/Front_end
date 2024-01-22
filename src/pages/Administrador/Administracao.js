import React from "react";
import "./Administracao.css";
import logo from '../../assets/noto_lungs.png'
import { FormDetalhesIA } from "../../components/Forms/FormDetalhesIA";

export const Administracao = () => {
    return (
        <div>
            <div className="administracao-header">
                <img src={logo}></img>
                <h2>ADMINISTRAÇÃO</h2>
            </div>
            <div className="administracao-FormDetalhesIA">
                <FormDetalhesIA/>
            </div>
        </div>
    )}
