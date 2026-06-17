import React from 'react'
import Image from 'next/image'

export const Icon: React.FC = () => {
  return (
    <div className="icon-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
      <Image
        src="/logo_white_bg.svg"
        alt="HealDoor Icon"
        width={32}
        height={32}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default Icon
