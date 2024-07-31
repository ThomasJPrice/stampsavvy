'use client'

import { useState } from 'react';
import { FaStar, FaHeart, FaCoffee, FaAppleAlt, FaCheckCircle } from 'react-icons/fa';

const icons = [FaStar, FaHeart, FaCoffee, FaAppleAlt, FaCheckCircle];

export default function IconSelector({ onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {icons.map((Icon, index) => (
        <Icon key={index} size={50} onClick={() => onSelect(Icon)} style={{ cursor: 'pointer' }} />
      ))}
    </div>
  );
}
