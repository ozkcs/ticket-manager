import { Box, Button, Divider, Flex, HStack, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { RefObject, useRef, useState } from 'react'
import QRCode from './QRCode'
import { TEvents, TTicket } from '../types/ticket'
import { IconDownload, IconPhoto } from '@tabler/icons'
import html2canvas from 'html2canvas';
import { TOrder } from '../types/Order'
import dayjs from 'dayjs';

interface ITicket {
  order: TOrder
  ticket: TTicket
  event: TEvents
  isDownloadable?: boolean | true
}

const Ticket = ({ order, ticket, event, isDownloadable }: ITicket) => {
  const ticketRef = useRef() as RefObject<any>
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
          <HStack gap={6} w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <Heading size={'lg'}>{event?.name}</Heading>
            <Button hidden={isDownloading || !isDownloadable} onClick={handleDownload} gap={2} ><IconDownload />Descargar</Button>
          </HStack>
          <HStack width={'100%'} alignItems={'center'}>
            <VStack maxWidth='25%'>
              <IconPhoto size='100%' />
            </VStack>
            <VStack gap={4} alignItems={'baseline'} maxW={'70%'} justifyContent={'space-evenly'} h={'100%'}>
              <HStack spacing={2} alignItems={'baseline'}>
                <Text as='sub' fontSize='lg' fontWeight={'bold'} >
                  Lugar:</Text>
                <Text as='sub' fontSize='lg' color='gray.400' >
                  {event?.location} </Text>
              </HStack>
              <HStack spacing={2} alignItems={'baseline'}>
                <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                  Fecha:</Text>
                <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
                  {dayjs(event?.dates[0].toDate()).format('MMM DD YYYY')}</Text>
              </HStack>
            </VStack>
          </HStack>
          <Divider />
          <Flex>
            <QRCode orderID={order.id} ticket={ticket} />
          </Flex>
          <Divider />
          <HStack spacing={1} alignItems={'baseline'}>
            <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
              Email: </Text>
            <Text as='sub' fontSize='md' color='gray.400' wordBreak={'keep-all'} >
              {order.email} </Text>
          </HStack>
          <HStack justifyContent={'space-evenly'} w={'100%'} >
            <HStack spacing={1} alignItems={'baseline'}>
              <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                Nombre: </Text>
              <Text as='sub' fontSize='md' color='gray.400' wordBreak={'keep-all'} >
                {order.first_name + ' ' + order.last_name}  </Text>
            </HStack>

            <HStack spacing={1} alignItems={'baseline'}>
              <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                Tel: </Text>
              <Text as='sub' fontSize='md' color='gray.400' wordBreak={'keep-all'} >
                {order.phone} </Text>
            </HStack>
          </HStack>
          <HStack spacing={1} display={'block'}>
            <Text as='sub' fontStyle={'italic'} fontSize='sm' fontWeight={'bold'} wordBreak={'keep-all'}>
              Oficialmente Generado por TicketManager ©</Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}

export default Ticket