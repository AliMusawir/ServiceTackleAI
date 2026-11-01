import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FinalCTA = () => {
  const { openContact, toggleChat } = useApp();

  return (
    <section style={{
      padding: '90px 0',
      background: '#F8FAFC',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #1D4ED8 100%)',
          borderRadius: '24px',
          padding: '64px 48px',
          textAlign: 'center',
          boxShadow: '0 20px 50px -10px rgba(37, 99, 235, 0.35)',
          color: '#FFFFFF'
        }}>
          
          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(24px, 3.2vw, 34px)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.025em',
            color: '#FFFFFF'
          }}>
            Ready to give your business
            <span style={{
              display: 'block',
              marginTop: '4px',
              color: '#93C5FD'
            }}>
              an autonomous AI agent?
            </span>
          </h2>

          {/* Supporting text */}
          <p style={{
            fontSize: '15.5px',
            lineHeight: '1.6',
            color: '#DBEAFE',
            maxWidth: '640px',
            margin: '0 auto 28px',
            fontWeight: 400
          }}>
            Show us your inbound call intake, web forms, or repetitive customer workflows. We'll show you how an AI agent handles it live.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => openContact('Final CTA')}
              style={{
                fontSize: '14.5px',
                fontWeight: 700,
                padding: '13px 26px',
                borderRadius: '8px',
                background: '#FFFFFF',
                color: '#1E3A8A',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
              }}
            >
              <span>Book an AI Agent Demo</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={toggleChat}
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                padding: '13px 24px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <MessageSquare size={16} />
              <span>Talk to Live AI</span>
            </button>
          </div>

          {/* Bottom Trust Note */}
          <div style={{
            marginTop: '32px',
            fontSize: '13px',
            color: '#BFDBFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#34D399',
              boxShadow: '0 0 6px #34D399'
            }} />
            <span>Fast Setup • Live in 48 hours • No long-term lock-in</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
