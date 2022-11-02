import { Box, Heading, Stack, Grid, GridItem, Spinner, Flex } from '@chakra-ui/react';
import useEvents from "../hooks/useEvents";
import QRCode from './QRCode';

const QRGenerator = () => {
  const eventsContext = useEvents();
  const { orderID, ticketsPurchased, } = eventsContext;
  return (
    <Box minWidth='50%' gap='2' mt={"100px"} mb={"50px"}>
      <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
        <Heading mb={'10px'}>Thanks for purchaising</Heading>
        <Grid templateColumns='repeat(5, 1fr)' flexWrap={'wrap'} gap={6}>
          {ticketsPurchased.map((ticket: any) => {
            return <QRCode orderID={orderID} ticket={ticket} />
          })}
        </Grid>
      </Stack>
    </Box>
  );
}

export default QRGenerator