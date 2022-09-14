import {useContext} from 'react'
import EventsContext from '../context/EventsContext'

const useEvents = () => {
  return useContext(EventsContext);
}

export default useEvents