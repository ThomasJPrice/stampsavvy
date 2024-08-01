import { icons } from "@/utils/constants";
import { ImageResponse } from "@vercel/og";

import Bean from '@/assets/icons/bean.svg'

export async function GET() {
  const BGCOLOUR = '#5C3E32';
  const QTY = 9 + 1; // Buy 4 get 1 free, total of 5 icons
  const POINTS = 2; // Number of points achieved
  const ICON = icons.coffeeCup;

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

      const width = (904 - (16 * (QTY - 1))) / QTY
      const largeWidth = (904 - (16 * ((QTY / 2) - 1))) / (QTY / 2)

      return (
        <div
          key={index}
          tw={`flex justify-center rounded-full border ${bgColor} ${QTY <= 5 ? 'my-auto p-6' : 'p-3'}`}
          style={{
            borderColor: borderColor,
            width: `${largeWidth}px`,
            height: `${largeWidth}px`,
            color: iconColor
          }}
        >
          {/* <Coffee
            // src={ICON}
            alt="icon"
            style={{
              width: '100%',
              height: '100%',
              padding: QTY <= 6 ? '0' : '8px',
            }}
          /> */}
          <Bean tw={`w-full h-full flex ${QTY <= 5 ? '' : 'p-2'}`} />
        </div>
      );
    });
  };

  const halfQty = Math.ceil(QTY / 2);

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col justify-between px-16 py-8" style={{ backgroundColor: BGCOLOUR }}>
        {QTY <= 5 ? (
          <div tw="flex justify-center gap-4 h-full" style={{ gap: '16px' }}>
            {renderIcons(0, QTY)}
          </div>
        ) : (
          <>
            <div tw="flex justify-center gap-4 h-full">
              {renderIcons(0, halfQty)}
            </div>
            <div tw="flex justify-center gap-4 h-full">
              {renderIcons(halfQty, QTY)}
            </div>
          </>
        )}
      </div>
    ),
    {
      width: 1032,
      height: 336,
      status: 200,
      statusText: "Ok",
      emoji: 'openmoji'
    }
  );
}
