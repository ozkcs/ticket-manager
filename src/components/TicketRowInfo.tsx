import { Button, Input, Td, Tr, Text } from "@chakra-ui/react"

type TProp = {
  ticket: any
  handleAdd: any
  handleSubs: any
}
const TicketRowInfo = ({ ticket, handleSubs, handleAdd }: TProp) => {
  return (
    <Tr>
      <Td>{ticket?.name}</Td>
      <Td>{ticket?.price}</Td>
      <Td >
        <Text as={'button'} fontSize={'2xl'} fontWeight={'bold'} marginRight={2} color='red.300' onClick={handleSubs}>-
        </Text>
        <Input type={'number'} width={'25%'} value={ticket?.quantity}
          onChange={(e: any) => { (ticket = { ...ticket, quantity: e.target.value }) }}
        />
        {/* TODO: Make field editable */}
        <Text as={'button'} fontSize={'xl'} fontWeight={'bold'} marginLeft={2} color='teal.300' onClick={handleAdd}>+
        </Text>
      </Td>
      <Td >{(ticket?.price * ticket?.quantity).toString()}</Td>
    </Tr>
  )
}

export default TicketRowInfo;