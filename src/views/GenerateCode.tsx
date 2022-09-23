import EventBanner from "../components/EventBanner";
import CodeGeneratorForm from "../components/CodeGeneratorForm";
import TicketSelection from "../components/TicketSelection";
import { Box } from "@chakra-ui/react";

const GenerateCode = () => (
  <Box pl={[4, 4, '5%', '5%']} pr={[4, 4, '5%', '5%']} >
    <EventBanner />
    <TicketSelection />
    <CodeGeneratorForm />
  </Box>
);

export default GenerateCode;