import { Button, Card, CardBody, CardHeader, Flex, Heading, Icon, Text, Tooltip } from "@chakra-ui/react"
import dayjs from "dayjs"

export const CardRequisicao = (args) => {

    return (
        <Card variant={'elevated'}>
            <CardHeader>
                <Flex w={'100%'} flexDirection={'row'}>
                    <Heading size='md' w={'60%'}>Data: {dayjs(args.requisicao.data_hora).format("DD/MM/YYYY")} </Heading>

                    <Flex w={'40%'} flexDirection={'row'} justifyContent={'flex-end'} justifyItems={'right'}>
                      <Text fontWeight='bold'>Numero de Imagens: {args.requisicao.quantidade_imagens}</Text> 
                    </Flex>
                </Flex>
            </CardHeader>
        </Card>
    )
}