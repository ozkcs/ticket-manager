import { Stack, Flex, Button, Spacer, useMediaQuery, Hide } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useEvents from "../hooks/useEvents";
import EventSelector from "./EventSelector";
import { IconScan, IconQrcode, IconReportAnalytics, IconNotes } from '@tabler/icons';
const Navigation = () => {
  const navigate = useNavigate();
  const eventsContext = useEvents();

  useEffect(() => {
    eventsContext.fetchEvents();
    // eventsContext.postNewEvents(); //uncomment if need to post a new event
  });
  return (
    <Flex w={'100vw'} maxW={'100%'} alignItems='center' gap='2' justifyContent="space-between" padding="2" direction={'row'} >
      <EventSelector />
      <Stack direction='row' spacing={2} align='center'>
        <Button colorScheme='teal' variant='ghost' gap={2} onClick={() => navigate('generate-code')}>
          <IconQrcode />
          <Hide below='lg'>
            Generate QRCode
          </Hide>
        </Button>
        <Button colorScheme='teal' variant='ghost' gap={2} onClick={() => navigate('validate-code')}>
          <IconScan />
          <Hide below='lg'>
            Validate Code
          </Hide>
        </Button>
        <Button colorScheme='teal' variant='ghost' gap={2} onClick={() => navigate('/')}>
          <IconReportAnalytics />
          <Hide below='lg'>
            Reporting
          </Hide>
        </Button>
        <Button colorScheme='teal' variant='ghost' gap={2} onClick={() => navigate('/order-history')}>
          <IconNotes />
          <Hide below='lg'>
            Order History
          </Hide>
        </Button>
      </Stack>
    </Flex>
  )
};

export default Navigation;