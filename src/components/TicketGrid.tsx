import { SimpleGrid, Stack } from "@chakra-ui/react";
import { TEvents, TTicket } from "../types/ticket";
import Ticket from "./Ticket";
import { TOrder } from "../types/Order";
import useEvents from "../hooks/useEvents";
import { useEffect } from "react";

interface ITicketGrid {
  order: TOrder,
  tickets: Array<TTicket>
}

const TicketGrid = ({ order, tickets }: ITicketGrid) => {
  const eventsContext = useEvents();
  const { events, setCurrentEvent, currentEvent } = eventsContext;

  useEffect(() => {
    if (!currentEvent)
      setCurrentEvent(events.find((event: TEvents) => event.id === order?.eventId));
  }, [])

  return (
    <Stack w={'100%'} alignItems={'center'} mb={10}>
      <SimpleGrid justifyItems='center'
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: tickets?.length <= 2
            ? `repeat(${tickets?.length}, 1fr)`
            : 'repeat(2, 1fr)',
          xl: tickets?.length <= 3
            ? `repeat(${tickets?.length}, 1fr)`
            : 'repeat(3, 1fr)'
        }}
        gap={8} alignItems={'center'}>
        {currentEvent && tickets?.map((ticket: TTicket) =>
          <Ticket key={ticket.id} order={order} ticket={ticket} event={currentEvent} isDownloadable />
        )}
      </SimpleGrid>
    </Stack >)
};


export default TicketGrid;