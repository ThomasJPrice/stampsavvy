'use client'

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Formik } from 'formik'
import { BrandingOptions, CardPreview, LoyaltyCardOptions, PresetPicker } from '../customiseCard'
import toast from 'react-hot-toast'

const CustomiseCardForm = ({ cardInfo, onSave, businessData }) => {
  const onSubmit = (data) => {
    console.log(data)
    toast.success('Saved!')
  };

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
          fgColour: cardInfo.fgColour || '#ffffff',
          bgColour: cardInfo.bgColour || '#5c3e32',
        }
      }
      onSubmit={onSubmit}>
      {({
        values,
        handleChange,
        handleSubmit,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit} className='w-full flex flex-row gap-16'>
          {/* form */}
          <div className="w-1/3" onSubmit={handleSubmit}>
            {/* branding */}
            <div>
              <h4 className="font-medium text-lg">Your Branding</h4>
              <BrandingOptions />
            </div>

            {/* card */}
            <div className="mt-4">
              <h4 className="font-medium text-lg">Your Loyalty Card</h4>
              {/* preset picker */}
              <PresetPicker setFieldValue={setFieldValue} />

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
            <CardPreview values={values} name={businessData.name} />
          </div>


        </form>
      )}
    </Formik>
  )
}

export default CustomiseCardForm
