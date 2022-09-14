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
import EventDetails from "./views/EventDetails";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Box mb={10}>
        <Header />
        <Navigation />
      </Box>
      <EventsProvider>
        <Routes>
          <Route path="/" element={<EventGallery />} />
          <Route path="/event-details" element={<EventDetails />} />
        </Routes>
      </EventsProvider>
    </BrowserRouter>
  </ChakraProvider>
)
