import { useEffect, useState } from 'react'
import { HStack, Heading, Img, SimpleGrid, Stack, VStack, useColorModeValue } from '@chakra-ui/react'
import { getOrders } from '../services/ticketsService'
import { TOrder } from '../types/Order'
import useEvents from '../hooks/useEvents'
import { useNavigate } from "react-router-dom";
import { TEvents } from '../types/ticket'
import LabeledText from '../components/LabeledText'
import { parseStringToDate } from '../utils/dateHelper'

const OrderHistory = () => {
  const navigate = useNavigate();
  const eventsContext = useEvents();
  const { setCurrentOrder, setCurrentEvent, events } = eventsContext;
  const [orders, setOrders] = useState<Array<TOrder>>();

  const fetchOrders = async () => {
    setOrders(await getOrders());
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  const handleClick = (order: TOrder) => {
    setCurrentOrder(order);
    setCurrentEvent(events.find((event: TEvents) => event.id === order.eventId));
    navigate(`/admin/ticket-summary/${order.id}`);
  }
  const bgCardColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const hoverColor = useColorModeValue('gray.50', 'whiteAlpha.200');
  const images = [
    "../../Blaiz.jpg",
    "../../pole.jpg",
  ]

  return (
    <Stack w={'100%'} alignItems={'center'}>
      <SimpleGrid justifyItems='center'
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
          lg: orders && orders?.length <= 2
            ? `repeat(${orders?.length}, 1fr)`
            : 'repeat(2, 1fr)',
          xl: orders && orders?.length <= 3
            ? `repeat(${orders?.length}, 1fr)`
            : 'repeat(3, 1fr)'
        }}
        gap={8} alignItems={'center'}>
        {orders && orders?.map((order: TOrder) =>

          <VStack as={'button'}
            key={order.id}
            onClick={() => handleClick(order)}
            width={'500px'}
            gap={4}
            bgColor={bgCardColor}
            borderRadius={10}
            p={5}
            alignItems={'flex-start'}
            _hover={{ bg: hoverColor, boxShadow: "2xl" }}
          >
            <Heading size={'md'}>Order: {order.id}</Heading>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <HStack gap={2}>
                <Img src={images[order.eventId === "EfVWwp5uKuxmXr1TbKgt" ? 0 : 1]}
                  borderRadius={'10'}
                  objectFit={'cover'}
                  __css={{ aspectRatio: '4/4' }}
                  maxWidth='100px'
                  onError={(err) => console.log(err)} />
                <VStack alignItems={'flex-start'} gap={2}>
                  <LabeledText label='Name:' text={order.first_name + ' ' + order.last_name} />
                  <LabeledText label='Date:' text={parseStringToDate(order.purchaseDate)} />
                </VStack>
              </HStack>
              {/* <Button colorScheme={'teal'} onClick={() => handleClick(order)} >View Details</Button> */}
            </HStack>
          </VStack>

        )}
      </SimpleGrid>
    </Stack >
  )

}

export default OrderHistory