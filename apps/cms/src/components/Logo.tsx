import React from 'react'
import { Logo as SharedLogo } from '@healdoor/ui'

export const Logo: React.FC = () => {
  return (
    <div className="logo-container" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
      <SharedLogo width={150} height={50} />
    </div>
  )
}

export default Logo
