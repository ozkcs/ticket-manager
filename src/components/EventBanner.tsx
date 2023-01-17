import { Box, Stack, Text, Heading, Spacer, } from "@chakra-ui/react";
import useEvents from '../hooks/useEvents';
import { titleTextSize, subtitleTextSize, nomralTextSize } from "../utils/ResponsiveStyles";
import { parseStringToDate, parseStringToHour } from "../utils/dateHelper";

const EventBanner = () => {
  const eventsContext = useEvents();
  const { currentEvent } = eventsContext;

  return (
    <Box minWidth='max-content' alignItems='center' gap='2'>
      <Heading size={titleTextSize} as='h2' marginTop={0} >{currentEvent?.name}</Heading>
      {currentEvent ?
        <Stack direction={['column', 'column', 'row', 'row']} marginTop={4}  >
          <Stack direction='row' spacing={2} marginBottom={6}>
            <Text as='sub' fontSize={subtitleTextSize} fontWeight={'bold'} wordBreak={'keep-all'}>
              Location: </Text>
            <Text as='sub' fontSize={subtitleTextSize} color='gray.200'>{currentEvent?.location.toString()}</Text>
          </Stack>
          <Spacer />
          <Stack spacing={3} >
            <Stack direction='row' spacing={2} flexWrap='nowrap'>
              <Text as='sub' fontSize={nomralTextSize} fontWeight={'bold'} wordBreak={'keep-all'}>
                {'Date:'} </Text>
              <Spacer />
              <Text as='sub' fontSize={nomralTextSize} color='gray.400' wordBreak={'keep-all'}>
                {parseStringToDate(currentEvent?.date)}
              </Text>
            </Stack>
            <Spacer />
            <Stack width={'100%'} direction='row' spacing={2} flexWrap='nowrap'>
              <Text as='sub' fontSize={nomralTextSize} fontWeight={'bold'} wordBreak={'keep-all'}>
                {'Hour:'} </Text>
              <Spacer />
              <Text as='sub' fontSize={nomralTextSize} color='gray.400' wordBreak={'keep-all'} textAlign='right'>
                {parseStringToHour(currentEvent?.date)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        :
        <Stack>
          <Heading size={titleTextSize} as='h2' >No event selected</Heading>
        </Stack>}
    </Box >
  )
}

export default EventBanner