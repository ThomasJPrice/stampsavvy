'use client'

import { useQRCode } from "next-qrcode";

const UserQR = ({ userId }) => {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={userId.toString()}
    />
  )
}

export default UserQR