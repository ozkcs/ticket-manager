import { Box, Heading, Stack, Spinner, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEvents from "../hooks/useEvents";
import { getTicketsByOrder } from '../services/ticketsService'
import { IconBrandWhatsapp, IconMail } from '@tabler/icons';
import Ticket from '../components/Ticket';
import { TEvents, TTicket, TTicketType } from '../types/ticket';
import EventBanner from '../components/EventBanner';
import TicketGrid from '../components/TicketGrid';
import { MOCKED_SOLD_TICKETS } from '../data-mockups/sold_ticketMockup';
import { sendLinkQRCodes } from '../utils/whatsAppTemplate';

const QRGenerator = () => {
  const eventsContext = useEvents();
  const { pruchasedTickets, setPruchasedTickets, currentOrder, events } = eventsContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      // COMMENTED DUE TO MOCKED DATA
      Promise.resolve(getTicketsByOrder(currentOrder.id))
        .then((fetchedTickets) => {
          setPruchasedTickets(fetchedTickets);
        }).finally(() => {
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
          //TODO: Handle Error
        });
      // setPruchasedTickets(MOCKED_SOLD_TICKETS.filter((ticket: TTicket) => ticket.order === orderID));
      // setIsLoading(false);
    }
  }, []);

  const buildWhatsAppLink = () => {
    const typeOfTicket = pruchasedTickets && pruchasedTickets[0]?.type
    const ticketsQuantities = pruchasedTickets && pruchasedTickets?.length
    // for this 👇 case we can retrieve the data byId and pre-populate the information
    const { name, location, ticketTypes } = events?.find((event: TEvents) => event.id === currentOrder.eventId)
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

  return (
    <>
      <EventBanner />
      <Box minWidth='50%' gap='2' mt={"100px"} mb={"50px"}>
        <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Heading mb={'10px'}>Select the tickets you want to send</Heading>
            <HStack justifyContent={'space-around'}>
              <Button as="a" target="_blank" variant={'ghost'} colorScheme={'whatapp'} href={buildWhatsAppLink()}><IconBrandWhatsapp /> Send</Button>
              <Button variant={'ghost'} colorScheme={'messenger'}><IconMail /> Send</Button>
            </HStack>
          </HStack>
          {isLoading
            ? <Spinner />
            : <TicketGrid orderID={currentOrder.id} tickets={pruchasedTickets} />
          }
        </Stack>
      </Box>
    </>
  );
}

export default QRGenerator