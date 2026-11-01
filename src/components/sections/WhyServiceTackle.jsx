import React from 'react';
import { Wrench, Link2, Zap, Users } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: Wrench,
    title: 'Custom',
    description: 'Built around your actual workflow.',
    color: '#38BDF8'
  },
  {
    icon: Link2,
    title: 'Connected',
    description: 'Works with the tools you already use.',
    color: '#10B981'
  },
  {
    icon: Zap,
    title: 'Action-Oriented',
    description: 'The agent can take actions, not just answer questions.',
    color: '#F59E0B'
  },
  {
    icon: Users,
    title: 'Human Control',
    description: 'Escalate to a human whenever necessary.',
    color: '#A78BFA'
  }
];

const WhyServiceTackle = () => {
  return (
    <section style={{
      padding: '90px 0',
      background: '#F8FAFC',
      position: 'relative',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container">
        
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px' }}>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 42px)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '14px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.03em',
            color: '#0F172A'
          }}>
            Why ServiceTackle
          </h2>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.6',
            color: '#64748B',
            fontWeight: 400
          }}>
            Built around your actual business operations, not a generic chatbot.
          </p>
        </div>

        {/* Principles grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
        className="why-servicetackle-grid">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <div
                key={idx}
                style={{
                  textAlign: 'center',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px -4px rgba(37, 99, 235, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.04)';
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 20px',
                  borderRadius: '14px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={28} color="#2563EB" />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {principle.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#64748B'
                }}>
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyServiceTackle;
