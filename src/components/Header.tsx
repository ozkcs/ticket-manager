import { Box, Flex, Spacer, ButtonGroup, Heading, Button } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useNavigate } from "react-router-dom";
import { Logo } from '../Logo';
import useEvents from '../hooks/useEvents';

const Header = () => {
  const eventsContex = useEvents();
  const navigate = useNavigate();

  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' p="2">
      <Box as='button' p='2' display='flex' alignItems="center"  onClick={() => {navigate('/'); eventsContex.setCurrentEvent(null)}}>
        <Logo h="6vmin" mr="5" />
        <Heading  size='md'> Ticket Manager App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Button colorScheme='teal'>Log Out</Button>
      </ButtonGroup>
    </Flex>
  )
};

export default Header;