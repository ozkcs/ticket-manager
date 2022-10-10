import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { QRCode as QRCodeLogo } from 'react-qrcode-logo';
import useEvents from "../hooks/useEvents";

const QRGenerator = () => {
  const eventsContext = useEvents();
  const { qrValue } = eventsContext;
  return (

    <Box minWidth='50%' gap='2' mt={"100px"} mb={"50px"}>
      <Stack justifyContent={'center'} alignItems={'center'} alignContent={'center'} >
        <Heading mb={'10px'}>Your QR Code</Heading>
        <Flex backgroundColor={'teal.200'} p={2} width={'fit-content'} height={'fit-content'} borderRadius={10}>
          <QRCodeLogo value={qrValue}
            ecLevel='H'
            size={250}
            qrStyle='dots'
            eyeRadius={5}
            bgColor={'transparent'} fgColor={'#1a202c'}
          // eyeColor={{ outer: '#61dafb', inner: '#b73a3b' }}
          // logoImage={logo} logoHeight={15} logoWidth={15}
          />
        </Flex>
      </Stack>
    </Box>
  );
}

export default QRGenerator