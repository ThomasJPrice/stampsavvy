'use client'

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Formik } from 'formik'
import { BrandingOptions, LoyaltyCardOptions } from '../customiseCard'

const CustomiseCardForm = ({ cardInfo, onSave }) => {
  const onSubmit = (data) => console.log(formState);

  return (
    <Formik
      initialValues={
        {
          campaign_name: cardInfo.campaign_name || '',
          unit: cardInfo.unit || '',
          qty: parseInt(cardInfo.qty) || 0,
          reward: cardInfo.reward || '',
          logo: cardInfo.logo || '',
          icon: cardInfo.icon || '',
          fgColour: cardInfo.fgColour || '',
          bgColour: cardInfo.bgColour || ''
        }
      }
      onSubmit={(values) => console.log(values)}>
      {({
        values,
        handleChange,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit} className='w-full flex flex-row gap-16'>
          {/* form */}
          <div className="w-1/3" onSubmit={handleSubmit}>
            {/* branding */}
            <div>
              <h4 className="font-medium text-lg">Your Branding</h4>
              <BrandingOptions values={values} handleChange={handleChange} />
            </div>

            {/* card */}
            <div className="mt-4">
              <h4 className="font-medium text-lg">Your Loyalty Card</h4>
              {/* preset picker */}
              {/* <PresetPicker formData={formData} setFormData={setFormData} /> */}

              <div className="py-4 flex w-full items-center">
                <div className="flex-1 h-[2px] bg-primary"></div>
                <p className="px-4">Or</p>
                <div className="flex-1 h-[2px] bg-primary"></div>
              </div>

              <div>
                <h3>Create your own:</h3>
                <LoyaltyCardOptions values={values} handleChange={handleChange} />
              </div>
            </div>

            {/* use pending with button */}
            <Button type="submit" className='mt-4'>Save</Button>
          </div>

          {/* preview */}
          <div className="flex-1 border relative">
            hi
          </div>


        </form>
      )}
    </Formik>
  )
}

export default CustomiseCardForm

// 'use client';

// import { useState } from "react";
// import { BrandingOptions, FileUpload, LoyaltyCardOptions, PresetPicker } from "../customiseCard";
// import { Button } from "../ui/button";

// const CustomiseCardForm = ({ cardInfo, onSave }) => {
//   const [formData, setFormData] = useState({
//     campaign_name: cardInfo.campaign_name || '',
//     unit: cardInfo.unit || '',
//     qty: parseInt(cardInfo.qty) || 0,
//     reward: cardInfo.reward || '',
//     logo: cardInfo.logo || '',
//     icon: cardInfo.icon || '',
//     fgColour: cardInfo.fgColour || '',
//     bgColour: cardInfo.bgColour || ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSave(formData);
//   };

//   return (
//     <div className="w-full flex flex-row gap-16">
//       {/* form */}
//       <div className="w-1/3" onSubmit={handleSubmit}>
//         {/* branding */}
//         <div>
//           <h4 className="font-medium text-lg">Your Branding</h4>
//           <BrandingOptions formData={formData} setFormData={setFormData} />
//         </div>

//         {/* card */}
//         <div className="mt-4">
//           <h4 className="font-medium text-lg">Your Loyalty Card</h4>
//           {/* preset picker */}
//           <PresetPicker formData={formData} setFormData={setFormData} />

//           <div className="py-4 flex w-full items-center">
//             <div className="flex-1 h-[2px] bg-primary"></div>
//             <p className="px-4">Or</p>
//             <div className="flex-1 h-[2px] bg-primary"></div>
//           </div>

//           <div>
//             <h3>Create your own:</h3>
//             <LoyaltyCardOptions formData={formData} setFormData={setFormData} />
//           </div>
//         </div>

//         {/* use pending with button */}
//         <Button type="submit">Save</Button>
//       </div>

//       {/* preview */}
//       <div className="flex-1 border relative">
//         hi
//       </div>
//     </div>
//   );
// };

// export default CustomiseCardForm;
