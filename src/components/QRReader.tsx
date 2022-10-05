import { Box } from '@chakra-ui/react';
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';
const QRReader = () => {
  const [result, setResult] = useState('');

  // TODO: Change all these tags to chakra tags
  return (
    <Box>
      {/*@ts-ignore */}
      {!result && <QrReader
        containerStyle={{ width: '300px' }}
        onResult={(result:any, error:any) => {
          if (!!result) {
            setResult(result?.text);
          }
          if (!!error) {
          }
        }}
      />}
      <h1>{result}</h1>
    </Box>
  );
}

export default QRReader