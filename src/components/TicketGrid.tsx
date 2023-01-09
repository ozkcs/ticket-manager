import { SimpleGrid } from "@chakra-ui/react";
import { TTicket } from "../types/ticket";
import Ticket from "./Ticket";

interface ITicketGrid {
  orderID: string | undefined,
  tickets: Array<TTicket>
}
const TicketGrid = ({ orderID, tickets }: ITicketGrid) =>
  <SimpleGrid justifyItems='center'
    templateColumns={{
      base: 'repeat(1, 1fr)',
      md: 'repeat(1, 1fr)',
      lg: 'repeat(2, 1fr)',
      xl: tickets?.length <= 3
        ? `repeat(${tickets?.length}, 1fr)`
        : 'repeat(3, 1fr)'
    }}
    gap={8}>
    {tickets?.map((ticket: TTicket) =>
      <Ticket orderID={orderID} ticket={ticket} />
    )}
  </SimpleGrid>;


export default TicketGrid;