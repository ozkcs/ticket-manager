import {
  Box, Button, Heading, Radio, RadioGroup, Spacer, Stack, Text,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
} from '@chakra-ui/react'
import { useState } from 'react'
import { titleTextSize, subtitleTextSize, nomralTextSize } from "../utils/ResponsiveStyles";
import useEvents from '../hooks/useEvents'
import TicketRowInfo from './TicketRowInfo';

const TicketSelection = () => {
  const eventsContext = useEvents();
  const [radioValue, setRadioValue] = useState<any>('0')
  const { aquiredTickets } = eventsContext;

  const handleOnChangeRB = (e: any) => {
    console.log(e.valueOf())
    setRadioValue(e.valueOf())
  }
  const handleAdd = (value: any) => {
    let tempTicket: any = {};
    let tempTicketList = [];
    const tktExists = eventsContext.aquiredTickets?.find((ticket: any) => ticket.name === value) || false;
    if (tktExists) {
      tempTicketList = eventsContext.aquiredTickets?.map((ticket: any) => {//Search the existing ticket to update its value
        if (ticket.name === value) {
          tempTicket = { ...ticket, cant: ticket.cant + 1 }
          return tempTicket;
        } else {
          return ticket;
        }
      })
    } else {
      eventsContext.currentEvent?.ticketTypes?.forEach((ticket: any) => {
        if (ticket.name === value) {
          tempTicket = { ...ticket, cant: 1 }
          delete tempTicket.cantLeft;
        }
      })
      if (eventsContext.aquiredTickets.length !== 0) {
        tempTicketList = eventsContext.aquiredTickets;
      }
      tempTicketList = [...tempTicketList, tempTicket];
    }
    eventsContext.setAquiredTickets(tempTicketList);
  }
  return (
    <>
      <Box minWidth='50%' gap='2' mt={"50px"}>
        <Heading size='lg' as='h2' >
          Ticket Configuration
        </Heading >
        <RadioGroup colorScheme='teal' size='lg' onChange={(e) => { handleOnChangeRB(e) }} value={radioValue}>
          <Stack direction={['column', 'column', 'row', 'row']} marginTop={4} gap={[2, 2, 4, 6]} spacing={[2, 2, 4, 6]} >
            <Text fontSize={subtitleTextSize} fontWeight={'bold'}>
              Available options:</Text>
            <Stack direction={'row'} justifyContent={'flex-start'} gap={6} spacing={[4, 4, 4, 6]} >
              {eventsContext.currentEvent?.ticketTypes?.map((tiket: any, i: number) => {
                return <>
                  <Radio value={`${tiket?.name}`}>
                    <Text fontSize={nomralTextSize} fontWeight={'bold'}>
                      {tiket?.name}</Text>
                    <Spacer />
                    <Text as='sub' fontSize={nomralTextSize} color='gray.400' wordBreak={'keep-all'}>
                      {tiket?.cantLeft !== 0 ? tiket?.cantLeft + ' Left' : 'SoldOut'} </Text>
                  </Radio>
                </>
              })}
              <Button disabled={radioValue === '0'} colorScheme={'teal'} onClick={() => handleAdd(radioValue)} >Add</Button>
            </Stack>
          </Stack>
        </RadioGroup>
        {/* Table */}
        <TableContainer marginTop={4}>
          <Table variant='simple' fontSize={nomralTextSize}>
            <Thead>
              <Tr>
                <Th>Ticket name</Th>
                <Th>Price</Th>
                <Th>Cant</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {aquiredTickets?.map((ticket: any) => { return <TicketRowInfo ticket={ticket} handleAdd={() => handleAdd(ticket.name)} handleSubs={() => handleAdd(ticket.name)} /> })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th isNumeric>0</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
export default TicketSelection