import React from 'react';
import NewPricing from '../components/sections/NewPricing';
import NewFAQ from '../components/sections/NewFAQ';
import FinalCTA from '../components/sections/FinalCTA';

const NewPricingPage = () => {
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
              Transparent Investment
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
              Simple, ROI-Driven Pricing
            </h1>
            <p style={{
              fontSize: '15.5px',
              lineHeight: '1.6',
              color: '#64748B',
              maxWidth: '620px',
              margin: '0 auto'
            }}>
              Tailored packages based on your exact call volume, workflows, and CRM connections. No long-term lock-in.
            </p>
          </div>
        </div>
      </section>

      <NewPricing />
      <NewFAQ />
      <FinalCTA />
    </>
  );
};

export default NewPricingPage;
