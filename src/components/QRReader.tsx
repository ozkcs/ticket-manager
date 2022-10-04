import React, { useState } from 'react'

import { QrReader } from 'react-qr-reader';

const QRReader = () => {
  const [info, setInfo] = useState('');
  const [src, setSrc] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [result, setResult] = useState('');
  const handleGenerate = async () => {
    const data = await QRCode.toDataURL(info);
    setSrc(data);
    setShowQR(!showQR)
  }
  // TODO: Change all these tags to chakra tags
  return (
    <div className='generator video' id='vid'>
      <div className='generator video' id='vid'>
        <QrReader
          // scanDelay
          containerStyle={{ width: '300px' }}
          videoContainerStyle={{ width: '300px', height: '200px' }}
          onResult={(result: any, error: any) => {
            if (!!result) {
              setResult(result?.text);
            }
            if (!!error) {
            }
          }}
        />
      </div>
      <h1>{result}</h1>

    </div>
  );
}

export default QRReader