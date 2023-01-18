
import { useParams } from 'react-router-dom';
import { Box, HStack, Heading, Spinner, Stack, Text, useColorModeValue, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEvents from "../hooks/useEvents";
import { getOrder, getTicketsByOrder } from '../services/ticketsService'
import PinValidationModal from '../components/PinValidationModal';
import TicketGrid from '../components/TicketGrid';
import { IconAlertTriangle } from '@tabler/icons';
import { titleTextSize, nomralTextSize, subtitleTextSize } from "../utils/ResponsiveStyles";

const ClientTicketSummary = () => {
  const eventsContext = useEvents();
  const { pruchasedTickets, setPruchasedTickets, setCurrentOrder, currentOrder } = eventsContext;
  const [isValidPin, setIsValidPin] = useState<boolean>(false);
  const { orderID } = useParams();

  const fetchOrder = async () => {
    orderID && setCurrentOrder(await getOrder(orderID));
  }

  const fetchTickets = async () => {
    orderID && setPruchasedTickets(await getTicketsByOrder(orderID));
  }

  useEffect(() => {
    if (isLoading) {
      /*
        As this view is a complete clear page load, 
        the events are not in the appContext yet, 
        so them must be fetched.
      */
      eventsContext.fetchEvents();
      fetchOrder();
      fetchTickets();
    }
  }, []);

  const onPinAccepted = (value: boolean) => {
    setIsValidPin(value);
  }

  const isLoading = !pruchasedTickets && !currentOrder;
  const bgChipColor = useColorModeValue('gray.50', 'whiteAlpha.200');
  return (
    <>
      {!isValidPin
        ? <PinValidationModal onPinAccepted={onPinAccepted} />
        : <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} mb={10} mt={10}>
          {isLoading
            ? <Spinner />
            : <>
              <Stack w={['100%', '100%', '75%', '75%']} alignItems={'center'} justifyContent={'space-between'} direction={['column', 'column', 'row', 'row']} mt={10} mb={10}>
                <Stack>
                  <Heading size={titleTextSize}>Hola, {currentOrder.first_name}!</Heading>
                  <Text size={nomralTextSize} fontWeight={'bold'}>Estos son tus tickets, sientete libre de descargarlos</Text>
                </Stack>
                <Box bgColor={'chakra-body-bg'} borderRadius={10} >

                  <HStack bgColor={bgChipColor} borderRadius={10} p={4} >
                    <IconAlertTriangle />
                    <Text size={subtitleTextSize} fontStyle={'italic'} >
                      Recuerda no compartirlos con cualquiera <br />
                      ya que una vez escaneado un ticket <br />
                      es imposible volver a utilizarlo.
                    </Text>
                  </HStack>
                </Box>

              </Stack>
              <TicketGrid order={currentOrder} tickets={pruchasedTickets} />
            </>
          }
        </Stack>}
    </>
  )
}

export default ClientTicketSummary;