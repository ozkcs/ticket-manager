import { createContext, useState } from 'react'
import { getEvents } from "../services/eventsService";

const EventsContext = createContext<any>(null);
interface props {
  children: any;
}

const EventsProvider = ({ children }: props) => {
  const [currentEvent, setCurrentEvent] = useState<any>();
  const [events, setEvents] = useState<any>([]);

  const fetchEvents = async () => {
    const fetchedEvents = await getEvents();
    setEvents(fetchedEvents);
  };

  return (
    <EventsContext.Provider
      value={{
        currentEvent, setCurrentEvent,
        events, setEvents,
        fetchEvents
      }}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsProvider }
export default EventsContext