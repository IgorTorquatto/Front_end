import { InfoIcon } from "@chakra-ui/icons"
import { Button, Card, CardBody, CardHeader, Flex, Heading, Icon, Text, Tooltip } from "@chakra-ui/react"

export const CardModelo = (args) => {



    return (
        <Card variant={'elevated'}>
            <CardHeader>
                <Flex w={'100%'} flexDirection={'row'}>
                    <Heading size='md' w={'60%'}>{args.modelo.nome} <Icon as={InfoIcon} >Detalhes</Icon></Heading>

                    <Flex w={'40%'} flexDirection={'row'} justifyContent={'flex-end'} justifyItems={'right'}>
                        <Button isDisabled>Selecionado</Button>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Flex width={'100%'} justify={'flex-start'} flexDirection={'row'}>
                    <div color="white">
                        <Tooltip hasArrow placement="right" label={'A acurácia mede a proporção de classificações corretas do modelo em relação ao número total. Entretanto, a qualidade de um modelo não se resume a acurácia.'}>
                            <Text cursor={'pointer'} padding={'10px'} borderRadius={'5px'} fontWeight={'500'} color={'white'} bg={'#0b2a45'}>Acurácia: {args.modelo.acuracia}% </Text>
                        </Tooltip>

                        <Tooltip hasArrow placement="right" label={'Um F1-score alto indica que o modelo classifica corretamente as múltiplas classes de seu escopo. Essa medida complementa a acúracia na decisão de um modelo ótimo.'}>
                            <Text padding={'10px'} borderRadius={'5px'} fontWeight={'500'} color={'white'} bg={'#0b2a45'}>F1-Score: {args.modelo.f1score}% </Text>
                        </Tooltip>
                    </div>
                </Flex>
                
            </CardBody>
        </Card>
    )
}