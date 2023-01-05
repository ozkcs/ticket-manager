import EventBanner from "../components/EventBanner";
import CodeGeneratorForm from "../components/CodeGeneratorForm";
import TicketSelection from "../components/TicketSelection";
import useEvents from "../hooks/useEvents";

const GenerateCode = () => {
  const eventsContext = useEvents();

  return (
    <>
      <EventBanner />
      {eventsContext.currentEvent &&
        <>
          <TicketSelection />
          <CodeGeneratorForm />
        </>
      }
    </>
  )
};

export default GenerateCode;