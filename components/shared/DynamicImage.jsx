'use client'

import { useState } from 'react';
import IconSelector from './IconSelector';

export default function DynamicImage() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  const generateCard = async () => {
    if (!selectedIcon) {
      alert('Please select an icon first.');
      return;
    }

    const purchases = 5; // Example number of purchases

    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ purchases, icon: selectedIcon.displayName })
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    } else {
      console.error('Failed to generate image');
    }
  };

  return (
    <div>
      <IconSelector onSelect={(Icon) => setSelectedIcon(Icon)} />
      <button onClick={generateCard}>Generate Loyalty Card</button>
      {imageSrc && <img src={imageSrc} alt="Loyalty Card" />}
    </div>
  );
}
