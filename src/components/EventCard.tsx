import { Box, Stack, Text, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import useEvents from "../hooks/useEvents";
interface props {
  event?: any;
  index?: any;
}
const EventCard = ({ event, index }: props) => {
  const navigate = useNavigate();
  const eventsContex = useEvents();

  const handleOnClick = () => {
    eventsContex.setCurrentEvent(event);
    navigate('generate-code');
  }
  return (
    <Box as="button" maxWidth='500px' minWidth='450px' borderRadius='10' borderWidth='3px' borderColor={'teal.200'} p='4' onClick={handleOnClick} _hover={{ bg: "blue.900" }}>
      <Box maxWidth='100%' minWidth='50%' minHeight={'200px'} borderRadius='10' borderWidth='3px' borderColor={'teal.200'} >
      </Box>
      <Stack spacing={7}>
        <Heading size='lg' as='h2' >
          {event?.name}
        </Heading >
        <Stack direction='row' justifyContent={'center'}>
          <Stack direction='row' spacing={1} flexWrap='nowrap'>
            <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
              {'End:'} </Text>
            <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
              {dayjs(event?.dates[0].toDate()).format('DD MMMM YYYY')} </Text>
          </Stack>
          <Spacer />
          <Stack direction='row' spacing={1} flexWrap='nowrap'>
            <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
              {'End:'} </Text>
            <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
              {dayjs(event?.dates[1].toDate()).format('DD MMMM YYYY')} </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
export default EventCard