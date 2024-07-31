import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';
import { renderIconToPng } from '../../../utils/renderIconToPng';

export async function POST(req) {
  try {
    const { purchases, icon } = await req.json();

    const iconPngBuffer = await renderIconToPng(icon);

    const width = 500;
    const height = 300;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Define some properties
    const iconSize = 50;
    const gap = 20;
    const iconsCount = 10; // Total number of icons on the card

    // Load PNG as an image
    const img = await loadImage(iconPngBuffer);

    for (let i = 0; i < iconsCount; i++) {
      const x = (iconSize + gap) * (i % 5);
      const y = Math.floor(i / 5) * (iconSize + gap);

      if (i < purchases) {
        // Colour the icon background
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, iconSize, iconSize);
      }

      // Draw the icon
      ctx.drawImage(img, x, y, iconSize, iconSize);
    }

    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/png');

    // Use sharp for additional processing (optional)
    const imageBuffer = await sharp(buffer).toBuffer();

    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename=loyalty-card.png'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response('Error generating image', { status: 500 });
  }
}
