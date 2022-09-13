import { Box, Flex, Spacer, ButtonGroup, MenuButton, MenuList, MenuItem, Heading, Button, Menu } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { Logo } from '../Logo';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

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

const Header = () => (
  <>
    <Flex minWidth='max-content' alignItems='center' gap='2' p="2">
      <Box p='2' display='flex' alignItems="center">
        <Logo h="6vmin" mr="5"/>
        <Heading size='md'>Ticket Manager App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Button colorScheme='teal'>Log Out</Button>
      </ButtonGroup>
    </Flex>
    <Flex minWidth='max-content' alignItems='center' gap='2' p="2">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Select Event
        </MenuButton>
        <MenuList>
          {events.map(event => (<MenuItem>{ event.name }</MenuItem>))}
        </MenuList>
      </Menu>
    </Flex>
  </>

);

export default Header;