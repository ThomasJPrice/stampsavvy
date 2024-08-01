import { ImageResponse } from "@vercel/og";
import Bean from '@/assets/icons/bean.svg';

export async function GET() {
  const BGCOLOUR = '#5C3E32';
  const QTY = 4 + 1; // Buy 4 get 1 free, total of 10 icons
  const POINTS = 0; // Number of points achieved

  const renderIcons = (start, end) => {
    return Array.from({ length: end - start }).map((_, index) => {
      const isAchieved = index + start < POINTS;
      const isLast = index + start === QTY - 1;
      const lastAchieved = POINTS === QTY - 1;

      // Calculate styles
      const color = isAchieved || (isLast && lastAchieved) ? '#ff9900' : '#cccccc';
      const bgColor = isLast ? 'bg-[#77dd77] bg-opacity-30' : 'bg-transparent';
      const borderColor = isAchieved || (isLast && lastAchieved) ? (isLast ? '#77dd77' : '#ff9900') : '#cccccc';
      const iconColor = isAchieved || (isLast && lastAchieved) ? (isLast ? '#77dd77' : '#ff9900') : '#cccccc';

      const width = (904 - (16 * (QTY - 1))) / QTY;
      const height = (256 / 2)

      return (
        <div
          key={index}
          tw={`flex justify-center rounded-full border ${bgColor} ${QTY <= 5 ? 'my-auto p-6' : 'p-3'}`}
          style={{
            borderColor: borderColor,
            width: QTY <= 5 ? `${width}px` : `${height}px`,
            height: QTY <= 5 ? `${width}px` : `${height}px`,
            color: iconColor
          }}
        >
          <Bean tw={`w-full h-full ${QTY <= 5 ? '' : 'p-2'}`} fill={iconColor} />
        </div>
      );
    });
  };

  const halfQty = Math.ceil(QTY / 2);

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col justify-between px-16 py-8" style={{ backgroundColor: BGCOLOUR }}>
        {QTY <= 5 ? (
          <div tw="flex justify-center gap-4 my-auto" style={{ gap: '16px' }}>
            {renderIcons(0, QTY)}
          </div>
        ) : (
          <div tw="w-full h-full flex flex-col justify-between" style={{ gap: '16px'}}>
            <div tw="flex justify-center gap-4" style={{ gap: '16px' }}>
              {renderIcons(0, halfQty)}
            </div>
            <div tw="flex justify-center gap-4" style={{ gap: '16px' }}>
              {renderIcons(halfQty, QTY)}
            </div>
          </div>
        )}
      </div>
    ),
    {
      width: 1032,
      height: 336,
      status: 200,
      statusText: "Ok",
    }
  );
}
