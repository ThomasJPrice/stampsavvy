'use client'

import { useQRCode } from "next-qrcode";

const UserQR = ({ userId, businessId }) => {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={businessId + '/' + userId.toString()}
    />
  )
}

export default UserQR