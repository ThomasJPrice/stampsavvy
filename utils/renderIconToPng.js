import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';
import { FaStar, FaHeart, FaCoffee, FaAppleAlt, FaCheckCircle } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';

const icons = {
  FaStar,
  FaHeart,
  FaCoffee,
  FaAppleAlt,
  FaCheckCircle,
};

export async function renderIconToPng(iconName) {
  if (!icons[iconName]) {
    throw new Error('Invalid icon');
  }

  const IconComponent = icons[iconName];
  const svgString = renderToStaticMarkup(<IconComponent size={50} />);
  const svgBuffer = Buffer.from(svgString);
  const pngBuffer = await sharp(svgBuffer).png().toBuffer();
  return pngBuffer;
}
