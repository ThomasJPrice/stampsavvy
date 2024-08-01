import { Coffee } from "lucide-react";

export default function DynamicImage() {
  const BGCOLOUR = 'bg-[#5C3E32]';
  const QTY = 4 + 1; // Buy 4 get 1 free, total of 5 icons
  const POINTS = 1; // Number of points achieved
  const ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZmZlZSI+PHBhdGggZD0iTTEwIDJ2MiIvPjxwYXRoIGQ9Ik0xNCAydjIiLz48cGF0aCBkPSJNMTYgOGExIDEgMCAwIDEgMSAxdjhhNCA0IDAgMCAxLTQgNEg3YTQgNCAwIDAgMS00LTRWOWExIDEgMCAwIDEgMS0xaDE0YTQgNCAwIDEgMSAwIDhoLTEiLz48cGF0aCBkPSJNNiAydjIiLz48L3N2Zz4=';

  const renderIcons = (start, end) => {
    return Array.from({ length: end - start }).map((_, index) => {
      const isAchieved = index + start < POINTS;
      const isLast = index + start === QTY - 1;
      const lastAchieved = POINTS === QTY - 1;
      const color = isAchieved || (isLast && lastAchieved) ? '#ff9900' : '#cccccc';
      const bgColor = isLast ? 'bg-[#77dd77] bg-opacity-30' : 'bg-transparent';
      const borderColor = isAchieved || (isLast && lastAchieved) ? (isLast ? '#77dd77' : '#ff9900') : '#cccccc';
      const iconColor = isAchieved || (isLast && lastAchieved) ? (isLast ? '#77dd77' : '#ff9900') : '#cccccc';

      return (
        <div
          key={index}
          className={`${QTY <= 5 ? 'w-full my-auto p-6' : 'h-full p-3'} ${bgColor} border rounded-full flex flex-row flex-nowrap items-stretch content-center justify-center`}
          style={{ borderColor: borderColor }}
        >
          {/* <ICON.type color={iconColor} className={`w-full h-full ${QTY <= 5 ? '' : 'p-2'}`} /> */}
          <img src={ICON} className={`h-full w-full ${QTY <= 5 ? '' : 'p-2'}`} />
        </div>
      );
    });
  };

  const halfQty = Math.ceil(QTY / 2);

  return (
    <div className={`w-[1032px] h-[336px] ${BGCOLOUR} px-16 py-8 flex gap-4 flex-col justify-between`}>
      {QTY <= 5 ? (
        <div className="flex justify-center gap-4 h-full">
          {renderIcons(0, QTY)}
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-4 h-full">
            {renderIcons(0, halfQty)}
          </div>
          <div className="flex justify-center gap-4 h-full">
            {renderIcons(halfQty, QTY)}
          </div>
        </>
      )}
    </div>
  );
}
