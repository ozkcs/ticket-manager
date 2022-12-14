import { Button, MenuButton, MenuList, MenuItem, Menu } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import useEvents from "../hooks/useEvents";

const EventSelector = () => {
  const eventsContext = useEvents();
  const handleOnChange = (indexOf:number)=>{
    eventsContext.setCurrentEvent(eventsContext.events[indexOf]);
  }
  
  return (
    <Menu >
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {eventsContext.currentEvent?.name || 'Select Event'}
      </MenuButton>
      <MenuList>
        {eventsContext.events?.map((event: any, i:any) => (<MenuItem onClick={()=>{handleOnChange(i)}}>{event?.name}</MenuItem>))}
      </MenuList>
    </Menu>
  )
}

export default EventSelector