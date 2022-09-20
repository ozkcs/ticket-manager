import { Box, Stack, Text, Heading, Spacer, } from "@chakra-ui/react";
import dayjs from 'dayjs';
import useEvents from '../hooks/useEvents';

const EventBanner = () => {
  const eventsContex = useEvents();
  const { currentEvent } = eventsContex;

  return (
    <Box as='form' maxW="70%" minW="50%" m="auto" alignItems='center' mb='100'>
      {currentEvent ?
        <Stack>
          <Heading size='4xl' as='h2' >{currentEvent?.name}</Heading>
          <Text as='b' fontSize='xl' color='gray.200'>{currentEvent?.location.toString()}</Text>
          <Stack direction='row' justifyContent={'center'}>
            <Stack direction='row' spacing={2} flexWrap='nowrap'>
              <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                {'Start:'} </Text>
              <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'}>
                {dayjs(currentEvent?.dates[0].toDate()).format('DD MMMM YYYY')}</Text>
            </Stack>
            <Spacer />
            <Stack direction='row' spacing={0} flexWrap='nowrap'>
              <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                {'End:'}</Text>
              <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'}>
                {dayjs(currentEvent?.dates[1].toDate()).format('DD MMMM YYYY')}</Text>
            </Stack>
          </Stack>
        </Stack>
        :
        <Stack>
          <Heading size='4xl' as='h2' >No event selected</Heading>
        </Stack>}
    </Box>
  )
}

export default EventBanner