'use client'

import { useState } from "react";
import { BrandingOptions, PresetPicker } from "../customiseCard";

const CustomiseCardForm = ({ cardInfo, handleFormSave }) => {
  const [formData, setFormData] = useState({
    campaign_name: cardInfo.campaign_name || '',
    unit: cardInfo.unit || '',
    qty: parseInt(cardInfo.qty) || 0,
    reward: cardInfo.reward || '',
    logo: cardInfo.logo || '',
    icon: cardInfo.icon || '',
    fgColour: cardInfo.fgColour || '',
    bgColour: cardInfo.bgColour || ''
  })

  console.log(formData);

  return (
    <div className="w-full flex flex-row gap-16">
      {/* form */}
      <div className="w-1/3 border">
        {/* branding */}
        <div>
          <h4 className="font-medium text-lg">Your Branding</h4>

          <BrandingOptions formData={formData} setFormData={setFormData} />
        </div>

        {/* card */}
        <div className="mt-4">
          <h4 className="font-medium text-lg">Your Loyalty Card</h4>
          {/* preset picker */}
          <PresetPicker formData={formData} setFormData={setFormData} />

          <div className="py-4 flex w-full items-center">
            <div className="flex-1 h-[2px] bg-primary"></div>
            <p className="px-4">Or</p>
            <div className="flex-1 h-[2px] bg-primary"></div>
          </div>

          <div>
            <p>Create your own:</p>
          </div>
        </div>
      </div>

      {/* preview */}
      <div className="flex-1 border relative">
        hi
      </div>
    </div>
  )
}

export default CustomiseCardForm