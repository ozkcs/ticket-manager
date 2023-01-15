import { SimpleGrid } from "@chakra-ui/react";
import { TEvents, TTicket } from "../types/ticket";
import Ticket from "./Ticket";
import { useEffect, useState } from "react";
import { getOrders } from "../services/ticketsService";
import { TOrder } from "../types/Order";
import useEvents from "../hooks/useEvents";

interface ITicketGrid {
  orderID: string | undefined,
  tickets: Array<TTicket>
}
const empty_order = {
  id: '',
  email: '',
  eventId: '',
  first_name: '',
  last_name: '',
  phone: '',
}

const empty_event = {
  dates: [''],
  id: '',
  location: '',
  name: '',
  ticketTypes: []
}
const TicketGrid = ({ orderID, tickets }: ITicketGrid) => {
  const eventsContext = useEvents();
  const { events } = eventsContext;
  const [order, setOrder] = useState<TOrder>(empty_order);
  const [event, setEvent] = useState<TEvents>();
  const fetchOrders = async () => {
    Promise.resolve(getOrders())
      .then((fetchedOrders) => {
        if (fetchedOrders) {
          const temp_order = fetchedOrders.find((order: TOrder) => order.id === orderID);
          temp_order && setOrder(temp_order);
        }
      })
  }

  const setCurrentEvent = () => {
    setEvent(events.find((event: TEvents) => event.id === order.eventId));
  }

  useEffect(() => {
    setCurrentEvent();
  }, [order]);


  useEffect(() => {
    fetchOrders();
  }, []);

  return (<SimpleGrid justifyItems='center'
    templateColumns={{
      base: 'repeat(1, 1fr)',
      md: 'repeat(1, 1fr)',
      lg: 'repeat(2, 1fr)',
      xl: tickets?.length <= 3
        ? `repeat(${tickets?.length}, 1fr)`
        : 'repeat(3, 1fr)'
    }}
    gap={8}>
    {event && tickets?.map((ticket: TTicket) =>
      <Ticket order={order} ticket={ticket} event={event} isDownloadable />
    )}
  </SimpleGrid>)
};


export default TicketGrid;