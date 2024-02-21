import React, { useEffect, useState } from 'react';
import './FormDetalhesIA.css';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api.ts'
import { Button, useToast } from '@chakra-ui/react';

const schema = yup.object({
    nome: yup.string().required('Informe o nome do modelo'),
    arquivo: yup.string().required("Nome do arquivo gerado, ex: model-123.h5"),
    cnpj: yup.string().required("CNPJ da clínica responsável"),
    acuracia: yup.string().required("Valor de acurácia do modelo"),
    f1score: yup.string().required("Valor F1-Score do modelo"),
    precisao: yup.string(),
    recall: yup.string(),
    kappa: yup.string(),
    filtros: yup.string(),
})

export const FormDetalhesIA = ({reLoadModelos}) => {
    const [clinicas, setClinicas] = useState([])
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const toast = useToast()
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (ficha) => {
        console.log(ficha)

        const fichaModelo = {
            nome: ficha.nome,
            cnpj: ficha.cnpj,
            precisao: ficha.precisao,
            acuracia: ficha.acuracia,
            f1score: ficha.f1score,
            recall: ficha.recall,
            kappa: ficha.kappa,
            filtros: ficha.filtros,
            data_augmentation: ficha.dataAugmentation === "true",
            arquivo: ficha.arquivo,
        }
        setIsSubmitLoading(true)
        await api.post('/modelo', fichaModelo).then(() => {
            toast({
                title: 'Modelo cadastrado',
                status: 'success',
                duration: 3000
            })
            reLoadModelos()
            setIsSubmitLoading(false)
        }).catch((error)=>{
            toast({
                title: 'Modelo não cadastrado',
                status: 'error',
                duration: 3000
            })
            setIsSubmitLoading(false)
        })
    }

    const loadCliniacas = async () => {
        await api.get('clinica').then(({ data }) => {
          setClinicas(data.data)
        }).catch(() => {
      
        })
      }
    
      useEffect(() => {
        loadCliniacas()
      }, [])

    const detalhesFicha = [{ label: "Nome do modelo*", name: "nome", placeholder: "Digite o nome do modelo", type: "text" },
    { label: "Nome de arquivo*", name: "arquivo", placeholder: "Qual o nome do arquivo?", type: "text" },
    { label: "Acuracia*", name: "acuracia", placeholder: "Valor de acurácia", type: "number" },
    { label: "F1Score*", name: "f1score", placeholder: "Valor de F1-Score", type: "number" },
    { label: "Precisao", name: "precisao", placeholder: "Valor de precisao", type: "number" },
    { label: "Recall", name: "recall", placeholder: "Valor de recall", type: "number" },
    { label: "Kappa", name: "kappa", placeholder: "Valor Cohen's Kappa", type: "number" },
    { label: "Filtros", name: "filtros", placeholder: "Filtros usados no treinamento", type: "text" },
    { label: "Augmentation", name: "dataAugmentation", placeholder: "Foi utilizado data augmentation?", type: "checkbox" }
]

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='form-fichaTecnica'>
                <label>Selecione a clínica*</label>
                <div className='FormDetalhesIA-form-group'>
                    <select required style={{border: 'solid', borderWidth: '1px', padding: '3px', borderRadius: '5px', width:'100%' }} 
                        className='FormDetalhesIA-form-group-inputs' 
                        name='cnpj' 
                        placeholder='Selecione o CNPJ da clínica'
                        {...register('cnpj')}>
                        {clinicas.map((clinica, index) => {
                            return <option value={clinica.cnpj}>{clinica.nome} - {clinica.cnpj}</option>
                        })}
                    </select>
                </div>
                {detalhesFicha.map((element, key) =>
                    <div className='FormDetalhesIA-form-group'>
                        <label htmlFor='FormDetalhesIA-formGroupNome'>{element.label}</label>
                        <input
                            type={element.type}
                            className='FormDetalhesIA-form-group-inputs'
                            id='FormDetalhesIA-formGroupNome'
                            placeholder={element.placeholder}
                            {...register(element.name)}
                        />
                    </div>)}
                <Button isLoading={isSubmitLoading} type="submit" className='submitDetalhesIA'>Enviar</Button>
            </form>
        </>
    )
}