import React from 'react';
import { Database, Calendar, Plug, MessageCircle, Mail, FileText, Workflow } from 'lucide-react';

const TECHNOLOGIES = [
  { icon: Database, label: 'CRM', color: '#38BDF8' },
  { icon: Calendar, label: 'Calendar', color: '#10B981' },
  { icon: Plug, label: 'APIs', color: '#F59E0B' },
  { icon: Database, label: 'Databases', color: '#A78BFA' },
  { icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
  { icon: Mail, label: 'Email', color: '#EC4899' },
  { icon: FileText, label: 'Documents', color: '#34D399' },
  { icon: Workflow, label: 'Workflows', color: '#38BDF8' }
];

const SupportingTechnology = () => {
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
            Seamless Integration
          </div>
          <h2 style={{
            fontSize: 'clamp(22px, 2.6vw, 28px)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.025em',
            color: '#0F172A'
          }}>
            Multi-System Execution Architecture
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#64748B'
          }}>
            Your AI agents connect securely to the software you already use and execute complex tasks autonomously.
          </p>
        </div>

        {/* Visual diagram */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px'
        }}>
          
          {/* Top: Customer */}
          <div style={{
            padding: '10px 22px',
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#334155',
            letterSpacing: '0.04em'
          }}>
            CUSTOMER INTAKE (PHONE • WEB FORM • EMAIL)
          </div>

          {/* Arrow down */}
          <div style={{
            width: '2px',
            height: '18px',
            background: '#CBD5E1'
          }} />

          {/* Middle: AI Agent */}
          <div style={{
            padding: '16px 30px',
            background: '#EFF6FF',
            border: '2px solid #BFDBFE',
            borderRadius: '12px',
            fontSize: '14.5px',
            fontWeight: 800,
            color: '#1E40AF',
            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.08)',
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center' }}>
              SERVICETACKLE AUTONOMOUS AI AGENT
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#2563EB',
                marginTop: '3px'
              }}>
                COMPANY KNOWLEDGE + DISPATCH TOOLS
              </div>
            </div>
          </div>

          {/* Arrow down */}
          <div style={{
            width: '2px',
            height: '18px',
            background: '#CBD5E1'
          }} />

          {/* Bottom: Connected systems */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            width: '100%',
            maxWidth: '780px'
          }}
          className="supporting-tech-grid">
            {TECHNOLOGIES.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 10px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#2563EB';
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.background = '#F8FAFC';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} color="#2563EB" />
                  </div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#334155'
                  }}>
                    {tech.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Arrow down */}
          <div style={{
            width: '2px',
            height: '24px',
            background: '#CBD5E1'
          }} />

          {/* Bottom: Action */}
          <div style={{
            padding: '12px 28px',
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '10px',
            fontSize: '13.5px',
            fontWeight: 800,
            color: '#166534',
            letterSpacing: '0.04em'
          }}>
            AUTOMATED EXECUTION (BOOKING • CRM UPDATE • SMS DISPATCH)
          </div>

        </div>

        {/* Key message */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          maxWidth: '640px',
          margin: '40px auto 0'
        }}>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#64748B',
            fontWeight: 500
          }}>
            The agent doesn't stop at conversation — it reads records, updates calendars, and <span style={{ color: '#2563EB', fontWeight: 700 }}>completes the job</span>.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SupportingTechnology;
