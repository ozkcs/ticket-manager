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
    const getStartDate = () => {
        const date = new Date(event?.dates[0].toDate());
        return (date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()));
    }
    const getEndDate = () => {
        const date = new Date(event?.dates[1].toDate());
        return (date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()));
    }
    return (
        event &&
        <Box maxWidth='400px' minWidth='90%' borderRadius='10' borderWidth='3px' borderColor={'teal.200'} p='4' onClick={handleOnClick}>
            <Box maxWidth='100%' minWidth='50%' minHeight={'200px'} borderRadius='10' borderWidth='3px' borderColor={'teal.200'} >
            </Box>
            <Stack spacing={7}>
                <Heading size='lg' as='h2' >
                    {event?.name}
                </Heading >

                {/* <Text as='sub' fontSize='lg' >{event?.location} </Text> */}
                <Stack direction='row' justifyContent={'center'}> 
                    <Stack direction='row' spacing={0} >
                        <Text as='sub' fontSize='lg' fontWeight={'bold'}>
                            {'Start:'} </Text>
                        <Text as='sub' fontSize='lg' color='gray.400' noOfLines={1}>
                            {getStartDate().toString()} </Text>
                    </Stack>
                    <Spacer />
                    <Stack direction='row' spacing={0} flexWrap='nowrap'>
                        <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                            {'End:'} </Text>
                        <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
                            {getEndDate().toString()} </Text>
                    </Stack>
                </Stack>
            </Stack>



        </Box>
    )
}

export default EventCard