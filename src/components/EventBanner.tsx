import { Box, Stack, Text, Heading, Spacer, } from "@chakra-ui/react";
import useEvents from '../hooks/useEvents';
import { titleTextSize, subtitleTextSize, nomralTextSize } from "../utils/ResponsiveStyles";
import { parseStringToDate, parseStringToHour } from "../utils/dateHelper";
import LabeledText from "./LabeledText";

const EventBanner = () => {
  const eventsContext = useEvents();
  const { currentEvent } = eventsContext;

  return (
    <Box minWidth='max-content' alignItems='center' gap='2'>
      <Heading size={titleTextSize} as='h2' marginTop={0} >{currentEvent?.name}</Heading>
      {currentEvent ?
        <Stack direction={['column', 'column', 'row', 'row']} marginTop={4}  >
          <Stack direction='row' spacing={2} marginBottom={6}>
            <LabeledText label='Location:' text={currentEvent?.location.toString()} />
          </Stack>
          <Spacer />
          <Stack spacing={3} >
            <LabeledText label='Date:' text={parseStringToDate(currentEvent?.date)} justifyContent={'space-between'} />
            <LabeledText label='Hour:' text={parseStringToHour(currentEvent?.date)} justifyContent={'space-between'} />
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