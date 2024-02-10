import React from 'react';
import './FormDetalhesIA.css';
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api.ts'

const schema = yup.object({
    nome: yup.string().required('Informe o nome do modelo'),
    arquivo: yup.string().required("Nome do arquivo gerado, ex: model-123.h5"),
    cnpj: yup.string().required("CNPJ da clínica responsável"),
    precisao: yup.number().required("Valor de precisão do modelo"),
    acuracia: yup.number().required("Valor de acurácia do modelo"),
    f1score: yup.number().required("Valor F1-Score do modelo"),
    recall: yup.number().required("Valor recall do modelo"),
    kappa: yup.number().required("Valor Cohen's Kappa do modelo"),
    filtros: yup.string().required("Filtro(s) utilizado(s) no treinamento"),
    dataAugmentation: yup.string(),
})

export const FormDetalhesIA = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (ficha) => {

        const fichaModelo = {
            nome: ficha.cnpj,
            cnpj: ficha.nome,
            precisao: ficha.precisao,
            acuracia: ficha.acuracia,
            f1score: ficha.f1score,
            recall: ficha.recall,
            kappa: ficha.kappa,
            filtros: ficha.filtros,
            data_augmentation: ficha.dataAugmentation === "true",
            arquivo: ficha.arquivo,
        }
        console.log(fichaModelo)
        await api.post('/modelo', fichaModelo).catch((error)=>{
            console.log(error)
        })
    }

    const detalhesFicha = [{ label: "Nome do modelo", name: "nome", placeholder: "Digite o nome do modelo", type: "text" },
    { label: "Nome de arquivo", name: "arquivo", placeholder: "Qual o nome do arquivo?", type: "text" },
    { label: "CPNJ da Clínica", name: "cnpj", placeholder: "Digite o CNPJ da clínica", type: "text" },
    { label: "Precisao", name: "precisao", placeholder: "Valor de precisao", type: "number" },
    { label: "Acuracia", name: "acuracia", placeholder: "Valor de acurácia", type: "number" },
    { label: "F1Score", name: "f1score", placeholder: "Valor de F1-Score", type: "number" },
    { label: "Recall", name: "recall", placeholder: "Valor de recall", type: "number" },
    { label: "Kappa", name: "kappa", placeholder: "Valor Cohen's Kappa", type: "number" },
    { label: "Filtros", name: "filtros", placeholder: "Filtros usados no treinamento", type: "text" },
    { label: "Augmentation", name: "dataAugmentation", placeholder: "Foi utilizado data augmentation?", type: "checkbox" }
]

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='form-fichaTecnica'>
                {detalhesFicha.map((element, key) =>
                    <div key={key} className='FormDetalhesIA-form-group'>
                        <label htmlFor='FormDetalhesIA-formGroupNome'>{element.label}</label>
                        <input
                            type={element.type}
                            className='FormDetalhesIA-form-group-inputs'
                            id='FormDetalhesIA-formGroupNome'
                            placeholder={element.placeholder}
                            {...register(element.name)}
                        />
                    </div>)}
                <button type="submit" className='submitDetalhesIA'>Enviar</button>
            </form>
        </>
    )
}