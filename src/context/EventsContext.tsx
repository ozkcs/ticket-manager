
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

  const setAquiredTickets = (temp: any) => {
    setCurrentEvent({ ...currentEvent, aquiredTickets: temp })
  }
  const fetchEvents = async () => {
    Promise.resolve(getEvents())
      .then((fetchEvents) => {
        setEvents(fetchEvents);
      })
      .finally(() => setIsLoading(false))
      .catch((err) => console.log(err)
      );
  };

  const postNewEvents = async () => {
    await postEvents();
  }

  useMemo(() => {
    let templ = events.map((ev: any) => {
      if (ev.name === currentEvent.name) {
        return currentEvent
      }
      else {
        return ev
      }
    });
    setEvents(templ);
  }, [currentEvent?.aquiredTickets])

  return (
    <EventsContext.Provider
      value={{
        currentEvent, setCurrentEvent,
        events, setEvents,
        isLoading, setIsLoading,
        // orderID, setOrderID,
        currentOrder, setCurrentOrder,
        pruchasedTickets, setPruchasedTickets,
        aquiredTickets, setAquiredTickets,
        fetchEvents, postNewEvents
      }}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsProvider }
export default EventsContext