import { HStack, Heading, Img, Stat, StatLabel, StatNumber, VStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LabeledText from "./LabeledText";
import { TTicket, TTicketType } from "../types/ticket";


interface IEventReportCard {
  event: any
  eventOrders: any
  tickets: any
}
const EventReportCard = ({ event, eventOrders, tickets }: IEventReportCard) => {
  const [eventSales, seteventSales] = useState();
  const [eventProfit, seteventProfit] = useState();

  const getEventSales = () => {
    /*
      Return an Array with all the ticktes per order
    */
    const sales = eventOrders.reduce((acc: any, order: any, index: number) => {
      if (order) {
        const ticketsFound = findTickets(order.id);
        acc = ticketsFound.reduce((acc2: any, ticket: TTicket) => {
          if (ticket.name) {
            acc2[ticket.name] = acc2[ticket.name] || [];
            acc2[ticket.name].push(ticket);
          }
          return acc2;
        }, acc)
      }
      return acc;
    }, [])
    return sales;
  }

  const getEventProfit = () => {
    /*
      Return the ammount collected by the event;
    */
    const profit = eventOrders.reduce((acc: number, order: any) => {
      if (order) {
        const ticketsFound = findTickets(order.id);
        acc += ticketsFound.reduce((acc2: number, ticket: TTicket) => {
          acc2 += ticket.price || 0;
          return acc2;
        }, 0)
      }
      return acc;
    }, 0)
    return profit;
  }

  const findTickets = (orderId: string) => {
    if (orderId) {
      return tickets[orderId] || []
    }
  }

  const getLength = (array: Array<any>) => {
    return array.length
  }

  const bgCardColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const images = [
    "../../Blaiz.jpg",
    "../../pole.jpg",
  ]

  useEffect(() => {
    seteventProfit(getEventProfit())
    seteventSales(getEventSales());
  }, [])

  return (
    <VStack
      key={event.id}
      width={'500px'}
      gap={4}
      bgColor={bgCardColor}
      borderRadius={10}
      p={5}
      alignItems={'flex-start'}
    >
      <Heading size={'md'}>{event.name}</Heading>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <HStack gap={2} w={'100%'}>
          <Img src={images[event.id === "EfVWwp5uKuxmXr1TbKgt" ? 0 : 1]}
            borderRadius={'10'}
            objectFit={'cover'}
            __css={{ aspectRatio: '4/4' }}
            maxWidth='100px'
            onError={(err) => console.log(err)} />
          <VStack alignItems={'flex-start'} gap={2} w={'100%'}>
            {event?.ticketTypes?.map((type: TTicketType) =>
              <LabeledText key={type.name} justifyContent={'space-between'} label={type.name} text={(eventSales ? getLength(eventSales[type.name]) : '') + " x " + type.price} />
            )}
          </VStack>
          <VStack>
            <Stat>
              <StatLabel>Total Collected</StatLabel>
              <StatNumber>₡{eventProfit}</StatNumber>
              {/* <StatHelpText>TODO: dateCreated - actualTimestamp</StatHelpText> */}
            </Stat>
          </VStack>
        </HStack> </HStack>
    </VStack>
  )

}

export default EventReportCard;