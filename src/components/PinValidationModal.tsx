
import { Box, Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";

interface IPinValidationModal {
  onPinAccepted: (value: boolean) => void
}

function PinValidationModal({ onPinAccepted }: IPinValidationModal) {
  const auth = getAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [pinCode, setPinCode] = useState<string>();
  const [confirmationResult, setConfirmationResult] = useState<any>();
  const [codeSent, setCodeSent] = useState<any>(false);

  useEffect(() => {
    onOpen();
  }, []);

  const handleSendCode = async () => {
    const phone = '+50684685382'
    const recapcha = new RecaptchaVerifier(
      'auth-container',
      { 'size': 'invisible' },
      auth
    );
    try {
      setConfirmationResult(await signInWithPhoneNumber(auth, phone, recapcha))
      setCodeSent(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleValidateCode = async () => {
    const validated = await confirmationResult.confirm(pinCode);
    if (validated?.operationType === 'signIn') {
      onPinAccepted(true);
      onClose();
    } else {
      //TODO: prompt invalid pin
    }
  }

  const SendCode = () => {
    return (
      <>
        <ModalBody pb={6}>
          <Text>
            Por seguridad necesitamos saber que eres realmente tu.
          </Text>
          <Text>
            Presiona "Enviar" para recibir tu codigo de seguridad.
          </Text>
          <Box id='auth-container' ></Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={'teal'} onClick={handleSendCode}>Enviar</Button>
        </ModalFooter>
      </>
    )
  }

  return (
    <>
      <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={handleValidateCode} colorScheme={'teal'}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>Codigo de seguridad</ModalHeader>
          {!codeSent
            ? <SendCode />
            : <>
              <ModalBody pb={6}>
                <Text>
                  Acabamos de enviar un codigo de 6 digitos ligado a esta orden.
                  Por favor ingresalo en los siguientes espacios y presiona "Confirmar" para ver tus tiquetes.
                </Text>
                <HStack w={'100%'} justifyContent={'space-around'} mt={2} >
                  <PinInput autoFocus value={pinCode} onChange={(value: string) => setPinCode(value)} manageFocus={true}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme={'teal'} onClick={handleValidateCode}>Confirmar</Button>
              </ModalFooter>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  )
}
export default PinValidationModal;