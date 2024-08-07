import { invertColor } from "@/lib/utils"
import { useEffect, useState } from "react";

const CardPreview = ({ values, name }) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const textColour = `text-[${invertColor(values.bgColour, true).toLowerCase()}]`

  useEffect(() => {
    if (values.logo && values.logo.length > 0 && values.logo[0] instanceof File) {
      const file = values.logo[0];
      const url = URL.createObjectURL(file);
      setLogoUrl(url);

      // Cleanup the URL object when the component unmounts or when the file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoUrl(null);
    }
  }, [values.logo]);
  
  
  return (
    <div className="max-w-[380px] w-full aspect-[0.644] lg:fixed">
      <div className="w-full h-full flex flex-col overflow-hidden rounded-[32px]" style={{ backgroundColor: values.bgColour }}>
        {/* top section */}
        <div className="mx-4 mt-4">
          <div className="flex items-center flex-row">
            {/* logo */}
            <div className="h-8 mr-4">
              {values.logo.length > 0 ? <img src={logoUrl} alt="" className="w-8 h-8 rounded-full bg-white" /> : <div className="w-8 h-8 rounded-full bg-white"></div>}
            </div>

            {/* text */}
            <div className={`${textColour} text-[1rem] leading-[1.5rem] font-[500]`}>
              {name}
            </div>
          </div>

          <div className="mt-6">
            <div className={`${textColour} text-[2rem] leading-[2.5rem]`}>{values.campaign_name}</div>
          </div>
        </div>

        {/* break */}
        <div className="h-4"></div>

        {/* values */}
        <div className="mx-4 flex flex-row justify-between">
          {/* unit */}
          <div className="inline-flex items-start min-w-[85px] overflow-hidden flex-col">
            <div className={`${textColour} text-left text-[0.875rem] leading-[1.25rem]`}>
              {values.unit}
            </div>
            <div className={`${textColour} text-left text-[1rem] leading-[1.5rem] font-[500]`}>
              0
            </div>
          </div>

          {/* reward */}
          <div className="inline-flex items-end min-w-[85px] overflow-hidden flex-col">
            <div className={`${textColour} text-right text-[0.875rem] leading-[1.25rem]`}>
              Reward
            </div>
            <div className={`${textColour} text-right text-[1rem] leading-[1.5rem] font-[500]`}>
              0/{values.qty} until a {values.reward}!
            </div>
          </div>
        </div>

        {/* break */}
        <div className="h-4"></div>

        {/* qr code */}
        <div className="mx-4 flex flex-row justify-between">
          <div className="items-center inline-flex flex-col min-w-[85px] overflow-hidden flex-auto">
            <div className="flex items-center flex-col my-3 qr-code--width">
              {/* actual code */}
              <div className="bg-white rounded-[16px] inline-flex">
                <div className="h-[150px] w-[150px] m-4 qr-code--width flex items-center justify-center">
                  QR Code
                </div>
              </div>

              {/* text */}
              <div className={`${textColour} leading-[1.5rem] text-[1rem] tracking-[0.00625em] mt-2 text-center`}>
                12345678
              </div>
            </div>
          </div> 
        </div>

        {/* stamp image */}
        <div>
          <div>
            <img src={`${process.env.NEXT_PUBLIC_ORIGIN}/api/generate-image/test?qty=${values.qty}&bgColour=${values.bgColour.replace('#', '')}&fgColour=${values.fgColour.replace('#', '')}`} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPreview