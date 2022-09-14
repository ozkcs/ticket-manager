import { createContext, useState } from 'react'

const EventsContext = createContext<any>(null);

interface props {
    children: any;
}

const EventsProvider = ({ children }: props) => {
    const [currentEvent, setCurrentEvent] = useState<any>()
    return (
        <EventsContext.Provider
            value={{
                currentEvent, 
                setCurrentEvent
            }}>
            {children}
        </EventsContext.Provider>
    )
}

export { EventsProvider }
export default EventsContext