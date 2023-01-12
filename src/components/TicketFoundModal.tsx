import { Button, Center, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import { TTicket } from "../types/ticket";
import { getTicketsByOrder, markTicketAsUsed } from "../services/ticketsService";

interface ITicketFoundModal {
  qrData: string
  setQrData: (value: string) => void
}
const empty_ticket = {
  id: '',
  order: '',
  type: ''
}
const TicketFoundModal = ({ qrData, setQrData }: ITicketFoundModal) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [ticketFound, setTicketFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderID, setOrderID] = useState<string>('');
  const [ticket, setTicket] = useState<TTicket>(empty_ticket);

  const spanToast = useToast();
  const spanCodeUsedToast = () => {
    spanToast({
      title: 'Ticket Validated!',
      description: "Ticket marked as used.",
      status: 'success',
      duration: 2000,
      isClosable: false,
    })
  }
  const spanCodeScannError = () => {
    spanToast({
      title: 'Ups!',
      description: "Something went wrong.",
      status: 'error',
      duration: 3000,
      isClosable: false,
    })
  }

  const searchTicket = async (orderId: string, ticketId: string) => {
    Promise.resolve(getTicketsByOrder(orderId))
      .then((fetchedTickets) => {
        if (fetchedTickets) {
          const temp_ticket = fetchedTickets.find((ticket: TTicket) => ticket.id === ticketId && ticket.order === orderId);
          if (temp_ticket) {
            setOrderID(orderId);
            setTicket(temp_ticket);
            setTicketFound(true);
          }
        }
      }).finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        spanCodeScannError();
      });
  }

  const handleClose = () => {
    setQrData('');
    setOrderID('');
    setTicket(empty_ticket);
    onClose();
  }

  const handleMarkUsed = async (id: string) => {
    Promise.resolve(markTicketAsUsed(id))
      .then((ticket) => {
        if (ticket) setTicket(ticket);
      })
    spanCodeUsedToast();
    handleClose();
  }

  useEffect(() => {
    if (isLoading) {
      if (qrData !== '') {
        const dataContet = qrData.split(',');
        if (dataContet.length === 2) {
          const orderId = dataContet[0];
          const ticketId = dataContet[1];
          searchTicket(orderId, ticketId);
        } else {
          spanCodeScannError();
          handleClose();
        }
      }
      onOpen();
    }
  }, []);

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose} colorScheme={'teal'}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>Ticket Validation</ModalHeader>
          {isLoading
            ? <>
              <ModalBody pb={6}>
                <Stack>
                  <Center>
                    <Spinner size={'xl'} />
                  </Center>
                </Stack>
              </ModalBody>
            </>
            : (ticketFound
              ? <>
                <ModalBody pb={6}>
                  <Ticket orderID={orderID} ticket={ticket} isDownloadable={false} />
                </ModalBody>
                <ModalFooter justifyContent={'space-between'}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button colorScheme={'teal'} onClick={() => handleMarkUsed(ticket.id)} disabled={ticket.validated} >Mark as Used</Button>
                </ModalFooter>
              </>
              : <>
                <ModalBody pb={6}>
                  <Text>Ticket not Found.</Text>
                  <Text>Please try again and make sure is a valid ticket genered by this app.</Text>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleClose} >Close</Button>
                </ModalFooter>
              </>
            )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TicketFoundModal;