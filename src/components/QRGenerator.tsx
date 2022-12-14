import { Box, Heading, Stack, Grid, GridItem, Spinner, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEvents from "../hooks/useEvents";
import QRCode from './QRCode';
import { getTicketsByOrder } from '../services/ticketsService'

const QRGenerator = () => {
  const eventsContext = useEvents();
  const { orderID, pruchasedTickets, setPruchasedTickets } = eventsContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
  }, [pruchasedTickets]);

  useEffect(() => {
    if (isLoading) {
      Promise.resolve(getTicketsByOrder(orderID))
        .then((fetchedTickets) => {
          setPruchasedTickets(fetchedTickets);
        }).catch((err) => {
          console.log(err);
          //TODO: Handle Error
        });
    }
  }, []);

  return (
    <Box minWidth='50%' gap='2' mt={"100px"} mb={"50px"}>
      <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
        <Heading mb={'10px'}>Thanks for purchaising</Heading>
        {isLoading ?
          <Spinner /> :
          <Grid templateColumns={`repeat(${pruchasedTickets <= 5 ? pruchasedTickets.length : 5}, 1fr)`} flexWrap={'wrap'} gap={6}>
            {pruchasedTickets?.map((ticket: any) => {
              return <QRCode orderID={orderID} ticket={ticket} />
            })}
          </Grid>
        }
      </Stack>
    </Box>
  );
}

export default QRGenerator