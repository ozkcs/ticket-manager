import { Box, Center, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {

  return (
    <>
      <Box pl={[4, 4, '5%', '5%']} pr={[4, 4, '5%', '5%']} >
        <Flex w={"100vw"} maxW={'100%'}>
          <Center w={'100%'} >
            <Box w={'100%'} >
              <Outlet />
            </Box>
          </Center>
        </Flex>
      </Box>
    </>
  )
}

export default ClientLayout