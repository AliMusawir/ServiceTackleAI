import React, { useState } from 'react';
import { MessageSquare, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SUGGESTED_PROMPTS = [
  "What does ServiceTackle do?",
  "How does your AI voice agent work?",
  "Can your AI book appointments?",
  "What systems can you integrate with?",
  "How much does it cost?",
  "Can it connect to my CRM?"
];

const LiveAIDemo = () => {
  const { toggleChat, isChatOpen, sendMessageToChat, setIsChatOpen } = useApp();
  const [hoveredPrompt, setHoveredPrompt] = useState(null);

  const handlePromptClick = (prompt) => {
    // Send the message to chat context
    sendMessageToChat(prompt);
    // Ensure chat is open
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  };

  return (
    <section style={{
      padding: '90px 0',
      background: '#F8FAFC',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid #E2E8F0'
    }}>
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
          
          {/* LEFT: Demo Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '36px 32px',
            boxShadow: '0 10px 30px -4px rgba(15, 23, 42, 0.06)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Central CTA */}
            <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative' }}>
              <button
                onClick={toggleChat}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: isChatOpen 
                    ? '#059669'
                    : '#2563EB',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '18px 36px',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
                  transition: 'all 0.25s ease',
                  width: '100%',
                  justifyContent: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isChatOpen ? '#047857' : '#1D4ED8';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isChatOpen ? '#059669' : '#2563EB';
                }}
              >
                {isChatOpen ? (
                  <>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      boxShadow: '0 0 8px #FFFFFF'
                    }} />
                    <span>Chat Is Active</span>
                  </>
                ) : (
                  <>
                    <MessageSquare size={20} />
                    <span>Launch Web AI Demo</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p style={{
                marginTop: '12px',
                fontSize: '12.5px',
                color: '#64748B',
                fontWeight: 600
              }}>
                {isChatOpen ? 'Widget is active in bottom right' : 'Click to test real-time website chat AI'}
              </p>
            </div>

            {/* Decorative divider */}
            <div style={{
              height: '1px',
              background: '#E2E8F0',
              margin: '28px 0',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#FFFFFF',
                padding: '0 12px',
                fontSize: '11px',
                color: '#64748B',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                Try Asking
              </div>
            </div>

            {/* Suggested prompts */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  onMouseEnter={() => setHoveredPrompt(idx)}
                  onMouseLeave={() => setHoveredPrompt(null)}
                  style={{
                    background: hoveredPrompt === idx 
                      ? '#EFF6FF'
                      : '#F8FAFC',
                    border: hoveredPrompt === idx
                      ? '1px solid #BFDBFE'
                      : '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: hoveredPrompt === idx ? '#1E40AF' : '#334155',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <MessageSquare size={14} style={{ color: '#2563EB', flexShrink: 0 }} />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
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
              <Sparkles size={14} />
              <span>Live Website AI</span>
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
              Chat With Our AI.
              <span style={{
                display: 'block',
                marginTop: '4px',
                color: '#2563EB'
              }}>
                Instant Real-Time Intelligence.
              </span>
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#64748B',
              marginBottom: '20px',
              fontWeight: 400
            }}>
              This is the exact AI agent engine that handles customer inquiries, quotes, and qualifications. Test its depth by asking any custom workflow questions.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '20px'
            }}>
              {[
                { icon: Zap, text: 'Instant sub-second response time', color: '#2563EB' },
                { icon: MessageSquare, text: 'Trained on comprehensive product & company knowledge', color: '#059669' },
                { icon: CheckCircle2, text: 'Direct lead qualification & appointment capture', color: '#7C3AED' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  background: '#FFFFFF',
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
              marginTop: '24px',
              padding: '14px 18px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '10px'
            }}>
              <p style={{
                fontSize: '13px',
                color: '#1E3A8A',
                lineHeight: '1.5',
                margin: 0
              }}>
                <strong style={{ color: '#1E40AF' }}>No signup required:</strong> Just launch chat and start testing immediately.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LiveAIDemo;
