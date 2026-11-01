import React from 'react';
import AgentCapabilities from '../components/sections/AgentCapabilities';
import BusinessProblems from '../components/sections/BusinessProblems';
import WhyServiceTackle from '../components/sections/WhyServiceTackle';
import FinalCTA from '../components/sections/FinalCTA';

const SolutionsPage = () => {
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
              Enterprise AI Solutions
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
              Autonomous AI Agent Solutions
            </h1>
            <p style={{
              fontSize: '15.5px',
              lineHeight: '1.6',
              color: '#64748B',
              maxWidth: '620px',
              margin: '0 auto'
            }}>
              Discover how ServiceTackle AI agents eliminate manual intake, automate scheduling, and streamline full business operations.
            </p>
          </div>
        </div>
      </section>

      <AgentCapabilities />
      <BusinessProblems />
      <WhyServiceTackle />
      <FinalCTA />
    </>
  );
};

export default SolutionsPage;
