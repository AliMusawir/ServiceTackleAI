import React from 'react';
import VoiceAgentShowcase from '../components/sections/VoiceAgentShowcase';
import WebAgentShowcase from '../components/sections/WebAgentShowcase';
import SupportingTechnology from '../components/sections/SupportingTechnology';
import FinalCTA from '../components/sections/FinalCTA';

const ProductsPage = () => {
  return (
    <>
      {/* Page Hero */}
      <section style={{
        position: 'relative',
        paddingTop: '130px',
        paddingBottom: '70px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#2563EB',
              marginBottom: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Core Product Suite
            </div>
            <h1 style={{
              fontSize: 'clamp(26px, 3.4vw, 36px)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '14px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.025em',
              color: '#0F172A'
            }}>
              Autonomous AI Agent Products
            </h1>
            <p style={{
              fontSize: '15.5px',
              lineHeight: '1.6',
              color: '#64748B',
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              AI agents that don't just chat — they connect directly to your phone lines, websites, calendars, and CRM to execute real operations.
            </p>
          </div>
        </div>
      </section>

      <VoiceAgentShowcase />
      <WebAgentShowcase />
      <SupportingTechnology />
      <FinalCTA />
    </>
  );
};

export default ProductsPage;
