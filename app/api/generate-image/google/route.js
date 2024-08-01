import { ImageResponse } from "@vercel/og";
import { Coffee } from "lucide-react";

export async function GET() {
  const BGCOLOUR = '#5C3E32';
  const QTY = 4 + 1; // Buy 4 get 1 free, total of 5 icons
  const POINTS = 4; // Number of points achieved
  const ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZmZlZSI+PHBhdGggZD0iTTEwIDJ2MiIvPjxwYXRoIGQ9Ik0xNCAydjIiLz48cGF0aCBkPSJNMTYgOGExIDEgMCAwIDEgMSAxdjhhNCA0IDAgMCAxLTQgNEg3YTQgNCAwIDAgMS00LTRWOWExIDEgMCAwIDEgMS0xaDE0YTQgNCAwIDEgMSAwIDhoLTEiLz48cGF0aCBkPSJNNiAydjIiLz48L3N2Zz4=';

  const renderIcons = (start, end) => {
    return Array.from({ length: end - start }).map((_, index) => {
      const isAchieved = index + start < POINTS;
      const isLast = index + start === QTY - 1;
      const lastAchieved = POINTS === QTY - 1;

      // Calculate styles
      const color = isAchieved || (isLast && lastAchieved) ? '#ff9900' : '#cccccc';
      const bgColor = isLast ? 'bg-[#77dd77]' : 'bg-transparent';
      const borderColor = isAchieved || (isLast && lastAchieved) ? (isLast ? '#77dd77' : '#ff9900') : '#cccccc';
      const iconColor = isAchieved || (isLast && lastAchieved) ? (isLast ? '#77dd77' : '#ff9900') : '#cccccc';

      return (
        <div
          key={index}
          tw={`flex items-center justify-center rounded-full border h-full aspect-[1] ${bgColor} ${QTY <= 5 ? 'my-auto p-6' : 'h-full p-3'}`}
          style={{
            borderColor: borderColor,
          }}
        >
          <img
            src={ICON}
            alt="icon"
            style={{
              width: '100%',
              height: '100%',
              padding: QTY <= 6 ? '0' : '8px',
            }}
          />
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
    }
  );
}
