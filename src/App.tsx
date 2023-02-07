import { ChakraProvider } from '@chakra-ui/react';
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
import { customTheme } from './utils/customTheme';
import Reporting from './views/Reporting';

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <EventsProvider>
        <Routes>
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="" element={<EventGallery />} />
            <Route path="generate-code" element={<GenerateCode />} />
            <Route path="validate-code" element={<ValidateCode />} />
            <Route path="reporting" element={<Reporting />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="ticket-summary/:orderID" element={<TicketSummary />} />
          </Route>
          <Route path="/order" element={<ClientLayout />} >
            <Route path=":orderID" element={<ClientTicketSummary />} />
          </Route>
        </Routes>
      </EventsProvider>
    </BrowserRouter>
  </ChakraProvider>
)
