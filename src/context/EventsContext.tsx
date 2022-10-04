
import { createContext, useState } from 'react'
import { getEvents, postEvents } from "../services/eventsService";

const EventsContext = createContext<any>(null);
interface props {
  children: any;
}

const EventsProvider = ({ children }: props) => {
  const [currentEvent, setCurrentEvent] = useState<any>();
  const [events, setEvents] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aquiredTickets, setAquiredTickets] = useState<any>([]);

  const fetchEvents = async () => {
    const fetchedEvents = await getEvents();
    setEvents(fetchedEvents);
    setIsLoading(false);
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
        aquiredTickets, setAquiredTickets,
        fetchEvents, postNewEvents
      }}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsProvider }
export default EventsContext