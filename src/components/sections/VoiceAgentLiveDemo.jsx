import React from 'react';
import { Phone, Sparkles, Mic, Zap, Globe, CheckCircle2 } from 'lucide-react';
import VoiceAgentDemo from '../voice/VoiceAgentDemo';

const VoiceAgentLiveDemo = () => {
  return (
    <section
      id="voice-demo"
      style={{
        padding: '90px 0',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #E2E8F0'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Split Layout: Demo Left, Content Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '60px',
          alignItems: 'center',
          maxWidth: '1240px',
          margin: '0 auto'
        }}
        className="demo-split-layout">
          
          {/* LEFT: Voice Agent Demo */}
          <div>
            <VoiceAgentDemo />
          </div>

          {/* RIGHT: Content */}
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
              <span>Interactive Voice AI Demo</span>
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
              Hear It Speak.
              <span style={{
                display: 'block',
                marginTop: '4px',
                color: '#2563EB'
              }}>
                Instant Human-Level Voice.
              </span>
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#64748B',
              marginBottom: '20px',
              fontWeight: 400
            }}>
              This is a live voice AI running directly in your browser. Tap the orb, speak naturally, and experience low-latency voice intelligence in action.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '20px'
            }}>
              {[
                { icon: Mic, text: 'Natural human inflection & tone', color: '#2563EB' },
                { icon: Zap, text: 'Sub-400ms ultra-low latency response', color: '#059669' },
                { icon: Globe, text: 'Multilingual support in 50+ languages', color: '#0284C7' },
                { icon: CheckCircle2, text: 'Full conversational memory & smart handoff', color: '#7C3AED' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                  <span style={{
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#334155'
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '22px',
              padding: '14px 16px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '10px'
            }}>
              <p style={{
                fontSize: '13px',
                color: '#1E3A8A',
                lineHeight: '1.55',
                margin: 0
              }}>
                <strong style={{ color: '#1E40AF' }}>Try it now:</strong> Tap the microphone or orb on the left to start a real-time voice call with the AI receptionist.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VoiceAgentLiveDemo;
