import React from 'react';
import { Check, ArrowRight, Phone, MessageSquare, Wrench, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PRICING_TIERS = [
  {
    icon: Phone,
    name: 'Voice Agent',
    description: 'Your AI employee on the phone',
    color: '#34D399',
    features: [
      'Answer inbound calls 24/7',
      'Natural voice conversations',
      'Appointment booking',
      'Lead qualification',
      'CRM integration',
      'Call transcripts & analytics'
    ]
  },
  {
    icon: MessageSquare,
    name: 'Web Agent',
    description: 'Your AI employee on your website',
    color: '#38BDF8',
    features: [
      'Website chat widget',
      'Company knowledge base',
      'Lead capture forms',
      'Appointment booking',
      'CRM integration',
      'Conversation analytics'
    ]
  },
  {
    icon: Wrench,
    name: 'Business Automation',
    description: 'Workflows and CRM automation',
    color: '#A78BFA',
    features: [
      'Custom workflow automation',
      'Multi-system integrations',
      'CRM data synchronization',
      'Automated task routing',
      'Email & SMS automation',
      'Performance tracking'
    ]
  },
  {
    icon: Building2,
    name: 'Document AI',
    description: 'Invoice OCR and document processing',
    color: '#F59E0B',
    features: [
      'Invoice OCR extraction',
      'Document classification',
      'Data validation',
      'Multi-format support',
      'Automated filing',
      'Export to accounting systems'
    ]
  }
];

const PRICING_FACTORS = [
  'Conversation volume',
  'Integration complexity',
  'Custom workflows',
  'Deployment requirements',
  'Ongoing support level'
];

const NewPricing = () => {
  const { openContact } = useApp();
  
  return (
    <section style={{
      padding: '90px 0',
      background: '#F8FAFC',
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
            Flexible Plans
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
            Transparent, Value-Based Pricing
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#64748B'
          }}>
            Choose the AI agent setup tailored to your company's call volume, systems, and workflows.
          </p>
        </div>

        {/* Pricing cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto 50px'
        }}>
          {PRICING_TIERS.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '26px 22px',
                  boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px -4px rgba(37, 99, 235, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.04)';
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={22} color="#2563EB" />
                </div>

                {/* Name */}
                <h3 style={{
                  fontSize: '17.5px',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '6px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {tier.name}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#64748B',
                  marginBottom: '20px',
                  minHeight: '40px'
                }}>
                  {tier.description}
                </p>

                {/* Custom Quote CTA Button */}
                <div style={{
                  padding: '14px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748B',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}>
                    Tailored to your business volume
                  </div>
                  <button
                    onClick={() => openContact(`Pricing - ${tier.name}`)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: '#2563EB',
                      border: '1px solid #1D4ED8',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#1D4ED8';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#2563EB';
                    }}
                  >
                    <span>Get a Custom Quote</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {tier.features.map((feature, fidx) => (
                    <div key={fidx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <Check size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{
                        fontSize: '14px',
                        color: '#334155',
                        lineHeight: '1.5'
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing factors */}
        <div style={{
          maxWidth: '840px',
          margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(15, 23, 42, 0.04)'
        }}>
          <h3 style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)'
          }}>
            What affects pricing?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {PRICING_FACTORS.map((factor, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#2563EB'
                }} />
                <span style={{
                  fontSize: '14px',
                  color: '#475569'
                }}>
                  {factor}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewPricing;
