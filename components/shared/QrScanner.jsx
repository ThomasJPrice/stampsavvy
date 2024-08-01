'use client'

import { Scan } from "lucide-react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { QrScanInfo } from ".";

const Overlay = () => {
  return (
    <div className="absolute top-1/2 left-1/2 z-50 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2">
      <Scan className="w-full h-full" />
    </div>
  )
}

const QrScanner = () => {
  const [data, setData] = useState('No result');

  const handleResult = (result) => {
    const qrCodeText = result?.text;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[0-9]{8}$/;
    if (uuidRegex.test(qrCodeText)) {
      setData(qrCodeText);
    } else {
      console.error('Invalid QR code format');
    }
  };

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleResult(result);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{
          facingMode: 'environment'
        }}
        className={`w-[400px] h-[400px] overflow-hidden relative ${data !== 'No result' ? 'hidden' : ''}`}
        videoStyle={{ objectFit: 'cover', width: '100%', height: '100%' }}
        containerStyle={{ width: '100%', height: '100%' }}
        ViewFinder={Overlay}
      />

      {data && <QrScanInfo data={data} setData={setData} />}
    </>
  );
}

export default QrScanner;
