
import { createContext, useMemo, useState } from 'react'
import { getEvents, postEvents } from "../services/eventsService";

const EventsContext = createContext<any>(null);
interface props {
  children: any;
}

const EventsProvider = ({ children }: props) => {
  const [currentEvent, setCurrentEvent] = useState<any>();
  const [events, setEvents] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [qrValue, setQrValue] = useState('')
  const { aquiredTickets } = currentEvent || [null];

  const setAquiredTickets = (temp: any) => {
    setCurrentEvent({ ...currentEvent, aquiredTickets: temp })
  }
  const fetchEvents = async () => {
    const fetchedEvents = await getEvents();
    setEvents(fetchedEvents);
    setIsLoading(false);
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
        qrValue, setQrValue,
        aquiredTickets, setAquiredTickets,
        fetchEvents, postNewEvents
      }}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsProvider }
export default EventsContext