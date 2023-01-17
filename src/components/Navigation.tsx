import { Stack, Flex, Button, Hide } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useEvents from "../hooks/useEvents";
import EventSelector from "./EventSelector";
import { IconScan, IconQrcode, IconReportAnalytics, IconNotes } from '@tabler/icons';

interface INavigate {
  currentView: string;
  setCurrentView: (view: string) => void;
  handleNavigate: (view: string) => void
}
const Navigation = ({ currentView, setCurrentView, handleNavigate }: INavigate) => {
  const eventsContext = useEvents();
  const location = useLocation();

  useEffect(() => {
    eventsContext.fetchEvents();
    // eventsContext.postNewEvents(); //uncomment if need to post a new event
    const currentPath = location.pathname.split('/')
    setCurrentView(currentPath[2]);
  },[]);

  return (
    <Flex w={'100vw'} maxW={'100%'} alignItems='center' gap='2' justifyContent="space-between" padding="2" direction={'row'} >
      <EventSelector />
      <Stack direction='row' spacing={2} align='center'>
        <Button colorScheme='teal' gap={2}
          variant={currentView === 'generate-code' ? 'outline' : 'ghost'}
          onClick={() => handleNavigate('generate-code')}>
          <IconQrcode />
          <Hide below='lg'>
            Generate QRCode
          </Hide>
        </Button>
        <Button colorScheme='teal' gap={2}
          variant={currentView === 'validate-code' ? 'outline' : 'ghost'}
          onClick={() => handleNavigate('validate-code')}>
          <IconScan />
          <Hide below='lg'>
            Validate Code
          </Hide>
        </Button>
        <Button colorScheme='teal' gap={2}
          variant={currentView === 'reporting' ? 'outline' : 'ghost'}
          onClick={() => handleNavigate('reporting')}>
          <IconReportAnalytics />
          <Hide below='lg'>
            Reporting
          </Hide>
        </Button>
        <Button colorScheme='teal' gap={2}
          variant={currentView === 'order-history' ? 'outline' : 'ghost'}
          onClick={() => handleNavigate('order-history')}>
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