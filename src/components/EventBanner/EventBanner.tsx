import React from 'react'
import useEvents from '../../hooks/useEvents';
import { Box, SimpleGrid, GridItem, Stack, Text, Button, Flex, Heading, Spacer, useBoolean } from "@chakra-ui/react";

const EventBanner = () => {
  const eventsContex = useEvents();
  const { currentEvent } = eventsContex;

  const getStartDate = () => {
    const date = new Date(currentEvent?.dates[0].toDate());
    return (date.getDate() +
      "/" + (date.getMonth() + 1) +
      "/" + date.getFullYear() +
      " " + date.getHours() +
      ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()));
  }
  const getEndDate = () => {
    const date = new Date(currentEvent?.dates[1].toDate());
    return (date.getDate() +
      "/" + (date.getMonth() + 1) +
      "/" + date.getFullYear() +
      " " + date.getHours() +
      ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()));
  }

  return (
    <Box as='form' maxW="70%" minW="50%" m="auto" alignItems='center' mb='100'>
      <Stack>
        <Heading size='4xl' as='h2' >{currentEvent?.name}</Heading >

        <Text as='b' fontSize='xl' color='gray.200'>{currentEvent?.location.toString()} </Text>
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

export default EventBanner