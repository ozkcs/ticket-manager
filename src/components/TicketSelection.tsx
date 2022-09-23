import {
  Box, Button, Heading, Radio, RadioGroup, Spacer, Stack, Text, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { titleTextSize, subtitleTextSize, nomralTextSize } from "../utils/ResponsiveStyles";

const TicketSelection = () => {
  const [radioValue, setRadioValue] = useState<any>('1')
  return (
    <>
      <Box minWidth='50%' gap='2' mt={"50px"}>
        <Heading size='lg' as='h2' >
          Ticket Configuration
        </Heading >
        <RadioGroup colorScheme='teal' size='lg' onChange={setRadioValue} value={radioValue}>
          <Stack direction={['column', 'column', 'row', 'row']} marginTop={4} gap={[2, 2, 4, 6]} spacing={[2, 2, 4, 6]} >
            <Text fontSize={subtitleTextSize} fontWeight={'bold'}>
              Available options: </Text>
            <Stack direction={'row'} justifyContent={'flex-start'} gap={6} spacing={[4, 4, 4, 6]} >
              <Radio value='1'>
                <Text fontSize={nomralTextSize} fontWeight={'bold'}>
                  STANDARD</Text>
                <Spacer />
                <Text as='sub' fontSize={nomralTextSize} color='gray.400' wordBreak={'keep-all'}>
                  24 Left</Text>
              </Radio>
              <Radio value='2'>
                <Text fontSize={nomralTextSize} fontWeight={'bold'}>
                  VIP</Text>
                <Spacer />
                <Text as='sub' fontSize={nomralTextSize} color='gray.400' wordBreak={'keep-all'}>
                  10 Left</Text>
              </Radio>
              <Radio value='3'>
                <Text fontSize={nomralTextSize} fontWeight={'bold'}>
                  DELUX</Text>
                <Spacer />
                <Text as='sub' fontSize={nomralTextSize} color='gray.400' wordBreak={'keep-all'}>
                  5 Left</Text>
              </Radio>
              <Button colorScheme={'teal'} >Add</Button>
            </Stack>
          </Stack>
        </RadioGroup>
        {/* Table */}
        <TableContainer marginTop={4}>
          <Table variant='simple' fontSize={nomralTextSize}>
            <Thead>
              <Tr>
                <Th>Ticket Type</Th>
                <Th>Price</Th>
                <Th>Cant</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>info</Td>
                <Td>info</Td>
                <Td isNumeric>0</Td>
                <Td isNumeric>0</Td>
              </Tr>
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
// submit, datos mas id del Evento
// tikettype array{
//   name
//   ticketprice
// }
// en los radio buttuns ticket available
// con un imput con la cantidad
export default TicketSelection