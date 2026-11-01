import React from 'react';
import { Users, Target, Zap, Heart, Linkedin, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AboutPage = () => {
  const { openContact } = useApp();
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0F172A' }}>
      
      {/* Hero Section */}
      <section style={{
        padding: '130px 0 70px',
        background: '#FFFFFF',
        position: 'relative',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
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
            <Users size={14} />
            <span>About ServiceTackle AI</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 3.6vw, 40px)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.025em',
            color: '#0F172A'
          }}>
            We're Building AI That Works
            <span style={{
              display: 'block',
              marginTop: '4px',
              color: '#2563EB'
            }}>
              For Real-World Businesses.
            </span>
          </h1>

          <p style={{
            fontSize: '15.5px',
            lineHeight: '1.6',
            color: '#64748B',
            maxWidth: '680px',
            margin: '0 auto 28px',
            fontWeight: 400
          }}>
            ServiceTackle AI creates intelligent agents that handle real operational work — 
            answering phone calls, qualifying customer requests, and automating calendar bookings so business owners can scale efficiently.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{
        padding: '80px 0',
        background: '#F8FAFC'
      }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '28px'
          }}>
            
            {/* Mission */}
            <div style={{
              padding: '36px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '18px',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Target size={24} color="#2563EB" />
              </div>

              <h3 style={{
                fontSize: '20px',
                fontWeight: 800,
                marginBottom: '10px',
                color: '#0F172A',
                fontFamily: 'var(--font-heading)'
              }}>
                Our Mission
              </h3>

              <p style={{
                fontSize: '15px',
                lineHeight: '1.65',
                color: '#64748B',
                margin: 0
              }}>
                Make AI agents accessible, dependable, and practical for every service business. We believe automation 
                shouldn't require complex engineering or massive enterprise budgets — it should connect seamlessly and just work.
              </p>
            </div>

            {/* Values */}
            <div style={{
              padding: '36px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '18px',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Heart size={24} color="#16A34A" />
              </div>

              <h3 style={{
                fontSize: '20px',
                fontWeight: 800,
                marginBottom: '10px',
                color: '#0F172A',
                fontFamily: 'var(--font-heading)'
              }}>
                What We Believe
              </h3>

              <p style={{
                fontSize: '15px',
                lineHeight: '1.65',
                color: '#64748B',
                margin: 0
              }}>
                Honest engineering, zero fluff. We are completely transparent about what AI can and cannot do. 
                We measure our success by the actual revenue-generating jobs and phone calls our agents capture for you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{
        padding: '80px 0',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4.5vw, 40px)',
              fontWeight: 900,
              marginBottom: '14px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.03em',
              color: '#0F172A'
            }}>
              Why We Built ServiceTackle
            </h2>
            <div style={{
              width: '48px',
              height: '3px',
              background: '#2563EB',
              margin: '0 auto',
              borderRadius: '2px'
            }} />
          </div>

          <div style={{
            padding: '36px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '18px'
          }}>
            <p style={{
              fontSize: '16.5px',
              lineHeight: '1.75',
              color: '#475569',
              marginBottom: '20px'
            }}>
              We started ServiceTackle after witnessing trade contractors, clinics, and local services struggle with the exact same leak: 
              missed phone calls while on the job, slow web response times, and manual back-and-forth scheduling eating up hours every evening.
            </p>

            <p style={{
              fontSize: '16.5px',
              lineHeight: '1.75',
              color: '#475569',
              marginBottom: '20px'
            }}>
              Traditional AI promised solutions, but generic chatbots couldn't answer the phone, check live calendar availability, or update CRMs. We built ServiceTackle to bridge this exact gap — voice & web agents that perform real business workflows end-to-end.
            </p>

            <p style={{
              fontSize: '16.5px',
              lineHeight: '1.75',
              color: '#475569',
              margin: 0
            }}>
              Today, our focus is relentless: delivering dependable, high-speed, human-grade voice reception and intelligent lead dispatch for growing service businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Current Stage */}
      <section style={{
        padding: '80px 0',
        background: '#F8FAFC'
      }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            padding: '44px 36px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Zap size={26} color="#2563EB" />
            </div>

            <h3 style={{
              fontSize: '24px',
              fontWeight: 800,
              marginBottom: '14px',
              color: '#0F172A',
              fontFamily: 'var(--font-heading)'
            }}>
              Ready to Automate Your Business?
            </h3>

            <p style={{
              fontSize: '16px',
              lineHeight: '1.65',
              color: '#64748B',
              maxWidth: '600px',
              margin: '0 auto 28px'
            }}>
              Tell us about your call volume, scheduling workflow, and current software stack. We'll show you exactly how a custom AI agent can transform your operations.
            </p>

            <button
              onClick={() => openContact('About Page - General Inquiry')}
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
              <span>Schedule a 1-on-1 Demo</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section style={{
        padding: '70px 0',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0'
      }}>
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 900,
            marginBottom: '14px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.03em',
            color: '#0F172A'
          }}>
            Follow Our Journey
          </h2>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#64748B',
            marginBottom: '28px'
          }}>
            We're building in public and sharing practical automation playbooks.
          </p>

          <a
            href="https://www.linkedin.com/company/servicetackleai/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              background: '#0A66C2',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              color: '#FFFFFF',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(10,102,194,0.3)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#004182';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0A66C2';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Linkedin size={18} />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
