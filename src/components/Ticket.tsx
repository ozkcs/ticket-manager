import { Box, Button, Divider, Flex, HStack, Heading, Img, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { RefObject, useRef, useState } from 'react'
import QRCode from './QRCode'
import { TEvents, TTicket } from '../types/ticket'
import { IconDownload } from '@tabler/icons'
import html2canvas from 'html2canvas';
import { TOrder } from '../types/Order'
import { parseStringToDate, parseStringToHour } from '../utils/dateHelper'
import LabeledText from './LabeledText'
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
  const bgCardColor = useColorModeValue('gray.100', 'whiteAlpha.200');
  const useIndex = event?.id === "EfVWwp5uKuxmXr1TbKgt" ? 0 : 1;
  const images = [
    "../../Blaiz.jpg",
    "../../pole.jpg",
  ]

  return (
    <VStack >
      <Box ref={ticketRef} bgColor={'chakra-body-bg'} gap={4} borderRadius={10}>

        <VStack width={{ base: '400px', lg: '500px' }} gap={4} bgColor={bgCardColor} borderRadius={10} p={5}>
          <HStack gap={6} w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <Heading size={'lg'}>{event?.name}</Heading>
            <Button hidden={isDownloading || !isDownloadable} onClick={handleDownload} gap={2} colorScheme={'teal'} ><IconDownload />Descargar</Button>
          </HStack>
          <HStack gap={4} width={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
            <VStack >
              <Img src={images[useIndex]}
                borderRadius={'10'}
                objectFit={'cover'}
                __css={{ aspectRatio: '4/4' }}
                maxWidth='150px'
                onError={(err) => console.log(err)} />
            </VStack>
            <VStack gap={4} alignItems={'baseline'} justifyContent={'space-evenly'} h={'100%'}>
              <LabeledText label='Lugar:' text={event?.location} />
              <LabeledText label='Fecha:' text={parseStringToDate(event?.date)} />
              <LabeledText label='Hora:' text={parseStringToHour(event?.date)} />
              <LabeledText label='Precio:' text={'₡' + ticket?.price?.toString() || ''} />
            </VStack>
          </HStack>
          <Divider />
          <Flex>
            <QRCode orderID={order.id} ticket={ticket} />
          </Flex>
          <Divider />
          <HStack spacing={1} alignItems={'baseline'}>
            <LabeledText label='Email:' text={order.email} />
          </HStack>
          <HStack justifyContent={'space-evenly'} w={'100%'} >
            <LabeledText justifyContent='center' label='Nombre:' text={order.first_name + ' ' + order.last_name} />
            <LabeledText justifyContent='center' label='Tel:' text={order.phone} />
          </HStack>
          <HStack spacing={1} display={'block'}>
            <Text as='sub' fontStyle={'italic'} fontSize='sm' fontWeight={'bold'} variant={'primary'}>
              Oficialmente Generado por TicketManager ©</Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}

export default Ticket