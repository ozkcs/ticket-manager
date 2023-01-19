import { Box, Heading, Stack, Spinner, Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEvents from "../hooks/useEvents";
import { getOrder, getTicketsByOrder } from '../services/ticketsService'
import { IconBrandWhatsapp, IconMail } from '@tabler/icons';
import { TEvents, TTicketType } from '../types/ticket';
import EventBanner from '../components/EventBanner';
import TicketGrid from '../components/TicketGrid';
import { sendLinkQRCodes } from '../utils/whatsAppTemplate';
import { useParams } from 'react-router-dom';

const QRGenerator = () => {
  const eventsContext = useEvents();
  const { pruchasedTickets, setPruchasedTickets, currentOrder, setCurrentOrder, events } = eventsContext;
  const { orderID } = useParams();
  const [isLoading, setisLoading] = useState(true);

  const fetchData = async () => {
    setCurrentOrder(await getOrder(orderID));
    setPruchasedTickets(await getTicketsByOrder(orderID));
    setisLoading(false);
  }

  const cleanData = async () => {
    setPruchasedTickets(undefined);
    setCurrentOrder(undefined);
  }

  useEffect(() => {
    cleanData();
    fetchData();
  }, []);

  const buildWhatsAppLink = () => {
    if (currentOrder) {
      const typeOfTicket = pruchasedTickets && pruchasedTickets[0]?.type
      const ticketsQuantities = pruchasedTickets && pruchasedTickets?.length
      // for this 👇 case we can retrieve the data byId and pre-populate the information
      const { name, location, ticketTypes } = events.find((event: TEvents) => event.id === currentOrder?.eventId)
      const total = ticketTypes?.filter((item: TTicketType) => item.name === typeOfTicket)[0]?.price * ticketsQuantities

      const messageTemplate = sendLinkQRCodes(
        currentOrder?.first_name,
        name,
        '4 de Julio',
        location,
        ticketsQuantities,
        total,
        typeOfTicket,
        currentOrder.id)
      const userPhoneNumber = `${currentOrder?.phone}`
      const serviceURL = `https://api.whatsapp.com/send?phone=${userPhoneNumber}&text=${messageTemplate}`
      return serviceURL
    }
  }

  return (
    <>
      <EventBanner />
      <Box minWidth='50%' gap='2' mt={"100px"} mb={"50px"}>
        <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
          <HStack justifyContent={'space-between'} width={'100%'}>
            {/* <Heading mb={'10px'}>Select the tickets you want to send</Heading> */}
            <HStack justifyContent={'space-around'}>
              <Button as="a" target="_blank" fontSize={'2xl'} gap={2} variant={'ghost'} colorScheme={'whatsapp'} href={buildWhatsAppLink()}><IconBrandWhatsapp /> Send</Button>
              <Button variant={'ghost'} colorScheme={'messenger'} fontSize={'2xl'} gap={2}><IconMail /> Send</Button>
            </HStack>
          </HStack>
          {isLoading
            ? <Spinner />
            : <TicketGrid order={currentOrder} tickets={pruchasedTickets} />
          }
        </Stack>
      </Box>
    </>
  );
}

export default QRGenerator