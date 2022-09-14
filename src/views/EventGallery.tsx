import { Box, SimpleGrid, GridItem, Stack, Text, Button, Flex, Heading, Spacer, useBoolean } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import dayjs from 'dayjs';
const EventGallery = () => {
    const [events, setEvents] = useState<any>([]);

    const fetchEvents = () => {
        setEvents([
            {
                id: '1',
                name: 'Independence Fest',
                date: dayjs().add(7, 'day'),
                dateRange: '',
                location: 'Salon El Prado',
            },
            {
                id: '2',
                name: 'Secrets Event',
                date: dayjs().add(4, 'day'),
                dateRange: '',
                location: 'Salon El Prado',
            },
            {
                id: '3',
                name: 'Pérez vs Cartago',
                date: dayjs().add(2, 'day'),
                dateRange: '',
                location: 'Estadio Municipal Pérez Zeledón',
            },
        ])

    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Stack alignItems={'center'} spacing={10}>

            <Heading size='4xl' as='h2'  textAlign='center'>
                UPCOMING EVENTS
            </Heading >
            <Box maxW="80%" minW="50%" m="auto" alignItems='center' justifyItems='center'>
                <SimpleGrid justifyItems='center' minChildWidth='400px' spacingX='20px' spacingY='40px' >
                    {events && events?.map((event: any, index: any) => {
                        return (<EventCard event={event} index={index} />)
                    })}
                </SimpleGrid >
            </Box>
        </Stack>
    )
}

export default EventGallery