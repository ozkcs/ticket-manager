import { Box, Heading, Stack, Spinner, Flex, Divider, Text, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEvents from "../hooks/useEvents";
import QRCode from './QRCode';
import { getTicketsByOrder } from '../services/ticketsService'

const QRGenerator = () => {
  const eventsContext = useEvents();
  const { orderID, pruchasedTickets, setPruchasedTickets } = eventsContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //TODO: need to mockup the data needed

    // if (isLoading) {
    //   Promise.resolve(getTicketsByOrder(orderID))
    //     .then((fetchedTickets) => {
    //       setPruchasedTickets(fetchedTickets);
    //     }).finally(() => {
    //       setIsLoading(false)
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       //TODO: Handle Error
    //     });
    // }
  }, []);

  return (
    <Box minWidth='50%' gap='2' mt={"100px"} mb={"50px"}>
      <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
        <Heading mb={'10px'}>Thanks for purchaising</Heading>
        {isLoading ?
          <Spinner /> :
          <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} minWidth='100%'>
            {pruchasedTickets?.map((ticket: any) => {
              return (
                <>
                {/* TODO: MAKE A COMPONNENT FOR THIS */}
                  <Flex minWidth='100%'>
                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
                      {/* IMAGE */}
                      <Box minWidth='200px' minHeight={'200px'} borderRadius='10' borderWidth='3px' borderColor={'teal.200'} >
                        Image goes here
                      </Box>
                      <Spacer />
                      {/* INFORMATION CONTAINER */}
                      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
                        {/* EVENT INFORMATION CONTAINER */}
                        <Stack direction='row' spacing={1} flexWrap='nowrap'>
                          <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                            Event:</Text>
                          <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
                            event name goes here</Text>
                        </Stack>
                        <Spacer />
                        <Stack >
                          <Stack direction='row' spacing={1} flexWrap='nowrap'>
                            <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                              Start:</Text>
                            <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
                              date goes here</Text>
                          </Stack>
                          <Spacer />
                          <Stack direction='row' spacing={1} flexWrap='nowrap'>
                            <Text as='sub' fontSize='lg' fontWeight={'bold'} wordBreak={'keep-all'}>
                              End </Text>
                            <Text as='sub' fontSize='lg' color='gray.400' wordBreak={'keep-all'} >
                              date goes here </Text>
                          </Stack>
                        </Stack>
                      </Stack >
                      {/* TICKET INFORMATION CONTAINER */}
                      <Stack>
                        <Text></Text>
                      </Stack>
                    </Stack>
                    <Spacer />
                    <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
                      <Flex>
                        <QRCode orderID={orderID} ticket={ticket} />
                      </Flex>
                    </Stack>
                  </Flex>
                  <Divider minWidth='100%' />
                </>
              )
            })}
          </Stack>
        }
      </Stack>
    </Box>
  );
}

export default QRGenerator