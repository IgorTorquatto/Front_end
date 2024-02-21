import { Button, Card, CardBody, CardHeader, Flex, Heading, Text, Tooltip, useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { api } from "../../services/api";
import { useState } from "react";

export const CardModelo = (args) => {
    const { data: user } = useSelector((state) => state.tokens);
    const [loadingButton, setLoadingButton] = useState(false)
    const toast = useToast()

    const updateModeloClinica = async (modelo_id) => {
        let clinica = user.data
        clinica.modelo_id = modelo_id
        await api.put(`/clinica/${user.data.id}`, clinica)
    }

    const handleSelecionarModeloPadrao = (modelo_id) => {
        setLoadingButton(true)
        updateModeloClinica(modelo_id).then(() => {
            setLoadingButton(false)
            toast({
                title: "Modelo selecionado com sucesso",
                description: "Todos os dignósticos serão relalizados usando este modelo",
                status: "success",
            })
        }).catch(() => {
            setLoadingButton(false)
            toast({
                title: "Modelo não selecionado",
                description: "Um erros ocorreu",
                status: "error",
            })
        })
    }

    return (
        <Card variant={'elevated'}>
            <CardHeader>
                <Flex w={'100%'} flexDirection={'row'}>
                    <Heading size='md' w={'60%'}> {args.modelo.nome} </Heading>

                    <Flex w={'40%'} flexDirection={'row'} justifyContent={'flex-end'} justifyItems={'right'}>
                        <Button isLoading={loadingButton} value={args.modelo.id} onClick={(event) => handleSelecionarModeloPadrao(event.target.value)} isDisabled={user.data.modelo_id === args.modelo.id}>Selecionar</Button>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Flex width={'100%'} justify={'flex-start'} flexDirection={'row'} gap='2rem'>
                        <Tooltip hasArrow placement="right" label={'A acurácia mede a proporção de classificações corretas do modelo em relação ao número total. Entretanto, a qualidade de um modelo não se resume a acurácia.'}>
                            <Text cursor={'pointer'} padding={'10px'} borderRadius={'5px'} fontWeight={'500'} color={'white'} bg={'#0b2a45'}>Acurácia: {args.modelo.acuracia}% </Text>
                        </Tooltip>

                        <Tooltip hasArrow placement="right" label={'Um F1-score alto indica que o modelo classifica corretamente as múltiplas classes de seu escopo. Essa medida complementa a acurácia na decisão de um modelo ótimo.'}>
                            <Text padding={'10px'} borderRadius={'5px'} fontWeight={'500'} color={'white'} bg={'#0b2a45'}>F1-Score: {args.modelo.f1score}% </Text>
                        </Tooltip>
                </Flex>
                
            </CardBody>
        </Card>
    )
}