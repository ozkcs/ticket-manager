import {
  Box, Button, Heading, Radio, RadioGroup, Spacer, Stack, Text,
  Table, Thead, Tbody, Tfoot, Tr, Th, TableContainer,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { subtitleTextSize, nomralTextSize } from "../utils/ResponsiveStyles";
import useEvents from '../hooks/useEvents'
import TicketRowInfo from './TicketRowInfo';

const TicketSelection = () => {
  const eventsContext = useEvents();
  const [radioValue, setRadioValue] = useState<string>('0')
  const { currentEvent, aquiredTickets, setTotalPayed, totalPayed } = eventsContext;
  const [currentTypeOfTicket, setCurrentTypeOfTicket] = useState<boolean>(false)

  const handleOnChangeRB = (e: any) => {
    setRadioValue(e.valueOf())
  }

  const newTicket = (ticketName: string) => {
    let tempTicket;
    currentEvent?.ticketTypes?.forEach((ticket: any) => {
      if (ticket.name === ticketName) {
        tempTicket = { ...ticket, quantity: 1 }
        delete tempTicket.quantityLeft;
      }
    });
    return tempTicket;
  }

  const findIndexedTicket = (ticketName: string): number =>
    eventsContext.aquiredTickets?.findIndex((ticket: any) => ticket.name === ticketName)

  const handleOnChange = (ticketName: string, value: number) => {
    let aquiredTicketsCopy = eventsContext.aquiredTickets?.slice() || [];
    const tktIndex = findIndexedTicket(ticketName);
    aquiredTicketsCopy[tktIndex].quantity = value;
    aquiredTicketsCopy[tktIndex].quantity > 9 ? setCurrentTypeOfTicket(true) : setCurrentTypeOfTicket(false)
    eventsContext.setAquiredTickets(aquiredTicketsCopy);
  }

  useMemo(() => {
    const totalAmount = aquiredTickets?.reduce((partSum: number, ticket: any) =>
      partSum + (ticket.quantity * ticket.price), 0);

    setTotalPayed(totalAmount);
  }, [aquiredTickets])

  const handleAdd = (ticketName: string) => {
    const tktIndex = findIndexedTicket(ticketName);
    let aquiredTicketsCopy = eventsContext.aquiredTickets?.slice() || [];
    if (tktIndex >= 0) {
      aquiredTicketsCopy[tktIndex].quantity++;
      aquiredTickets[tktIndex].quantity > 9 ? setCurrentTypeOfTicket(true) : setCurrentTypeOfTicket(false)
    } else {
      aquiredTicketsCopy.push(newTicket(ticketName));
    }
    eventsContext.setAquiredTickets(aquiredTicketsCopy);
  }

  return (
    <>
      <Box minWidth='50%' gap='2' mt={"50px"}>
        <Heading size='lg' as='h2' >
          Ticket Configuration
        </Heading >
        <RadioGroup colorScheme='teal' size='lg' onChange={(e) => handleOnChangeRB(e)} value={radioValue}>
          <Stack direction={['column', 'column', 'row', 'row']} marginTop={4} gap={[2, 2, 4, 6]} spacing={[2, 2, 4, 6]} >
            <Text fontSize={subtitleTextSize} fontWeight={'bold'}>
              Available options:</Text>
            <Stack direction={'row'} justifyContent={'flex-start'} gap={6} spacing={[4, 4, 4, 6]} >
              {currentEvent?.ticketTypes?.map((ticket: any, i: number) => {
                return <>
                  <Radio value={`${ticket?.name}`}>
                    <Text fontSize={nomralTextSize} fontWeight={'bold'}>
                      {ticket?.name}</Text>
                    <Spacer />
                    <Text as='sub' fontSize={nomralTextSize} color='gray.400' wordBreak={'keep-all'}>
                      {ticket?.quantityLeft !== 0 ? ticket?.quantityLeft + ' Left' : 'SoldOut'} </Text>
                  </Radio>
                </>
              })}
              <Button disabled={radioValue === '0' || currentTypeOfTicket} colorScheme={'teal'} onClick={() => handleAdd(radioValue)} >Add</Button>
            </Stack>
          </Stack>
        </RadioGroup>
        {/* Table */}
        <TableContainer marginTop={4}>
          <Table variant='simple' size={['sm', 'sm', 'md', 'lg']}  >
            <Thead>
              <Tr>
                <Th>Ticket</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {aquiredTickets?.map((ticket: any) => <TicketRowInfo ticket={ticket} handleOnChange={handleOnChange} ticketLimit={currentEvent?.ticketTypes[findIndexedTicket(ticket.name)].quantityLeft} />)}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th isNumeric>{totalPayed}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
export default TicketSelection