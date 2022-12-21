import { SimpleGrid, Stack, Heading, Spinner } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import useEvents from "../hooks/useEvents";
import CenteredLayout from "../layout/CenteredLayout";

const EventGallery = () => {
  const eventsContext = useEvents();

  return (
    <CenteredLayout>
      <Stack alignItems={'center'} spacing={10}>
        <Heading size='4xl' as='h2' textAlign='center'>
          UPCOMING EVENTS
        </Heading >
        {eventsContext?.isLoading
          ? <Spinner size={'xl'}></Spinner>
          : <SimpleGrid justifyItems='center'
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)', 
              xl:eventsContext.events?.length <= 3
              ? `repeat(${eventsContext.events?.length}, 1fr)`
              : 'repeat(3, 1fr)'
            }}
            gap={10} >
            {eventsContext.events?.map((event: any, index: any) => {
              return (<EventCard event={event} index={index} key={index} />)
            })}
          </SimpleGrid>
        }
      </Stack>
    </CenteredLayout >
  )
}

export default EventGallery