
import { useParams } from 'react-router-dom';
import {  Spinner, Stack, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEvents from "../hooks/useEvents";
import { getTicketsByOrder } from '../services/ticketsService'
import Ticket from '../components/Ticket';
import { TTicket } from '../types/ticket';
import { MOCKED_SOLD_TICKETS } from '../data-mockups/sold_ticketMockup';
import PinValidationModal from '../components/PinValidationModal';
import TicketGrid from '../components/TicketGrid';

const ClientTicketSummary = () => {
  const eventsContext = useEvents();
  const { pruchasedTickets, setPruchasedTickets } = eventsContext;
  const [isLoading, setIsLoading] = useState(true);
  const [isValidPin, setIsValidPin] = useState<boolean>(false);
  const { orderID } = useParams();

  useEffect(() => {
    if (isLoading && orderID) {
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

      setTimeout(() => {
        setPruchasedTickets(MOCKED_SOLD_TICKETS.filter((ticket: TTicket) => ticket.order === orderID));
      }, 500)
      setTimeout(() => {
        setIsLoading(false);
      }, 500)

    }
  }, []);

  const onPinAccepted = (value: boolean) => {
    setIsValidPin(value);
  }

  return (
    <>
      {isValidPin
        ? <PinValidationModal onPinAccepted={onPinAccepted} />
        : <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} mb={10} mt={10}>
          {isLoading
            ? <Spinner />
            : <TicketGrid orderID={orderID} tickets={pruchasedTickets} />
          }
        </Stack>}
    </>
  )
}

export default ClientTicketSummary;