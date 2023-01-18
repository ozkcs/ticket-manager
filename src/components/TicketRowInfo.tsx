import { useEffect, useState } from "react"
import { Button, Input, Td, Tr, Box } from "@chakra-ui/react"
import { EHandlerIncDec } from "../types/ticket"

interface ITicketRowInfoProps {
  ticket: any
  handleOnChange: Function
  ticketLimit: number
}

const TicketRowInfo = ({ ticket, handleOnChange, ticketLimit }: ITicketRowInfoProps) => {

  const [ticketQuantity, setTicketQuantity] = useState<number>(ticket.quantity || 0)

  useEffect(() => {
    if (ticket?.quantity !== ticketQuantity) setTicketQuantity(ticketQuantity + 1)
  }, [ticket?.quantity])

  const handleQuantityEntries = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => () => {
    const valueToNumber = +value
    if ((valueToNumber >= 0) && (valueToNumber <= 10)) {
      setTicketQuantity(valueToNumber)
    }
  }

  const ticketsQuantityHandler = (key: string) => () => {
    if (key === EHandlerIncDec.dec) {
      setTicketQuantity(+ticketQuantity - 1)
      handleOnChange(ticket?.name, +ticketQuantity - 1)
    } else {
      setTicketQuantity(+ticketQuantity + 1)
      handleOnChange(ticket?.name, +ticketQuantity + 1)
    }
  }

  return (
    <Tr>
      <Td >{ticket?.name}</Td>
      <Td >{ticket?.price}</Td>
      <Td >
        <Box w={"20"}>
          <Button onClick={ticketsQuantityHandler(EHandlerIncDec.dec)} disabled={ticketQuantity <= 1} w={'8'} h={'8'} fontWeight={'bold'} colorScheme={'red'} textAlign={'center'} >-</Button>
          <Input type={'number'} value={ticketQuantity} onChange={handleQuantityEntries} maxW={'65%'} />
          <Button onClick={ticketsQuantityHandler(EHandlerIncDec.inc)} fontSize={'xl'} w={'8'} h={'8'} disabled={ticketQuantity >= ticketLimit} fontWeight={'bold'} colorScheme={'teal'} textAlign={'center'} >+</Button>
        </Box>
      </Td>
      <Td >{(ticket?.price * ticketQuantity).toString()}</Td>
    </Tr>
  )
}

export default TicketRowInfo;
