import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React, { useState } from 'react';

const LoyaltyCardOptions = ({ values, handleChange }) => {
  const inputs = [
    {
      name: 'campaign_name',
      label: 'Campaign Name',
      type: 'text',
      helper: '',
      placeholder: 'Buy X, Get Y',
    },
    {
      name: 'unit',
      label: 'Unit',
      type: 'text',
      helper: '',
      placeholder: 'Beans, Cups, Cuts',
    },
    {
      name: 'reward',
      label: 'Reward',
      type: 'text',
      helper: '',
      placeholder: 'Free Coffee, 50% Off',
    },
    {
      name: 'qty',
      label: 'Quantity',
      type: 'number',
      helper: 'The amount of stamps required for the reward (4-12)',
      placeholder: '',
    },
  ];

  return (
    <div>
      {inputs.map((item, index) => (
        <div className="mt-4" key={item + index}>
          <Label>{item.label}</Label>
          <p className="text-xs text-gray-700">{item.helper}</p>
          <Input
            className="mt-1"
            value={values[item.name]}
            type={item.type}
            placeholder={item.placeholder}
            name={item.name}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};

export default LoyaltyCardOptions;
