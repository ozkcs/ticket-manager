import React, { useEffect, useState } from 'react'
import CenteredLayout from '../layout/CenteredLayout'
import { Button, Center, Flex, Stack, Text } from '@chakra-ui/react'
import { getOrders } from '../services/ticketsService'
import { TOrder } from '../types/Order'
import useEvents from '../hooks/useEvents'
import { useNavigate } from "react-router-dom";
import { MOCKED_ORDERS } from '../data-mockups/orderMockup'

const OrderHistory = () => {
  const navigate = useNavigate();
  const eventsContext = useEvents();
  const { setCurrentOrder, setOrderID } = eventsContext;
  const [orders, setOrders] = useState<any>();

  const fetchOrders = async () => {
    // setOrders(await getOrders());
   setOrders(MOCKED_ORDERS)
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  const handleClick = (order: TOrder) => {
    setOrderID(order.id);
    setCurrentOrder(order);
    navigate('/purchased-codes');
  }

  return (
    <CenteredLayout>
      <Stack>
        {orders && orders?.map((order: TOrder) =>
          <Flex w={'100%'} h={'100px'} gap={2}>
            <Center  w={'100%'} gap={8}>
              <Text>Order ID: {order.eventId}</Text>
              <Button onClick={() => handleClick(order)}>View Order Details</Button>
            </Center>
          </Flex>
        )}
      </Stack>
    </CenteredLayout>
  )
}

export default OrderHistory