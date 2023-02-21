import { Box, Flex, Spacer, ButtonGroup, Heading, Button, Hide } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useNavigate } from "react-router-dom";
import { Logo } from '../Logo';
import useEvents from '../hooks/useEvents';
import { IconLogout } from '@tabler/icons';
import { getAuth, signOut } from "@firebase/auth";
import { useAuth } from '../context/AuthContext';

interface IHeader {
  currentView?: string;
  setCurrentView?: (view: string) => void;
  handleNavigate: (view: string) => void;
}

const Header = ({ handleNavigate }: IHeader) => {
  const eventsContext = useEvents();
  const auth = getAuth();
  const { logout } = useAuth()
  const navigate = useNavigate()  

  const closeSession = async () => {
    await signOut(auth)
    logout()
    navigate('/login')
  }

  return (
    <Flex w={'100vw'} maxW={'100%'} alignItems='center' gap='2' p="2" mt={2}>
      <Box as='button' p='2' display='flex' alignItems="center"
        onClick={() => { handleNavigate('/admin'); eventsContext.setCurrentEvent(null) }}>
        <Logo h="6vmin" mr="5" />
        <Heading size='md'> Ticket Manager App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Button colorScheme='teal' gap={2} onClick={closeSession}>
          <Hide below='lg'>
            Log Out
          </Hide>
          <IconLogout />
        </Button>
      </ButtonGroup>
    </Flex>
  )
};

export default Header;