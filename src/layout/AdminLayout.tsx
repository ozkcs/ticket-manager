import { useEffect, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCookie } from '../hooks/useCookie';
import { decodeToken } from '../utils/decodeToken';

const AdminLayout = () => {
  const [currentView, setCurrentView] = useState<string>('');
  const navigate = useNavigate();
  const { removeItem } = useCookie()
  const token = decodeToken()

  const handleNavigate = (view: string) => {
    const isRoot = view === ('root')
    setCurrentView(isRoot ? '' : view);
    navigate(isRoot ? '/admin' : view);
  }

  useEffect(() => {
    if (token?.exp * 1000 < Date.now()) {
      navigate('/login')
      removeItem('token_id')
    }
  }, [])

  if (!token) {
    return <Navigate to="/login" replace />
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