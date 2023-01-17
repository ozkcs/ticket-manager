import { SimpleGrid, Stack, Heading, Spinner } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import useEvents from "../hooks/useEvents";

const EventGallery = () => {
  const eventsContext = useEvents();

  return (
    <Stack alignItems={'center'} spacing={10} mb={10}>
      <Heading size='4xl' as='h2' textAlign='center'>
        UPCOMING EVENTS
      </Heading >
      {eventsContext?.isLoading
        ? <Spinner size={'xl'}></Spinner>
        : <SimpleGrid justifyItems='center'
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: eventsContext.events?.length <= 3
              ? `repeat(${eventsContext.events?.length}, 1fr)`
              : 'repeat(3, 1fr)'
          }}
          gap={10} >
          {eventsContext.events?.map((event: any, index: number) => {
            return (<EventCard event={event} key={index} count={index} />)
          })}
        </SimpleGrid>
      }
    </Stack>
  )
}

export default EventGallery