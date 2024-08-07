import { ImageResponse } from "@vercel/og";
import Bean from '@/assets/icons/bean.svg';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { invertColor } from "@/lib/utils";

async function getData(supabase, id) {
  const { data: userData } = await supabase.from('loyaltyCards').select().match({ id: id }).single()

  if (!userData) return {}

  const { data: businessData } = await supabase.from('businesses').select().match({ id: userData.business }).single()

  if (!businessData) return {}

  return {
    userData: userData,
    cardData: businessData.cardInfo
  }
}

export async function GET(request) {
  let POINTS = 1;
  let BGCOLOUR;
  let FGCOLOUR
  let QTY = 0

  try {
    QTY = parseInt(request.nextUrl.searchParams.get('qty')) + 1
    BGCOLOUR = request.nextUrl.searchParams.get('bgColour')
    FGCOLOUR = request.nextUrl.searchParams.get('fgColour')
  } catch (error) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  let mainColour = invertColor(`#${BGCOLOUR}`, true)

  const renderIcons = (start, end) => {
    return Array.from({ length: end - start }).map((_, index) => {
      const isAchieved = index + start < POINTS;
      const isLast = index + start === QTY - 1;
      const lastAchieved = POINTS === QTY - 1;

      // Calculate styles
      const bgColor = isLast ? `bg-[#${FGCOLOUR}] bg-opacity-30` : 'bg-transparent';
      const borderStyles = isAchieved || (isLast && lastAchieved) ? `#${FGCOLOUR}` : `${mainColour}`;
      const iconColor = isAchieved || (isLast && lastAchieved) ? `#${FGCOLOUR}` : `${mainColour}`;

      const width = (904 - (16 * (QTY - 1))) / QTY;
      const height = (256 / 2)

      return (
        <div
          key={index}
          tw={`flex justify-center rounded-full border border-[2px] ${bgColor} ${QTY <= 5 ? 'my-auto p-6' : 'p-3'}`}
          style={{
            width: QTY <= 5 ? `${width}px` : `${height}px`,
            height: QTY <= 5 ? `${width}px` : `${height}px`,
            color: iconColor,
            borderColor: borderStyles,
            opacity: isAchieved ? '1' : '0.7'
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
      <div tw="w-full h-full flex flex-col justify-between px-16 py-8" style={{ backgroundColor: `#${BGCOLOUR}` }}>
        {QTY <= 5 ? (
          <div tw="flex justify-center my-auto" style={{ gap: '16px' }}>
            {renderIcons(0, QTY)}
          </div>
        ) : (
          <div tw="w-full h-full flex flex-col justify-between" style={{ gap: '16px' }}>
            <div tw="flex justify-center" style={{ gap: '16px' }}>
              {renderIcons(0, halfQty)}
            </div>
            <div tw="flex justify-center" style={{ gap: '16px' }}>
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
