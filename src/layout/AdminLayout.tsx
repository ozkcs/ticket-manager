import { Box, Center, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Box mb={10}>
        <Header />
        <Navigation />
      </Box>
      <Box pl={[4, 4, '5%', '5%']} pr={[4, 4, '5%', '5%']} >
        <Flex w={"100vw"} maxW={'100%'}>
          <Center w={'100%'}>
            <Box w={'100%'} >
              <Outlet />
            </Box>
          </Center>
        </Flex>
      </Box>
    </>
  );
}

export default AdminLayout;