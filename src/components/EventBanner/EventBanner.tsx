import React from 'react'
import useEvents from '../../hooks/useEvents';
import { Box, SimpleGrid, GridItem, Stack, Text, Button, Flex, Heading, Spacer, useBoolean } from "@chakra-ui/react";

const EventBanner = () => {
  const eventsContex = useEvents();
  const { currentEvent } = eventsContex;

  return (
    <Box as='form' maxW="70%" minW="50%" m="auto" alignItems='center' mb='100'>
      <Stack>
      <Heading size='4xl' as='h2' >{currentEvent?.name}</Heading >

      <Text as='b' fontSize='xl' color='gray.200'>{currentEvent?.location.toString()} </Text>
      <Text as='sub' fontSize='xl' color='gray.400'>{currentEvent?.date.toString()} </Text>
      </Stack>
    </Box>
  )
}

export default EventBanner