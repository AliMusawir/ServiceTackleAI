import React from 'react';
import { Phone, Globe, Mail, FileText, Zap } from 'lucide-react';

// Workflow data with visual emphasis
const WORKFLOWS = [
  {
    trigger: { icon: Phone, text: 'Customer calls', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    process: { text: 'AI answers + qualifies', color: '#2563EB' },
    actions: ['Books appointment', 'Updates CRM', 'Sends confirmation', 'Notifies team'],
    industries: 'HVAC · Dental · Real Estate'
  },
  {
    trigger: { icon: Globe, text: 'Website lead', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    process: { text: 'AI qualifies + analyzes', color: '#2563EB' },
    actions: ['Creates CRM record', 'Emails salesperson', 'Schedules follow-up'],
    industries: 'E-commerce · Services · B2B'
  },
  {
    trigger: { icon: Mail, text: 'Customer email', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    process: { text: 'AI reads + understands', color: '#2563EB' },
    actions: ['Classifies request', 'Updates CRM', 'Sends response', 'Assigns task'],
    industries: 'B2B · Support · Services'
  },
  {
    trigger: { icon: FileText, text: 'Invoice arrives', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    process: { text: 'AI reads + extracts', color: '#2563EB' },
    actions: ['Validates data', 'Updates accounting', 'Notifies approver'],
    industries: 'Accounting · Finance · Operations'
  }
];

const AgentCapabilities = () => {
  return (
    <section style={{
      padding: '90px 0',
      background: '#FFFFFF',
      position: 'relative',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container">
        
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px' }}>
          <div style={{
            display: 'inline-block',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '100px',
            padding: '6px 18px',
            fontSize: '12px',
            fontWeight: 800,
            color: '#2563EB',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>
            Autonomous Workflows
          </div>
          
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 36px)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '14px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.025em',
            color: '#0F172A'
          }}>
            See What Your AI Agent
            <span style={{ display: 'block', color: '#2563EB', marginTop: '4px' }}>
              Actually Executes
            </span>
          </h2>
          
          <p style={{
            fontSize: '15.5px',
            lineHeight: '1.6',
            color: '#64748B'
          }}>
            AI that doesn't just chat — it completes the entire operation from trigger to completion.
          </p>
        </div>

        {/* Visual workflow cards - 2x2 grid on desktop, stack on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {WORKFLOWS.map((workflow, idx) => {
            const TriggerIcon = workflow.trigger.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = workflow.trigger.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 32px -4px ${workflow.trigger.color}25`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Color accent bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${workflow.trigger.color}, ${workflow.trigger.color}88)`
                }} />

                {/* Trigger */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: workflow.trigger.bg,
                    border: `2px solid ${workflow.trigger.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <TriggerIcon size={24} color={workflow.trigger.color} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '2px'
                    }}>
                      {workflow.trigger.text}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#94A3B8',
                      fontWeight: 600
                    }}>
                      Trigger event
                    </div>
                  </div>
                </div>

                {/* Arrow & AI Process */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                  padding: '14px 16px',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0'
                }}>
                  <Zap size={18} color={workflow.process.color} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{
                      fontSize: '10px',
                      color: '#94A3B8',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '2px'
                    }}>
                      AI Processing
                    </div>
                    <div style={{
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: workflow.process.color
                    }}>
                      {workflow.process.text}
                    </div>
                  </div>
                </div>

                {/* Actions - Clean bullet list */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#64748B',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '12px'
                  }}>
                    Automated Actions
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '10px'
                  }}>
                    {workflow.actions.map((action, actionIdx) => (
                      <div
                        key={actionIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '13px',
                          color: '#334155',
                          fontWeight: 600
                        }}
                      >
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: workflow.trigger.color,
                          flexShrink: 0
                        }} />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div style={{
                  padding: '10px 14px',
                  background: '#F8FAFC',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#64748B',
                  fontWeight: 500,
                  borderLeft: `3px solid ${workflow.trigger.color}`
                }}>
                  <span style={{ fontWeight: 700, color: '#475569' }}>Use cases:</span> {workflow.industries}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '50px',
          padding: '32px',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
          borderRadius: '16px',
          border: '1px solid #BFDBFE'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#475569',
            marginBottom: '12px',
            fontWeight: 600
          }}>
            Connects to your existing tools
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            {['CRM', 'Email', 'Calendar', 'Accounting', 'Phone', 'APIs'].map((tool, idx) => (
              <span key={idx} style={{
                padding: '6px 14px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                fontSize: '12px',
                color: '#475569',
                fontWeight: 700,
                boxShadow: '0 1px 3px rgba(15,23,42,0.04)'
              }}>
                {tool}
              </span>
            ))}
          </div>
          
          <button
            onClick={() => window.location.href = '/contact'}
            style={{
              padding: '12px 28px',
              background: '#2563EB',
              color: '#FFFFFF',
              border: '1px solid #1D4ED8',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(37,99,235,0.3)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1D4ED8';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#2563EB';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Automate Your Workflow
          </button>
        </div>

      </div>
    </section>
  );
};

export default AgentCapabilities;
