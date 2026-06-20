import React from 'react'
import Image from 'next/image'

export const Icon: React.FC = () => {
  return (
    <div className="icon-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <Image
        src="/icon.svg"
        alt="HealDoor Icon"
        width={64}
        height={64}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default Icon
