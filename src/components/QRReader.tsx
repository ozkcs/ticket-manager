import { Box } from '@chakra-ui/react';
import React, { useState } from 'react'
// @ts-ignore
import QrReader from 'react-qr-scanner';
import adapter from 'webrtc-adapter';
const QRReader = () => {
  const [result, setResult] = useState('');

  // TODO: Change all these tags to chakra tags
  return (
    <Box>
      
      {<QrReader

      // @ts-ignore
        // legacyMode
        // delay={500}
      facingMode='rear'
        // containerStyle={{ width: '300px' }}
        onScan={(result: any) => {
          if (!!result) {
            setResult(result?.text);
          }
    
        }}
        onError={ (error: any) => {
          console.log(error)
            console.log(adapter.browserDetails.browser)
        }}
      />}
      <h1>{result}</h1>
    </Box>
  );
}

export default QRReader