
import { createContext, useMemo, useState } from 'react'
import { getEvents, postEvents } from "../services/eventsService";
import { TOrder } from '../types/Order';
import { TTicket } from '../types/ticket';

const EventsContext = createContext<any>(null);
interface props {
  children: any;
}

const EventsProvider = ({ children }: props) => {
  const [currentEvent, setCurrentEvent] = useState<any>();
  const [events, setEvents] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOrder, setCurrentOrder] = useState<TOrder | undefined>()
  const [pruchasedTickets, setPruchasedTickets] = useState<Array<TTicket> | undefined>();
  const { aquiredTickets } = currentEvent || [null];
  const [totalPayed, setTotalPayed] = useState<number>(0);

  const setAquiredTickets = (temp: any) => {
    setCurrentEvent({ ...currentEvent, aquiredTickets: temp })
  }
  const fetchEvents = async () => {
    try {
      setEvents(await getEvents());
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  };
  const postNewEvents = async () => {
    await postEvents();
  }

  return (
    <EventsContext.Provider
      value={{
        currentEvent, setCurrentEvent,
        events, setEvents,
        isLoading, setIsLoading,
        currentOrder, setCurrentOrder,
        pruchasedTickets, setPruchasedTickets,
        aquiredTickets, setAquiredTickets,
        totalPayed, setTotalPayed,
        fetchEvents, postNewEvents
      }}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsProvider }
export default EventsContext