import { SimpleGrid, Stack } from "@chakra-ui/react";
import { TEvents, TTicket } from "../types/ticket";
import Ticket from "./Ticket";
import { TOrder } from "../types/Order";
import useEvents from "../hooks/useEvents";

interface ITicketGrid {
  order: TOrder,
  tickets: Array<TTicket>
}

const TicketGrid = ({ order, tickets }: ITicketGrid) => {
  const eventsContext = useEvents();
  const { events, setCurrentEvent, currentEvent } = eventsContext;
  setCurrentEvent( events.find((event: TEvents) => event.id === order?.eventId));

  return (
    <Stack w={'100%'} alignItems={'center'}>
      <SimpleGrid justifyItems='center'
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
          lg: tickets?.length <= 2
            ? `repeat(${tickets?.length}, 1fr)`
            : 'repeat(2, 1fr)',
          xl: tickets?.length <= 3
            ? `repeat(${tickets?.length}, 1fr)`
            : 'repeat(3, 1fr)'
        }}
        gap={8} alignItems={'center'}>
        {currentEvent && tickets?.map((ticket: TTicket) =>
          <Ticket order={order} ticket={ticket} event={currentEvent} isDownloadable />
        )}
      </SimpleGrid>
    </Stack >)
};


export default TicketGrid;