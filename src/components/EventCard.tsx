import { Box, Stack, Heading, useColorModeValue, HStack, Tag, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import { parseStringToDate, parseStringToHour } from "../utils/dateHelper";

interface props {
  event?: any;
  count?: number;
}

const EventCard = ({ event, count }: props) => {
  const navigate = useNavigate();
  const eventsContext = useEvents();
  const bgCardColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const hoverColor = useColorModeValue('gray.50', 'whiteAlpha.200');
  const handleOnClick = () => {
    eventsContext.setCurrentEvent(event);
    navigate('generate-code');
  }
  const images = [
    "./Blaiz.jpg",
    "./pole.jpg",
  ]

  return (
    <Box as="button" maxWidth={{ base: '400px', md: '500px' }} minWidth='350px' borderRadius='10'
      bgColor={bgCardColor}
      p='4' onClick={handleOnClick}
      _hover={{ bg: hoverColor, boxShadow: "2xl" }}>
      <Stack>
        <Heading size='lg' as='h2' textAlign={'start'}>
          {event?.name}
        </Heading >
        {count !== undefined &&
          <Image src={images[count]}
            borderRadius={'10'}
            objectFit={'cover'}
            maxWidth='100%' maxH={'500px'} />
        }
        <HStack mt={4} >
          <Tag colorScheme={'teal'}>
            {parseStringToDate(event?.date)}
          </Tag>
          <Tag colorScheme={'teal'}>
            {parseStringToHour(event?.date)}
          </Tag>
        </HStack>
      </Stack>
    </Box>
  )
}
export default EventCard