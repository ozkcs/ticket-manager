import EventBanner from "../components/EventBanner";
import CodeGeneratorForm from "../components/CodeGeneratorForm";
import TicketSelection from "../components/TicketSelection";
import { Box } from "@chakra-ui/react";
import useEvents from "../hooks/useEvents";
import QRGenerator from "../components/QRGenerator";

const GenerateCode = () => {
  const eventsContext = useEvents();

  return (
    <Box pl={[4, 4, '5%', '5%']} pr={[4, 4, '5%', '5%']} >
      <EventBanner />
      {eventsContext.currentEvent &&
        <>
          {eventsContext?.qrValue === '' ?
            <>
              <TicketSelection />
              <CodeGeneratorForm />
            </>
            :
            <QRGenerator />}
        </>
      }
    </Box>)
};

export default GenerateCode;