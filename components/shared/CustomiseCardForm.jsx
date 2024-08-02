'use client'

import { useState } from "react";
import { PresetPicker } from "../customiseCard";

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
        {/* preset picker */}
        <PresetPicker formData={formData} setFormData={setFormData} />
      </div>

      {/* preview */}
      <div className="flex-1 border relative">
        hi
      </div>
    </div>
  )
}

export default CustomiseCardForm