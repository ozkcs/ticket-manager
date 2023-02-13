import { useEffect, useState } from "react";
import { getAllTicketsSorted, getOrders } from "../services/ticketsService";
import useEvents from "../hooks/useEvents";
import { TOrder } from "../types/Order";
import { TEvents, } from "../types/ticket";
import { SimpleGrid, Spinner, Stack, } from "@chakra-ui/react";
import EventReportCard from "../components/EventReportCard";

const Reporting = () => {
  const eventsContext = useEvents();
  const { events } = eventsContext;
  const [allTickets, setAllTickets] = useState<any>();
  const [orders, setOrders] = useState<Array<TOrder>>();
  const [isLoading, setisLoading] = useState(true);

  const fetch = async () => {
    try {
      setOrders(await getOrders());
      setAllTickets(await getAllTicketsSorted());
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false);
    }
  }

  const findOrders = (id: string) =>
    orders?.map((order: TOrder) => order.eventId === id && order);

  useEffect(() => {
    setisLoading(true);
    fetch();
  }, []);

  return (
    <Stack w={'100%'} alignItems={'center'} mb={10}>
      {isLoading
        ? <Spinner size={'xl'} />
        :
        (<SimpleGrid justifyItems='center'
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: events && events?.length <= 2
              ? `repeat(${events?.length}, 1fr)`
              : 'repeat(2, 1fr)',
            xl: events && events?.length <= 3
              ? `repeat(${events?.length}, 1fr)`
              : 'repeat(3, 1fr)'
          }}
          gap={8} alignItems={'center'}>
          {events?.map((event: TEvents) =>
            <EventReportCard key={event.id} event={event} eventOrders={findOrders(event.id)} tickets={allTickets} />
          )}
        </SimpleGrid>
        )
      }
    </Stack>
  );
}

export default Reporting;
