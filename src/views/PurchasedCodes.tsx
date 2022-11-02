import EventBanner from "../components/EventBanner";
import { Box } from "@chakra-ui/react";
import useEvents from "../hooks/useEvents";
import QRGenerator from "../components/QRGenerator";

const PuchasedCodes = () => {
  const eventsContext = useEvents();

  return (
    <Box pl={[4, 4, '5%', '5%']} pr={[4, 4, '5%', '5%']} >
      <EventBanner />
      {eventsContext.ticketsPurchased &&
        <QRGenerator />
      }
    </Box>)
};

export default PuchasedCodes;