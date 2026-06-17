import React from 'react'
import Image from 'next/image'

export const Logo: React.FC = () => {
  return (
    <div className="logo-container" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
      <Image
        src="/logo_white_bg.svg"
        alt="HealDoor Logo"
        width={150}
        height={50}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default Logo
