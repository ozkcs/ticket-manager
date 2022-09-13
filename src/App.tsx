import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';


// Components
import Header from './components/Header';
import Navigation from "./components/Navigation";
import GenerateCode from "./views/GenerateCode";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Box mb={10}>
        <Header />
        <Navigation />
      </Box>
      <Routes>
        <Route path="/" element={ <h2>Welcome to QR manager-app</h2> } />
        <Route path="/generate-code" element={<GenerateCode />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
