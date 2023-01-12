import { useState } from 'react'
import QRReader from '../components/QRReader'
import TicketFoundModal from '../components/TicketFoundModal';

const ValidateCode = () => {
  const [qrData, setQrData] = useState<string>('');

  const showModal = qrData !== ''

  return (
    <>{
      showModal
        ? <TicketFoundModal qrData={qrData} setQrData={setQrData} />
        : <QRReader setQrData={setQrData} />}
    </>
  )
}

export default ValidateCode