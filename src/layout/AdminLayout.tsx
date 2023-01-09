import { Box, Center, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState<string>('');
  const handleNavigate = (view: string) => {
    const isRoot = view === ('reporting' || 'root')
    setCurrentView(isRoot ? '' : view);
    navigate(isRoot ? '/admin' : view);
  }

  return (
    <>
      <Box mb={10}>
        <Header handleNavigate={handleNavigate} />
        <Navigation currentView={currentView} setCurrentView={setCurrentView} handleNavigate={handleNavigate} />
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