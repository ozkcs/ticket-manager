import { Flex, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';
import { TTicket } from '../types/ticket';
import { nomralTextSize } from '../utils/ResponsiveStyles'

interface IQRCodeProps {
  orderID: string | undefined
  ticket: TTicket
}

const QRCode = ({ orderID, ticket }: IQRCodeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500)
  }, [])

  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} backgroundColor={ticket.validated ? 'red.100' : 'teal.200'} p={2} width={'fit-content'} height={'fit-content'} borderRadius={10}>
      {isLoading ?
        <Spinner /> :
        <>
          <Text size={nomralTextSize} color={'#1a202c'} fontWeight={'bold'}>{ticket.type}</Text>
          <QRCodeLogo
            value={`${orderID},${ticket.id}`}
            ecLevel='H'
            size={250}
            qrStyle='dots'
            eyeRadius={5}
            bgColor={'transparent'} fgColor={'#1a202c'}
          />
          {!ticket.validated ?
            <Text size={nomralTextSize} color={'#1a202c'} fontWeight={'bold'}>
              Id: {ticket?.id}
            </Text>
            : <Text color={'#1a202c'} fontWeight={'bold'}>Used</Text>}
        </>}
    </Flex>
  )
}

export default QRCode