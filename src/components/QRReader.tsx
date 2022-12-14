import { Box, Heading } from '@chakra-ui/react';
import React, { useState } from 'react'
// @ts-ignore
import QrReader from 'react-qr-scanner';
import adapter from 'webrtc-adapter';
const QRReader = () => {
const [result, setResult] = useState('');

  return (
    <Box>
      <QrReader
        // legacyMode
        delay={1000}
        // @ts-ignore
        // constraints={ {facingMode: 'user'} }
        // containerStyle={{ width: '300px' }}
        onScan={(result: any) => {
          console.log(result?.text)
          if (!!result) {
            setResult(result?.text);
          }
        }}
        onError={(error: any) => {
          console.log(error)
          console.log(adapter.browserDetails.browser)
        }}
      />
      <Heading>{result}</Heading>
    </Box>
  );
}

export default QRReader