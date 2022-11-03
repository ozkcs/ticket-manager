import { Flex, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';
import { nomralTextSize } from '../utils/ResponsiveStyles'

interface QRCodeProps {
  orderID: string
  ticket: any
}

const QRCode = ({ orderID, ticket }: QRCodeProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500)
  }, [])


  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} backgroundColor={ticket.validated ? 'grey.100' : 'teal.200'} p={2} width={'fit-content'} height={'fit-content'} borderRadius={10}>
      {isLoading ?
        <Spinner /> :
        <>
          <Text size={nomralTextSize} color={'#1a202c'} fontWeight={'bold'}>{ticket.type}</Text>
          <QRCodeLogo value={`${orderID},${ticket.id}`}
            ecLevel='H'
            size={250}
            qrStyle='dots'
            eyeRadius={5}
            bgColor={'transparent'} fgColor={'#1a202c'}
          // eyeColor={{ outer: '#61dafb', inner: '#b73a3b' }}
          // logoImage={logo} logoHeight={15} logoWidth={15}
          />
          {!ticket.validated ?
            <Text size={nomralTextSize} color={'#1a202c'} fontWeight={'bold'}>Avalaible</Text>
            : <Text color={'#1a202c'} fontWeight={'bold'}>Used</Text>}
        </>}
    </Flex>
  )
}

export default QRCode