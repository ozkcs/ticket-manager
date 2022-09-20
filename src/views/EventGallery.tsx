import { Box, SimpleGrid, Stack, Heading, useBoolean } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import useEvents from "../hooks/useEvents";

const EventGallery = () => {
  const eventsContext = useEvents();

  return (
    <Stack alignItems={'center'} spacing={10}>
      <Heading size='4xl' as='h2' textAlign='center'>
        UPCOMING EVENTS
      </Heading >
      <Box maxW="80%" minW="50%" m="auto" alignItems='center' justifyItems='center'>
        <SimpleGrid justifyItems='center' minChildWidth='400px' spacingX='20px' spacingY='40px' >
          {eventsContext.events?.map((event: any, index: any) => {
            return (<EventCard event={event} index={index} key={index} />)
          })}
        </SimpleGrid >
      </Box>
    </Stack>
  )
}

export default EventGallery