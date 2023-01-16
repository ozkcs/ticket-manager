import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { EventsProvider } from './context/EventsContext';
// Components
import AdminLayout from './layout/AdminLayout';
import EventGallery from './views/EventGallery';
import GenerateCode from "./views/GenerateCode";
import ValidateCode from './views/ValidateCode';
import TicketSummary from './views/TicketSummary';
import OrderHistory from './views/OrderHistory';

import ClientLayout from './layout/ClientLayout';
import ClientTicketSummary from './views/ClientTicketSummary';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <EventsProvider>
        <Routes>
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="" element={<EventGallery />} />
            <Route path="generate-code" element={<GenerateCode />} />
            <Route path="validate-code" element={<ValidateCode />} />
            <Route path="ticket-summary/:orderID" element={<TicketSummary />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
          <Route path="/order" element={<ClientLayout />} >
            <Route path=":orderID" element={<ClientTicketSummary />} />
          </Route>
        </Routes>
      </EventsProvider>
    </BrowserRouter>
  </ChakraProvider>
)
