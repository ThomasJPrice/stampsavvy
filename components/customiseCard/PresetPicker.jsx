'use client'

import { Button } from "../ui/button"

import Bean from '@/assets/icons/bean.svg';
import Scissors from '@/assets/icons/scissors.svg';
import Car from '@/assets/icons/car.svg';

const presets = [
  {
    name: 'Coffee Shop',
    icon: Bean,
    formData: {
      campaign_name: 'Buy 9 Coffees, Get 1 Free!',
      unit: 'Beans',
      qty: 9,
      reward: 'Free Coffee',
      icon: Bean,
    }
  },
  {
    name: 'Hairdresser',
    icon: Scissors,
    formData: {
      campaign_name: 'Have 4 Cuts, Get the 5th Free!',
      unit: 'Cuts',
      qty: 4,
      reward: 'Free Haircut',
      icon: Scissors,
    }
  },
  {
    name: 'Car Wash',
    icon: Car,
    formData: {
      campaign_name: 'Have 4 Washes, Get the 5th Half Price!',
      unit: 'Washes',
      qty: 4,
      reward: '50% Off Wash',
      icon: Car,
    }
  },
]

const PresetPicker = ({ setFieldValue }) => {
  const handlePresetClick = (presetFormData) => {
    for (const key in presetFormData) {
      setFieldValue(key, presetFormData[key]);
    }
  };

  return (
    <div>
      <h3>Choose a preset:</h3>

      <div className="flex gap-2 mt-3 flex-wrap">
        {presets.map((item, index) => (
          <button type='button' className='flex-1 inline-flex whitespace-nowrap flex-col items-center gap-1 border rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground py-1 px-2' key={item+index} onClick={() => handlePresetClick(item.formData)}>
            <span><item.icon className='w-8 h-8' /></span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PresetPicker