import React from 'react';
import { PhoneOff, MessageCircleQuestion, Clock, CalendarX, MousePointer, Headphones } from 'lucide-react';

const PROBLEMS = [
  {
    icon: PhoneOff,
    title: 'Missed Calls',
    description: 'Turn unanswered calls into conversations.',
    stat: '67% of calls go to voicemail',
    color: '#EF4444'
  },
  {
    icon: MessageCircleQuestion,
    title: 'Repetitive Questions',
    description: 'Let AI handle FAQs while your team focuses on important work.',
    stat: '80% of support is repetitive',
    color: '#F59E0B'
  },
  {
    icon: Clock,
    title: 'Slow Lead Response',
    description: 'Respond instantly instead of making prospects wait.',
    stat: '78% expect instant replies',
    color: '#EC4899'
  },
  {
    icon: CalendarX,
    title: 'Manual Booking',
    description: 'Let AI schedule meetings automatically.',
    stat: '5-10 min per booking',
    color: '#A78BFA'
  },
  {
    icon: MousePointer,
    title: 'Website Leads',
    description: 'Turn passive website visitors into qualified conversations.',
    stat: '98% bounce without engaging',
    color: '#38BDF8'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Handle repetitive support requests 24/7.',
    stat: 'Average wait time: 8 min',
    color: '#10B981'
  }
];

const BusinessProblems = () => {
  return (
    <section style={{
      padding: '90px 0',
      background: '#FFFFFF',
      position: 'relative',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container">
        
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '720px', margin: '0 auto 40px' }}>
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
            Automated Problem Solving
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
            Critical Bottlenecks ServiceTackle AI Solves
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#64748B'
          }}>
            Everyday operational leaks automated end-to-end without adding payroll or manual overhead.
          </p>
        </div>

        {/* Problems grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {PROBLEMS.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px',
                  boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(37, 99, 235, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.04)';
                }}
              >
                {/* Top row: icon + title */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '10px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={20} color="#2563EB" />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '16.5px',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '4px',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {problem.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.55',
                      color: '#64748B',
                      margin: 0
                    }}>
                      {problem.description}
                    </p>
                  </div>
                </div>

                {/* Stat badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 11px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#475569',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '14px'
                }}>
                  {problem.stat}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BusinessProblems;
