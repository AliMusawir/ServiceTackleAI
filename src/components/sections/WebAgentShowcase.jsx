import React from 'react';
import { MessageSquare, CheckCircle2, ArrowRight, HelpCircle, Calendar, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const WebAgentShowcase = () => {
  const { toggleChat, openContact } = useApp();

  const features = [
    { icon: HelpCircle, label: 'Answer visitor questions', color: '#38BDF8' },
    { icon: UserCheck, label: 'Qualify visitors', color: '#10B981' },
    { icon: Calendar, label: 'Book appointments', color: '#F59E0B' },
    { icon: MessageSquare, label: 'Capture leads', color: '#A78BFA' },
    { icon: CheckCircle2, label: 'Recommend services', color: '#EC4899' },
    { icon: ArrowRight, label: 'Hand off to humans', color: '#34D399' }
  ];

  return (
    <section data-web-agent-section style={{
      padding: '90px 0',
      background: '#FFFFFF',
      position: 'relative',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Left: Interactive demo */}
          <div>
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px -4px rgba(15, 23, 42, 0.06)'
            }}>
              {/* Browser bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                </div>
                <div style={{
                  flex: 1,
                  fontSize: '11px',
                  color: '#64748B',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'center'
                }}>
                  yourwebsite.com
                </div>
              </div>

              {/* Mock website with chat widget */}
              <div style={{ padding: '32px', minHeight: '380px', position: 'relative', background: '#FAFAFA' }}>
                {/* Mock content */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    width: '60%',
                    height: '24px',
                    background: '#E2E8F0',
                    borderRadius: '4px',
                    marginBottom: '12px'
                  }} />
                  <div style={{
                    width: '80%',
                    height: '12px',
                    background: '#E2E8F0',
                    borderRadius: '4px',
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    width: '75%',
                    height: '12px',
                    background: '#E2E8F0',
                    borderRadius: '4px',
                    marginBottom: '8px'
                  }} />
                  <div style={{
                    width: '70%',
                    height: '12px',
                    background: '#E2E8F0',
                    borderRadius: '4px'
                  }} />
                </div>

                {/* Prominent chat widget */}
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
                  width: '270px',
                  background: '#FFFFFF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '16px',
                  boxShadow: '0 12px 30px rgba(37, 99, 235, 0.15)',
                  overflow: 'hidden'
                }}>
                  {/* Widget header */}
                  <div style={{
                    padding: '12px 14px',
                    background: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MessageSquare size={15} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#FFFFFF'
                      }}>
                        AI Sales Agent
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.85)'
                      }}>
                        Online • Instant Reply
                      </div>
                    </div>
                  </div>

                  {/* Widget messages */}
                  <div style={{ padding: '14px' }}>
                    <div style={{
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '12px 12px 12px 4px',
                      padding: '10px 12px',
                      fontSize: '12.5px',
                      color: '#1E3A8A',
                      lineHeight: '1.45',
                      marginBottom: '10px'
                    }}>
                      Hi! How can I help you calculate your custom quote or book a visit today?
                    </div>

                    {/* Quick action buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {['Get an instant estimate', 'Book appointment', 'Talk to an advisor'].map((action, idx) => (
                        <button
                          key={idx}
                          onClick={toggleChat}
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            color: '#334155',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#EFF6FF';
                            e.currentTarget.style.borderColor = '#BFDBFE';
                            e.currentTarget.style.color = '#2563EB';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = '#F8FAFC';
                            e.currentTarget.style.borderColor = '#E2E8F0';
                            e.currentTarget.style.color = '#334155';
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Try button below */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={toggleChat}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}
              >
                <MessageSquare size={15} style={{ color: '#2563EB' }} />
                <span>Launch Live Site Chat</span>
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div>
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
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              <MessageSquare size={14} />
              <span>Full Web Conversion</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(24px, 3.2vw, 32px)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '16px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.025em',
              color: '#0F172A'
            }}>
              Engages Visitors &
              <span style={{ display: 'block', color: '#2563EB', marginTop: '3px' }}>Captures High-Value Leads</span>
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#64748B',
              marginBottom: '24px'
            }}>
              Engages every visitor, qualifies budget and intent, creates immediate CRM records, and notifies your team in real time.
            </p>

            {/* Feature grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '32px'
            }}>
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={16} color="#2563EB" />
                    </div>
                    <span style={{
                      fontSize: '13.5px',
                      color: '#334155',
                      fontWeight: 600
                    }}>
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <button
              onClick={() => openContact('Web Agent Section')}
              style={{
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: '10px',
                border: '1px solid #1D4ED8',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
            >
              <span>Build My Web Agent</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WebAgentShowcase;
