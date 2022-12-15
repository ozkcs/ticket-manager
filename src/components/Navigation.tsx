import { Stack, Flex, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useEvents from "../hooks/useEvents";
import EventSelector from "./EventSelector";

const Navigation = () => {
  const navigate = useNavigate();
  const eventsContext = useEvents();

  useEffect(() => {
    eventsContext.fetchEvents();
    // eventsContext.postNewEvents(); //uncomment if need to post a new event
  });
  return (
    <Flex w={'100vw'}  maxW={'100%'} alignItems='center' gap='2' justifyContent="space-between" padding="2" direction={['column', 'column', 'row', 'row']} >
      <EventSelector />
      <Stack direction='row' spacing={4} align='center'>
        <Button colorScheme='teal' variant='ghost' onClick={() => navigate('generate-code')}>
          Generate QRCode
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => navigate('validate-code')}>
          Validate Code
        </Button>
        <Button colorScheme='teal' variant='ghost' onClick={() => navigate('/')}>
          Reporting
        </Button>
      </Stack>
    </Flex>
  )
};

export default Navigation;