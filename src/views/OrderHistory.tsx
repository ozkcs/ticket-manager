import { useEffect, useState } from 'react'
import { Button, Center, Flex, Stack, Text } from '@chakra-ui/react'
import { getOrders } from '../services/ticketsService'
import { TOrder } from '../types/Order'
import useEvents from '../hooks/useEvents'
import { useNavigate } from "react-router-dom";
import { TEvents } from '../types/ticket'

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
    navigate('/admin/ticket-summary');
  }

  return (
    <Stack>
      {orders && orders?.map((order: TOrder) =>
        <Flex w={'100%'} h={'100px'} gap={2}>
          <Center w={'100%'} gap={8}>
            <Text>Order ID: {order.id}</Text>
            <Button onClick={() => handleClick(order)}>View Order Details</Button>
          </Center>
        </Flex>
      )}
    </Stack>
  )
}

export default OrderHistory