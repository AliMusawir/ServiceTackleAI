import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, ArrowRight, Calendar, Database, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CONVERSATION_STEPS = [
  {
    speaker: 'customer',
    text: "Hi, I'd like to schedule an appointment.",
    timestamp: 0
  },
  {
    speaker: 'ai',
    text: "Absolutely! I can help you with that. What service do you need?",
    timestamp: 1200
  },
  {
    speaker: 'customer',
    text: "I need a plumbing repair.",
    timestamp: 2400
  },
  {
    speaker: 'ai',
    text: "Got it. What day works best for you?",
    timestamp: 3400
  },
  {
    speaker: 'customer',
    text: "How about tomorrow afternoon?",
    timestamp: 4600
  },
  {
    speaker: 'ai',
    text: "Perfect. I have 2:30 PM available. Can I book that for you?",
    timestamp: 5800
  },
  {
    speaker: 'customer',
    text: "Yes, that works!",
    timestamp: 7000
  },
  {
    speaker: 'ai',
    text: "Great! You're all set for tomorrow at 2:30 PM. I'll send you a confirmation.",
    timestamp: 8000
  }
];

const WORKFLOW_STEPS = [
  { label: 'CALL', sublabel: 'Customer calls', icon: Phone, color: '#38BDF8', delay: 0 },
  { label: 'UNDERSTAND', sublabel: 'AI comprehends request', icon: MessageSquare, color: '#10B981', delay: 2000 },
  { label: 'QUALIFY', sublabel: 'Captures details', icon: CheckCircle2, color: '#F59E0B', delay: 4000 },
  { label: 'BOOK', sublabel: 'Schedules appointment', icon: Calendar, color: '#A78BFA', delay: 6000 },
  { label: 'UPDATE CRM', sublabel: 'Syncs to system', icon: Database, color: '#EC4899', delay: 8000 }
];

const VoiceAgentShowcase = () => {
  const { openContact } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationIndex, setConversationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const messagesContainerRef = React.useRef(null);

  // Auto-scroll to bottom when new message appears
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [conversationIndex]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (conversationIndex < CONVERSATION_STEPS.length - 1) {
        setConversationIndex(conversationIndex + 1);
      } else {
        // Reset and loop
        setTimeout(() => {
          setConversationIndex(0);
          setCurrentStep(0);
        }, 2000);
      }
    }, CONVERSATION_STEPS[conversationIndex + 1]?.timestamp - CONVERSATION_STEPS[conversationIndex]?.timestamp || 2000);

    return () => clearTimeout(timer);
  }, [conversationIndex, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const workflowTimer = setTimeout(() => {
      if (currentStep < WORKFLOW_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, WORKFLOW_STEPS[currentStep + 1]?.delay - WORKFLOW_STEPS[currentStep]?.delay || 2000);

    return () => clearTimeout(workflowTimer);
  }, [currentStep, isPlaying]);

  return (
    <section id="voice-agent-section" style={{
      padding: '90px 0',
      background: '#F8FAFC',
      position: 'relative',
      borderTop: '1px solid #E2E8F0'
    }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Left: Content */}
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
              <Phone size={14} />
              <span>Full Phone Operations</span>
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
              Answers Calls &
              <span style={{ display: 'block', color: '#2563EB', marginTop: '3px' }}>Completes The Job</span>
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#64748B',
              marginBottom: '24px'
            }}>
              Handles emergency calls, books appointments directly into your schedule, updates your CRM, and sends instant SMS confirmations.
            </p>

            {/* Feature list */}
            <div style={{ marginBottom: '32px' }}>
              {[
                'Answers inbound customer calls 24/7 in 2 seconds',
                'Speaks with natural human inflection and tone',
                'Qualifies job priority and captures property details',
                'Locks appointments directly in Google / ServiceTitan / Jobber',
                'Instantly transfers complex inquiries to staff'
              ].map((feature, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <CheckCircle2 size={13} color="#2563EB" />
                  </div>
                  <span style={{
                    fontSize: '14.5px',
                    color: '#334155',
                    fontWeight: 600
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => openContact('Voice Agent Section')}
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
              <span>Build My Voice Agent</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right: Demo visualization */}
          <div>
            {/* Conversation window */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '24px',
              height: '320px',
              boxShadow: '0 10px 30px -4px rgba(15, 23, 42, 0.06)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 800,
                color: '#059669',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 6px #10B981'
                }} />
                Live Call Flow Simulation
              </div>

              {/* Conversation messages */}
              <div 
                ref={messagesContainerRef}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '10px',
                  overflowY: 'auto',
                  flex: 1
                }}
              >
                {CONVERSATION_STEPS.slice(0, conversationIndex + 1).map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: step.speaker === 'customer' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: step.speaker === 'customer' 
                        ? '#F8FAFC' 
                        : '#EFF6FF',
                      border: `1px solid ${step.speaker === 'customer' 
                        ? '#E2E8F0' 
                        : '#BFDBFE'}`,
                      fontSize: '13.5px',
                      color: step.speaker === 'customer' ? '#334155' : '#1E3A8A',
                      lineHeight: '1.5'
                    }}>
                      <div style={{
                        fontSize: '10.5px',
                        color: step.speaker === 'customer' ? '#64748B' : '#2563EB',
                        fontWeight: 700,
                        marginBottom: '3px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {step.speaker === 'customer' ? 'Caller' : 'ServiceTackle AI'}
                      </div>
                      {step.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow steps */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
              }}>
                {/* Progress line */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  left: '20px',
                  right: '20px',
                  height: '2px',
                  background: '#E2E8F0',
                  zIndex: 0
                }}>
                  <div style={{
                    height: '100%',
                    background: '#2563EB',
                    width: `${(currentStep / (WORKFLOW_STEPS.length - 1)) * 100}%`,
                    transition: 'width 0.4s ease'
                  }} />
                </div>

                {/* Workflow nodes */}
                {WORKFLOW_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx <= currentStep;
                  
                  return (
                    <div key={idx} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      flex: 1,
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isActive ? '#2563EB' : '#F1F5F9',
                        border: `2px solid ${isActive ? '#1D4ED8' : '#E2E8F0'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none'
                      }}>
                        <Icon size={16} color={isActive ? '#FFFFFF' : '#64748B'} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: isActive ? '#0F172A' : '#64748B',
                          marginBottom: '1px'
                        }}>
                          {step.label}
                        </div>
                        <div style={{
                          fontSize: '9.5px',
                          color: isActive ? '#64748B' : '#94A3B8',
                          fontWeight: 500
                        }}>
                          {step.sublabel}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Play/pause control */}
            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#64748B',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              >
                {isPlaying ? 'Pause' : 'Play'} Simulation
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VoiceAgentShowcase;
