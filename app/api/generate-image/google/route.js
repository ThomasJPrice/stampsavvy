import { ImageResponse } from "@vercel/og";
import Bean from '@/assets/icons/bean.svg';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let cardId;

  try {
    cardId = request.nextUrl.searchParams.get('id')
  } catch (error) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (!cardId) return NextResponse.json({ error: 'No id found' }, { status: 400 })

  const { userData, cardData } = await getData(supabase, cardId)

  if (!userData || !cardData) return NextResponse.json({ error: 'No loyalty card details found' }, { status: 400 })

  const BGCOLOUR = cardData.bgColour;
  const QTY = parseInt(cardData.qty) + 1; // Buy 4 get 1 free, total of 10 icons
  const POINTS = userData.points; // Number of points achieved

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
