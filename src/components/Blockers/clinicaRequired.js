import { InfoOutlineIcon } from "@chakra-ui/icons"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"

export const ClinicaRequired = () => {
    return (
        <Flex justifyContent='center' alignItems='center' w='100vw' h='80vh'>
          <Box textAlign={'center'}>
            <Icon as={InfoOutlineIcon} boxSize={'10'} mb={'15px'} />
            <Text fontSize={'1.1rem'}>Por favor selecione uma clínica.</Text>
          </Box>
        </Flex> 
    )
}