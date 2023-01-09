import { Box, Heading, Stack, Spinner, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEvents from "../hooks/useEvents";
import { getTicketsByOrder } from '../services/ticketsService'
import { IconBrandWhatsapp, IconMail } from '@tabler/icons';
import Ticket from '../components/Ticket';
import { TTicket } from '../types/ticket';
import EventBanner from '../components/EventBanner';
import TicketGrid from '../components/TicketGrid';
import { MOCKED_SOLD_TICKETS } from '../data-mockups/sold_ticketMockup';

const QRGenerator = () => {
  const eventsContext = useEvents();
  const { orderID, pruchasedTickets, setPruchasedTickets } = eventsContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      // COMMENTED DUE TO MOCKED DATA
      // Promise.resolve(getTicketsByOrder(orderID))
      //   .then((fetchedTickets) => {
      //     setPruchasedTickets(fetchedTickets);
      //   }).finally(() => {
      //     setIsLoading(false)
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     //TODO: Handle Error
      //   });
      setPruchasedTickets(MOCKED_SOLD_TICKETS.filter((ticket: TTicket) => ticket.order === orderID));
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <EventBanner />
      <Box minWidth='50%' gap='2' mt={"100px"} mb={"50px"}>
        <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Heading mb={'10px'}>Select the tickets you want to send</Heading>
            <HStack justifyContent={'space-around'}>
              <Button variant={'ghost'} colorScheme={'whatapp'}><IconBrandWhatsapp /> Send</Button>
              <Button variant={'ghost'} colorScheme={'messenger'}><IconMail /> Send</Button>
            </HStack>
          </HStack>
          {isLoading
            ? <Spinner />
            : <TicketGrid orderID={orderID} tickets={pruchasedTickets} />
          }
        </Stack>
      </Box>
    </>
  );
}

export default QRGenerator