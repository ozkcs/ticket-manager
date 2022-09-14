import { Stack, Flex, Button, MenuButton, MenuList, MenuItem, Menu, Spacer } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
const events = [
  {
    id: '1',
    name: 'Independence Fest',
    date: dayjs().add(7, 'day'),
    dateRange: '',
    location: 'Salon El Prado',
  },
  {
    id: '2',
    name: 'Secrets Event',
    date: dayjs().add(4, 'day'),
    dateRange: '',
    location: 'Salon El Prado',
  },
  {
    id: '3',
    name: 'Pérez vs Cartago',
    date: dayjs().add(2, 'day'),
    dateRange: '',
    location: 'Estadio Municipal Pérez Zeledón',
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const navigateTo = (path: any) => {
    navigate(path);
  }
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent="center" padding="6" >
      {/* <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Select Event
        </MenuButton>
        <MenuList>
          {events.map(event => (<MenuItem>{event.name}</MenuItem>))}
        </MenuList>
      </Menu>
      <Spacer /> */}
      <Stack direction='row' spacing={4} align='center' marginLeft={10}>
        {/* <Flex minWidth='max-content' alignItems='center' gap='2' p="2"> */}

        {/* </Flex> */}

        <Button colorScheme='teal' variant='ghost' onClick={() => navigateTo('event-details')}>
          Event Details
        </Button>
        <Button colorScheme='teal' variant='ghost'onClick={() => navigateTo('/')}>
          Validate Code
        </Button>
        <Button colorScheme='teal' variant='ghost'onClick={() => navigateTo('/')}>
         Reporting
        </Button>
      </Stack>
    </Flex>
  )
};

export default Navigation;