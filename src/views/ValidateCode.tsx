import { Box } from '@chakra-ui/react'
import React from 'react'
import QRReader from '../components/QRReader'

const ValidateCode = () => {
  return (
    <Box pl={[4, 4, '5%', '5%']} pr={[4, 4, '5%', '5%']} >
      <QRReader/>
    </Box>
  )
}

export default ValidateCode