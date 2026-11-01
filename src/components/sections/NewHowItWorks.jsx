import React from 'react';
import { Brain, Wrench, Link2, TestTube, Rocket, TrendingUp } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Brain,
    title: 'Understand Your Business',
    description: 'We learn your services, FAQs, processes and goals.',
    color: '#38BDF8'
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Design Your Agent',
    description: 'We define what the AI should say, ask and do.',
    color: '#10B981'
  },
  {
    number: '03',
    icon: Link2,
    title: 'Connect Your Systems',
    description: 'CRM, calendar, database, APIs, WhatsApp, etc.',
    color: '#F59E0B'
  },
  {
    number: '04',
    icon: TestTube,
    title: 'Test Real Conversations',
    description: 'Test edge cases and human handoffs.',
    color: '#A78BFA'
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Deploy',
    description: 'Launch your AI agent.',
    color: '#EC4899'
  },
  {
    number: '06',
    icon: TrendingUp,
    title: 'Improve',
    description: 'Monitor conversations and continuously improve the system.',
    color: '#34D399'
  }
];

const NewHowItWorks = () => {
  return (
    <section id="how-it-works-section" style={{
      padding: '90px 0',
      background: '#F8FAFC',
      position: 'relative',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container">
        
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '680px', margin: '0 auto 50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '100px',
            padding: '5px 14px',
            fontSize: '11.5px',
            fontWeight: 800,
            color: '#2563EB',
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>
            Simple Deployment
          </div>
          <h2 style={{
            fontSize: 'clamp(22px, 2.6vw, 30px)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.025em',
            color: '#0F172A'
          }}>
            How It Works
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#64748B'
          }}>
            From discovery to custom AI deployment in 6 clear, seamless steps.
          </p>
        </div>

        {/* Timeline */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '27px',
            top: '36px',
            bottom: '36px',
            width: '2px',
            background: '#E2E8F0',
            zIndex: 0
          }} />

          {/* Steps */}
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  display: 'flex',
                  gap: '22px',
                  marginBottom: idx < STEPS.length - 1 ? '30px' : '0',
                  zIndex: 1
                }}
              >
                {/* Left: Number + icon */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  flexShrink: 0
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <Icon size={22} color="#2563EB" />
                  </div>
                </div>

                {/* Right: Content */}
                <div style={{
                  flex: 1,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '18px 22px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
                }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#2563EB',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em'
                  }}>
                    STEP {step.number}
                  </div>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.55',
                    color: '#64748B',
                    margin: 0
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default NewHowItWorks;
