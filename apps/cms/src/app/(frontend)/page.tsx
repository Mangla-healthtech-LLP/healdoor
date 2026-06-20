import { headers as getHeaders } from 'next/headers.js'
import { Logo } from '@healdoor/ui'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home" style={{
      background: '#f8fafc',
      position: 'relative',
      fontFamily: '"Inter", "Outfit", system-ui, sans-serif',
      color: '#334155',
      minHeight: '100vh',
      maxWidth: 'none'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '100%', height: '100%',
        background: 'radial-gradient(circle, rgba(35, 158, 163, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%', width: '100%', height: '100%',
        background: 'radial-gradient(circle, rgba(244, 154, 31, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'
      }} />

      <div className="content" style={{
        zIndex: 1,
        background: '#ffffff',
        border: '1px solid rgba(35, 158, 163, 0.2)',
        borderRadius: '24px',
        padding: '60px 40px',
        boxShadow: '0 20px 40px -10px rgba(35, 158, 163, 0.1)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
          <Logo width={240} height={80} priority />
        </div>
        
        <h1 style={{ color: '#0f172a', fontSize: '38px', marginBottom: '16px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          {user ? `Welcome back, ${user?.email || 'Admin'}` : 'Healdoor Platform'}
        </h1>
        
        <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6', fontWeight: '400' }}>
          Manage your Healdoor project content effortlessly through the secure administration environment.
        </p>

        <style dangerouslySetInnerHTML={{__html: `
          .admin-btn {
            background: #239ea3;
            color: #ffffff;
            border: none;
            padding: 16px 32px;
            border-radius: 14px;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
            box-shadow: 0 4px 14px 0 rgba(35, 158, 163, 0.4);
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .admin-btn:hover {
            background: #1b8084;
            transform: translateY(-2px);
          }
        `}} />
        <div className="links" style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href={payloadConfig.routes.admin}
            className="admin-btn"
          >
            Enter Admin Panel
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      
      <div className="footer" style={{
        zIndex: 1, marginTop: '40px', color: '#64748b', fontSize: '14px',
        background: '#ffffff', padding: '12px 24px', borderRadius: '30px',
        border: '1px solid rgba(244, 154, 31, 0.3)',
        boxShadow: '0 4px 10px rgba(244, 154, 31, 0.05)'
      }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Healdoor. All rights reserved.</p>
      </div>
    </div>
  )
}
