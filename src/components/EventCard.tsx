import { Box, SimpleGrid, GridItem, Stack, Text, Button, Flex, Heading, Spacer, useBoolean } from "@chakra-ui/react";
import useEvents from "../hooks/useEvents";
import { useNavigate } from "react-router-dom";

interface props {
    event?: any;
    index?: any;
}
const EventCard = ({ event, index }: props) => {
    const navigate = useNavigate();

    const eventsContex = useEvents();
    const handleOnClick = () => {
        // eventsContex.setCurrentEvent(event);
        eventsContex.setCurrentEvent(event);
        navigate('event-details');
    }
    return (
        event &&
        <Box maxWidth='400px' minWidth='90%' borderRadius='10' borderWidth='3px' borderColor={'teal.200'} p='4' onClick={handleOnClick}>
            <Box maxWidth='100%' minWidth='50%' minHeight={'200px'} borderRadius='10' borderWidth='3px' borderColor={'teal.200'} >

            </Box>
            <Stack spacing={4}>

                <Heading size='lg' as='h2' >
                    {event?.name}
                </Heading >
                {/* <Text as='sub' fontSize='lg' >{event?.location} </Text> */}<Text as='sub' fontSize='lg' color='gray.400'>{event?.date.toString()} </Text>
            </Stack>
          


        </Box>
    )
}

export default EventCard