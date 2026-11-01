import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, Sparkles, Zap, CheckCircle2, Headphones, ShieldCheck, Clock, MessageSquare, Calendar, Bot, PhoneCall, Mail, FileSpreadsheet, Layers, Database, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NewHero = () => {
  const { openContact, toggleChat } = useApp();
  const [activeTab, setActiveTab] = useState(0); // 0: Phone, 1: Forms, 2: Emails & Sheets, 3: CRM & Booking

  const tabPreviews = [
    {
      id: 'phone',
      title: 'Phone Intake',
      icon: PhoneCall,
      color: '#10B981',
      badge: 'Live Inbound Call',
      badgeStatus: 'Connected in 1.8s',
      callerRole: 'Caller (Robert)',
      callerText: 'Hi, our AC just stopped working in Dallas and it is 95° outside. Can someone come today?',
      aiRole: 'AI Phone Receptionist',
      aiText: 'I can help with that! We have an emergency technician available in Dallas today at 3:30 PM. I have reserved that slot and texted you the confirmation.',
      actionText: 'Emergency Slot Reserved • SMS Sent',
      floatBadge: '⚡ 1.8s Pick Up',
      syncTarget: 'Synced with Phone System'
    },
    {
      id: 'forms',
      title: 'Web Forms',
      icon: MessageSquare,
      color: '#38BDF8',
      badge: 'Website Quote Form',
      badgeStatus: 'Instant AI Evaluation',
      callerRole: 'Form Submission',
      callerText: 'Commercial roof inspection request • 12,000 sq ft warehouse in Miami • Urgency: High',
      aiRole: 'AI Intake Engine',
      aiText: 'Estimate generated: $14,000 - $18,500. Qualified as Tier-1 Priority. Commercial estimator assigned for inspection tomorrow at 10 AM.',
      actionText: 'Lead Qualified • Instant Quote Sent',
      floatBadge: '📝 100% Form Capture',
      syncTarget: 'Pushed to Website & CRM'
    },
    {
      id: 'sheets',
      title: 'Email & Sheets',
      icon: FileSpreadsheet,
      color: '#F59E0B',
      badge: 'Email & Spreadsheet Sync',
      badgeStatus: 'Automated Extraction',
      callerRole: 'Inbound Customer Email',
      callerText: 'Attached is our vendor service order #4829 for plumbing overhaul across 4 units.',
      aiRole: 'AI Workflow Processor',
      aiText: 'Parsed order #4829: 4 units identified, parts catalog cross-referenced, logged into master Google Sheet, and confirmation emailed back.',
      actionText: 'Sheet Row Added • Invoice Created',
      floatBadge: '📊 Zero Manual Entry',
      syncTarget: 'Synced with Google Sheets'
    },
    {
      id: 'crm',
      title: 'CRM & Calendar',
      icon: Calendar,
      color: '#A78BFA',
      badge: 'CRM & Schedule Dispatch',
      badgeStatus: 'Real-time Sync',
      callerRole: 'Patient Booking',
      callerText: 'Need an emergency dental consultation for severe tooth pain this afternoon.',
      aiRole: 'AI Booking Assistant',
      aiText: 'Booked Dr. Vance for emergency consultation today at 2:15 PM. Patient profile updated in CRM and calendar slot locked.',
      actionText: 'CRM Contact Updated • Calendar Locked',
      floatBadge: '📅 Auto-Booked',
      syncTarget: 'Synced with ServiceTitan / HubSpot'
    }
  ];

  // Auto-switch tabs every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(prev => (prev + 1) % tabPreviews.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [tabPreviews.length]);

  const current = tabPreviews[activeTab];
  const TabIcon = current.icon;

  return (
    <section style={{
      position: 'relative',
      paddingTop: '130px',
      paddingBottom: '90px',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)',
      overflow: 'hidden'
    }}>
      {/* Subtle Engineering Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        opacity: 0.8,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 90%)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1360px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '88px',
          alignItems: 'center'
        }}>
          
          {/* ── LEFT COLUMN: High-Converting Headline & Stack ── */}
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            
            {/* Live Kicker Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '9999px',
              padding: '5px 14px 5px 6px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#334155',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: '#ECFDF5',
                borderRadius: '9999px',
                padding: '3px 8px',
                border: '1px solid #A7F3D0'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669' }}>LIVE 24/7</span>
              </div>
              <span style={{ color: '#475569' }}>Autonomous AI Phone & Web Operations</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(30px, 3.8vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '16px',
              fontFamily: 'var(--font-heading, "Plus Jakarta Sans", sans-serif)',
              letterSpacing: '-0.03em',
              color: '#0F172A'
            }}>
              AI Agents That
              <span style={{
                display: 'block',
                marginTop: '4px',
                background: 'linear-gradient(135deg, #2563EB 0%, #0284C7 50%, #0D9488 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Do The Real Work.
              </span>
            </h1>

            {/* Clean Subtitle */}
            <p style={{
              fontSize: '15.5px',
              lineHeight: '1.6',
              color: '#475569',
              marginBottom: '22px',
              fontWeight: 400
            }}>
              Connect your phone calls, web forms, emails, spreadsheets, and CRM to let autonomous AI handle your repetitive customer intake and operations automatically.
            </p>

            {/* Connected Tools & Integrations Row */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '14px 18px',
              marginBottom: '28px',
              boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                Seamlessly Connects Across Your Tools
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'center',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#1E293B'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '5px 11px', borderRadius: '7px', border: '1px solid #E2E8F0', color: '#1E293B' }}>
                  <Phone size={14} style={{ color: '#059669' }} /> Calls & Voice
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '5px 11px', borderRadius: '7px', border: '1px solid #E2E8F0', color: '#1E293B' }}>
                  <MessageSquare size={14} style={{ color: '#0284C7' }} /> Web Forms
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '5px 11px', borderRadius: '7px', border: '1px solid #E2E8F0', color: '#1E293B' }}>
                  <Mail size={14} style={{ color: '#D97706' }} /> Email Inbox
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '5px 11px', borderRadius: '7px', border: '1px solid #E2E8F0', color: '#1E293B' }}>
                  <FileSpreadsheet size={14} style={{ color: '#10B981' }} /> Spreadsheets
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '5px 11px', borderRadius: '7px', border: '1px solid #E2E8F0', color: '#1E293B' }}>
                  <Database size={14} style={{ color: '#7C3AED' }} /> CRMs & Calendars
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '18px'
            }}>
              <button
                onClick={() => openContact('Hero - Automate My Business')}
                className="btn btn-primary btn-lg"
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  padding: '14px 28px',
                  borderRadius: '10px',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  border: '1px solid #1D4ED8',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
              >
                <Sparkles size={16} />
                <span>Automate My Business</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('voice-demo') || document.querySelector('[data-voice-demo]');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else toggleChat();
                }}
                className="btn btn-secondary btn-lg"
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '14px 24px',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#94A3B8'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}
              >
                <Headphones size={16} style={{ color: '#2563EB' }} />
                <span>See Live Demos</span>
              </button>
            </div>

            {/* Reassurance */}
            <div style={{
              fontSize: '12.5px',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={14} style={{ color: '#059669', flexShrink: 0 }} />
              <span>Zero hardware needed • Real tool integrations • Live in 48 hours</span>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Interactive 4-Mode Enterprise Visualizer ── */}
          <div style={{ position: 'relative' }}>
            
            {/* The Main AI Visualizer Card */}
            <div style={{
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.1)',
              padding: '22px',
              overflow: 'hidden'
            }}>
              
              {/* 4 Interactive Mode Tabs */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '5px',
                background: '#F1F5F9',
                padding: '4px',
                borderRadius: '10px',
                marginBottom: '18px',
                overflowX: 'auto',
                scrollbarWidth: 'none'
              }}>
                {tabPreviews.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isSel = activeTab === idx;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(idx)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '7px',
                        border: isSel ? '1px solid #CBD5E1' : '1px solid transparent',
                        background: isSel ? '#FFFFFF' : 'transparent',
                        color: isSel ? '#0F172A' : '#64748B',
                        fontSize: '11.5px',
                        fontWeight: isSel ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        boxShadow: isSel ? '0 2px 6px rgba(15, 23, 42, 0.06)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Icon size={14} style={{ color: isSel ? '#2563EB' : '#64748B' }} />
                      <span style={{ whiteSpace: 'nowrap' }}>{tab.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Status Header Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                borderBottom: '1px solid #F1F5F9',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <TabIcon size={16} color="#2563EB" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{current.badge}</div>
                    <div style={{ fontSize: '11px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }} />
                      {current.badgeStatus}
                    </div>
                  </div>
                </div>

                {/* Sound Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '5px 8px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  {[14, 24, 10, 28, 18, 12, 22, 16].map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: '2.5px',
                        height: `${h}px`,
                        background: '#2563EB',
                        borderRadius: '2px',
                        animation: `soundWave 1.2s ease-in-out ${idx * 0.15}s infinite alternate`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Dialogue Bubbles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                
                {/* Caller / Payload Bubble */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#475569',
                    flexShrink: 0
                  }}>
                    📥
                  </div>
                  <div style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0 12px 12px 12px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#334155',
                    lineHeight: '1.45'
                  }}>
                    <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>{current.callerRole}</div>
                    {current.callerText}
                  </div>
                </div>

                {/* AI Agent Response */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                    flexShrink: 0
                  }}>
                    <Bot size={14} color="#FFFFFF" />
                  </div>
                  <div style={{
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '0 12px 12px 12px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#1E3A8A',
                    lineHeight: '1.5'
                  }}>
                    <div style={{ fontSize: '10.5px', color: '#2563EB', fontWeight: 700, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={10} /> {current.aiRole}
                    </div>
                    {current.aiText}
                  </div>
                </div>

              </div>

              {/* Action Confirmation Chip */}
              <div style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '10px',
                padding: '9px 13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#166534',
                fontWeight: 600
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#16A34A" />
                  <span>{current.actionText}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#64748B' }}>{current.syncTarget}</span>
              </div>

            </div>

            {/* Floating Live Badge Top Right */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-8px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#0F172A',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)'
            }}>
              <Zap size={12} color="#2563EB" />
              <span>{current.floatBadge}</span>
            </div>

          </div>

        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes soundWave {
          0% { height: 4px; }
          100% { height: 24px; }
        }
      `}</style>
    </section>
  );
};

export default NewHero;



