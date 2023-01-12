import { Box, Button, Checkbox, Divider, Flex, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import React, { RefObject, useRef, useState } from 'react'
import QRCode from './QRCode'
import { TTicket } from '../types/ticket'
import { useSize } from "@chakra-ui/react-use-size"
import { IconDownload } from '@tabler/icons'
import html2canvas from 'html2canvas';

interface ITicket {
  orderID: string | undefined,
  ticket: TTicket
  isDownloadable?: boolean | true
}

const Ticket = ({ orderID, ticket, isDownloadable }: ITicket) => {
  const ticketRef = useRef() as RefObject<any>
  const emptyBoxRef = useRef() as RefObject<HTMLDivElement>
  const emptyBoxDim = useSize(emptyBoxRef)
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    await setIsDownloading(true);
    const element = ticketRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
    await setIsDownloading(false)
  };
  const bgCardColor = useColorModeValue('gray.50', 'whiteAlpha.200');
  return (
    <VStack  >
      <Box ref={ticketRef} bgColor={'chakra-body-bg'} gap={4} borderRadius={10}>
        <VStack width={['400px', '500px', '500px']} gap={4} bgColor={bgCardColor} borderRadius={10} p={5}>
          <VStack gap={6} w={'100%'} alignItems={'end'}>
            <Button hidden={isDownloading || !isDownloadable} onClick={handleDownload} gap={2} ><IconDownload />Descargar</Button>
          </VStack>
          <HStack width={'100%'}>
            <VStack ml={4} mr={4}>
              <Box ref={emptyBoxRef} minWidth='25%' minH={emptyBoxDim?.width} borderRadius='10' borderWidth='3px' borderColor={'teal.200'}
                display={'flex'} alignContent={'center'} justifyContent={'center'} >
                Imagen del evento
              </Box>
            </VStack>
            <VStack gap={4} alignItems={'baseline'} maxW={'70%'} justifyContent={'space-evenly'} h={'100%'}>
              <VStack spacing={6} alignItems={'baseline'}>
                <Text as='sub' fontSize='lg' fontWeight={'bold'} >
                  Evento:</Text>
                <Text as='sub' fontSize='lg' color='gray.400' >
                  Nombre el Evento </Text>
              </VStack>
              <VStack spacing={6} alignItems={'baseline'}>
                <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                  Fecha:</Text>
                <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
                  Enero 1 2023 - Enero 2 2023</Text>
              </VStack>
            </VStack>
          </HStack>
          <Divider />
          <Flex>
            <QRCode orderID={orderID} ticket={ticket} />
          </Flex>
          <Divider />
          <HStack spacing={1} alignItems={'baseline'}>
            <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
              Email: </Text>
            <Text as='sub' fontSize='md' color='gray.400' wordBreak={'keep-all'} >
              longmailuserexample@email.com  </Text>
          </HStack>
          <HStack justifyContent={'space-evenly'} w={'100%'} >
            <HStack spacing={1} alignItems={'baseline'}>
              <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                Nombre: </Text>
              <Text as='sub' fontSize='md' color='gray.400' wordBreak={'keep-all'} >
                User Example  </Text>
            </HStack>

            <HStack spacing={1} alignItems={'baseline'}>
              <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                Tel: </Text>
              <Text as='sub' fontSize='md' color='gray.400' wordBreak={'keep-all'} >
                +50680808080  </Text>
            </HStack>
          </HStack>
          <HStack spacing={1} display={'block'}>
            <Text as='sub' fontStyle={'italic'} fontSize='sm' fontWeight={'bold'} wordBreak={'keep-all'}>
              Officialmente Generado por TicketManager ©</Text>
          </HStack>
        </VStack>

      </Box>

    </VStack>
  )
}

export default Ticket