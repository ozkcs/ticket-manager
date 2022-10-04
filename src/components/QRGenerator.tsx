import React, { useState } from 'react'

import { QRCode as QRCodeLogo } from 'react-qrcode-logo';


const QRGenerator = () => {
  const [info, setInfo] = useState('');
  const [src, setSrc] = useState('');
  const [showQR, setShowQR] = useState(false);

  // TODO: Change all these tags to chakra tags
  return (

    <div className='generator'>
      {showQR &&
        <QRCodeLogo value={info}
          ecLevel='L'
          size={250}
          // qrStyle='dots'
          eyeRadius={10}
          bgColor='#61dafb' fgColor=' #282c34'
        // eyeColor={{ outer: '#61dafb', inner: '#b73a3b' }}
        // logoImage={logo} logoHeight={15} logoWidth={15}
        />}
    </div>

  );
}

export default QRGenerator