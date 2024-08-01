import { createCanvas, loadImage } from 'canvas';
import { Coffee } from 'lucide-react'; // Use this import if you're using @lucide-icons/react
import { parse } from 'svgpath';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const QTY = parseInt(searchParams.get('qty') || '5');
  const POINTS = parseInt(searchParams.get('points') || '1');
  const BGCOLOUR = searchParams.get('bgColor') || '#5C3E32';
  const ICON_TYPE = searchParams.get('icon') || 'Coffee';

  const width = 1125;
  const height = 432;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Set background color
  ctx.fillStyle = BGCOLOUR;
  ctx.fillRect(0, 0, width, height);

  // SVG Path data for the Coffee icon
  const coffeeIconPath = Coffee; // Replace this with actual path data if needed

  // Function to draw SVG path
  const drawIcon = (x, y, size, color) => {
    ctx.fillStyle = color;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 24, size / 24); // Assuming original SVG size is 24x24
    ctx.beginPath();
    parse(coffeeIconPath).toPathData(ctx);
    ctx.fill();
    ctx.restore();
  };

  const renderIcons = (start, end) => {
    for (let i = start; i < end; i++) {
      const isAchieved = i < POINTS;
      const isLast = i === QTY - 1;
      const lastAchieved = POINTS === QTY - 1;
      const color = isAchieved || (isLast && lastAchieved) ? '#ff9900' : '#cccccc';
      const bgColor = isLast ? '#77dd77' : 'transparent';
      const borderColor = isAchieved || (isLast && lastAchieved) ? (isLast ? '#77dd77' : '#ff9900') : '#cccccc';

      const x = (width / QTY) * i + 10;
      const y = height / 2 - 20;
      const size = 40; // Icon size

      // Draw the icon
      ctx.beginPath();
      ctx.arc(x + 20, y + 20, 20, 0, 2 * Math.PI, false);
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = borderColor;
      ctx.stroke();

      drawIcon(x + 20 - size / 2, y + 20 - size / 2, size, color);
    }
  };

  const halfQty = Math.ceil(QTY / 2);

  if (QTY <= 5) {
    renderIcons(0, QTY);
  } else {
    renderIcons(0, halfQty);
    renderIcons(halfQty, QTY);
  }

  const buffer = canvas.toBuffer('image/png');

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
