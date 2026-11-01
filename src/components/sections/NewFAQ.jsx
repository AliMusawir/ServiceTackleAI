import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How does the 24/7 AI Voice Receptionist handle inbound calls?',
    answer: 'The AI answers incoming phone calls in under 2 seconds, speaks naturally with human-like latency, answers questions about your services, collects caller details, and books appointments into your calendar.'
  },
  {
    question: 'Can the AI schedule appointments and sync directly with our CRM?',
    answer: 'Yes. ServiceTackle integrates seamlessly with Google Calendar, Outlook, ServiceTitan, Jobber, HubSpot, Salesforce, and custom CRM systems via API or webhook.'
  },
  {
    question: 'What happens if a caller asks a complex question or asks for a human?',
    answer: 'The AI intelligently recognizes when a live team member is required and can live-transfer the call to your mobile/office or send an urgent SMS notification with full conversation transcripts.'
  },
  {
    question: 'How fast can we set up our AI Agent and go live?',
    answer: 'Most AI phone and web agents are fully configured, trained on your custom knowledge base, and live within 48 to 72 hours with zero hardware required.'
  },
  {
    question: 'How does custom pricing work?',
    answer: 'Our pricing is customized based on your monthly call volume, integration complexity, and custom workflows. Click "Get a Custom Quote" on any tier for a personalized plan.'
  }
];

const NewFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section style={{
      padding: '90px 0',
      background: '#FFFFFF',
      position: 'relative',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container">
        
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '680px', margin: '0 auto 40px' }}>
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
            Got Questions?
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
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.6' }}>
            Everything you need to know about setting up and deploying your AI agents.
          </p>
        </div>

        {/* FAQ accordion */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto'
        }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? '#F8FAFC' : '#FFFFFF',
                  border: `1px solid ${isOpen ? '#BFDBFE' : '#E2E8F0'}`,
                  borderRadius: '12px',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  boxShadow: isOpen ? '0 4px 16px rgba(37, 99, 235, 0.06)' : '0 1px 3px rgba(15, 23, 42, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                  }
                }}
                onMouseLeave={e => {
                  if (!isOpen) {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }
                }}
              >
                {/* Question button */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '18px 20px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{
                    fontSize: '15.5px',
                    fontWeight: 700,
                    color: '#0F172A',
                    lineHeight: '1.4'
                  }}>
                    {item.question}
                  </span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isOpen ? '#EFF6FF' : '#F1F5F9',
                    border: `1px solid ${isOpen ? '#BFDBFE' : '#E2E8F0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    <ChevronDown
                      size={18}
                      color={isOpen ? '#2563EB' : '#64748B'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </div>
                </button>

                {/* Answer */}
                <div style={{
                  maxHeight: isOpen ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}>
                  <div style={{
                    padding: '0 24px 22px',
                    fontSize: '15px',
                    lineHeight: '1.65',
                    color: '#475569'
                  }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default NewFAQ;
