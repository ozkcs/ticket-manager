import { Flex, Center, Box } from '@chakra-ui/react'
import React from 'react'

interface ICenteredLayoutProps{
  children: any
}

const CenteredLayout = ({ children }: ICenteredLayoutProps) => {
  return (
    <Flex w={"100vw"}  maxW={'100%'}>
      <Center w={'100%'}>
        <Box w={'100%'} >
          {children}
        </Box>
      </Center>
    </Flex>
  )
}

export default CenteredLayout