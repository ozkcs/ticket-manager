import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { EventsProvider } from './context/EventsContext';
// Components
import Header from './components/Header';
import Navigation from "./components/Navigation";
import EventGallery from './views/EventGallery';
import GenerateCode from "./views/GenerateCode";
import ValidateCode from './views/ValidateCode';
import PuchasedCodes from './views/PurchasedCodes';
import OrderHistory from './views/OrderHistory';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <EventsProvider>
        <Box mb={10}>
          <Header />
          <Navigation />
        </Box>
        <Routes>
          <Route path="/" element={<EventGallery />} />
          <Route path="/generate-code" element={<GenerateCode />} />
          <Route path="/validate-code" element={<ValidateCode />} />
          <Route path="/purchased-codes" element={<PuchasedCodes />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </EventsProvider>
    </BrowserRouter>
  </ChakraProvider>
)
