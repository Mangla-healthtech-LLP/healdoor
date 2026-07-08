import React from 'react'
import Image from 'next/image'
import logoSrc from './assets/logo.png'

export const Logo: React.FC<{ className?: string, width?: number, height?: number, priority?: boolean }> = ({ 
  className, 
  width = 240, 
  height = 80,
  priority = false
}) => {
  return (
    <Image 
      src={logoSrc} 
      alt="Healdoor Logo" 
      width={width} 
      height={height} 
      className={className}
      style={{ objectFit: 'contain' }}
      priority={priority}
    />
  )
}
