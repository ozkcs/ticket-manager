import { Button, Input, Td, Tr, Text, useNumberInput } from "@chakra-ui/react"
import { useEffect } from "react"

interface ITicketRowInfoProps {
  ticket: any
  handleOnChange:Function
}
const TicketRowInfo = ({ ticket, handleOnChange }: ITicketRowInfoProps) => {

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 10,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => {
    handleOnChange(ticket?.name, valueAsNumber)
  }, [valueAsNumber])

  return (
    <Tr>
      <Td>{ticket?.name}</Td>
      <Td>{ticket?.price}</Td>
      <Td >
        <Button {...dec} marginLeft={2} fontSize={'xl'} w={'8'} h={'8'}  fontWeight={'bold'} colorScheme={'red'} textAlign={'center'} >-</Button>
        <Input type={'number'} value={ticket?.quantity} {...input} width={'25%'} />
        <Button {...inc} marginLeft={2} fontSize={'xl'} w={'8'} h={'8'}  fontWeight={'bold'} colorScheme={'teal'} textAlign={'center'} >+</Button>
      </Td>
      <Td >{(ticket?.price * valueAsNumber).toString()}</Td>
    </Tr>
  )
}

export default TicketRowInfo;