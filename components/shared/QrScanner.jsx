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

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
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

      <QrScanInfo data={data} setData={setData} />

      {/* <QrScanInfo data='7a27fd64-e1b9-4461-883f-e1f528a2aa0a/56741357' setData={setData} /> */}
    </>
  );
}

export default QrScanner;
