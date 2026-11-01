import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, RotateCcw } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// AI Voice Agent Demo - Powered by Vapi Neural Voice (Ethan)
// ═══════════════════════════════════════════════════════════════════════════

const VAPI_PUBLIC_KEY = '9e3dd7c4-65a4-425b-9a72-20cb599dbbcb';
const ASSISTANT_ID = '731f0515-e858-4811-bca0-b28b64cb1700';

const VoiceAgentDemo = () => {
  // States: idle, listening, thinking, speaking, error
  const [agentState, setAgentState] = useState('idle');
  const [conversation, setConversation] = useState([]);
  const [audioLevel, setAudioLevel] = useState(0);

  // Refs
  const vapiRef = useRef(null);

  // ─── Initialize Vapi Client ──────────────────────────────────────────────
  useEffect(() => {
    const vapi = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setAgentState('listening');
    });

    vapi.on('call-end', () => {
      setAgentState('idle');
      setAudioLevel(0);
    });

    vapi.on('speech-start', () => {
      setAgentState('speaking');
    });

    vapi.on('speech-end', () => {
      setAgentState('listening');
    });

    vapi.on('volume-level', (volume) => {
      setAudioLevel(volume);
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const text = message.transcript;
        if (!text || !text.trim()) return;

        if (message.transcriptType === 'final') {
          setConversation(prev => {
            const role = message.role === 'assistant' ? 'assistant' : 'user';
            // Avoid duplicate consecutive transcripts
            if (prev.length > 0 && prev[prev.length - 1].content === text && prev[prev.length - 1].role === role) {
              return prev;
            }
            return [...prev, { role, content: text, timestamp: Date.now() }];
          });
        }
      }
    });

    vapi.on('error', (err) => {
      console.error('Vapi error:', err);
      setAgentState('error');
      setTimeout(() => setAgentState('idle'), 3000);
    });

    return () => {
      try {
        if (vapiRef.current) {
          vapiRef.current.stop();
          vapiRef.current.removeAllListeners();
        }
      } catch (e) {
        console.warn('Vapi cleanup error', e);
      }
    };
  }, []);

  // ─── Start / Stop Call ───────────────────────────────────────────────────
  const startConversation = async () => {
    if (!vapiRef.current) return;
    try {
      setAgentState('thinking');
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (err) {
      console.error('Failed to start call:', err);
      setAgentState('error');
      setTimeout(() => setAgentState('idle'), 2500);
    }
  };

  const stopConversation = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setAgentState('idle');
    setAudioLevel(0);
  };

  const resetDemo = () => {
    stopConversation();
    setConversation([]);
  };

  // ─── Get Status Text ───────────────────────────────────────────────────────
  const getStatusText = () => {
    switch (agentState) {
      case 'idle': return 'Ready to talk';
      case 'listening': return 'Listening to you...';
      case 'thinking': return 'Connecting AI...';
      case 'speaking': return 'Ethan is speaking...';
      case 'error': return 'Error - Please try again';
      default: return 'Ready';
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '480px',
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #CBD5E1',
      boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '36px 24px'
    }}>
      {/* Background Ambient Effects */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />
      
      {/* AI Orb Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '540px'
      }}>
        {/* Status Indicator */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13.5px',
            fontWeight: 700,
            color: agentState === 'error' ? '#EF4444' : '#0F172A'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: agentState === 'error' ? '#EF4444' : agentState === 'idle' ? '#10B981' : '#2563EB',
              boxShadow: `0 0 10px ${agentState === 'error' ? '#EF4444' : '#2563EB'}`,
              animation: agentState === 'idle' ? 'pulse 2s ease-in-out infinite' : 'none'
            }} />
            {getStatusText()}
          </div>
          
          {agentState !== 'idle' && agentState !== 'error' && (
            <div style={{
              fontSize: '11px',
              color: '#059669',
              background: '#ECFDF5',
              padding: '4px 12px',
              borderRadius: '100px',
              border: '1px solid #A7F3D0',
              fontWeight: 700,
              letterSpacing: '0.02em'
            }}>
              🎙️ Live Neural Voice Call
            </div>
          )}
        </div>
        
        {/* AI Orb - Main Interactive Element */}
        <AIOrb
          state={agentState}
          audioLevel={audioLevel}
          onClick={() => {
            if (agentState === 'idle') {
              startConversation();
            } else if (agentState === 'speaking' || agentState === 'listening') {
              stopConversation();
            }
          }}
        />
        
        {/* Action Hint */}
        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B',
          textAlign: 'center',
          minHeight: '20px'
        }}>
          {agentState === 'idle' && (conversation.length === 0 ? 'Tap the orb to start live demo' : 'Tap the orb to talk again')}
          {agentState === 'thinking' && 'Connecting to Ethan...'}
          {agentState === 'listening' && 'I am listening to you... speak naturally'}
          {agentState === 'speaking' && 'Ethan is speaking...'}
        </div>
        
        {/* Conversation Transcript */}
        {conversation.length > 0 && (
          <div style={{
            width: '100%',
            maxHeight: '130px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '14px 16px',
            background: '#F8FAFC',
            borderRadius: '12px',
            border: '1px solid #E2E8F0'
          }}>
            {/* Show recent messages */}
            {conversation.slice(-2).map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  animation: 'slideUp 0.3s ease-out'
                }}
              >
                <div style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: msg.role === 'user' ? '#2563EB' : '#059669',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}>
                  {msg.role === 'user' ? 'You' : 'Ethan (ServiceTackle AI)'}
                </div>
                <div style={{
                  fontSize: '13.5px',
                  color: '#0F172A',
                  lineHeight: '1.5'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Controls - Elegant & Minimal */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {agentState !== 'idle' && (
            <button
              onClick={stopConversation}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              🔴 End Call
            </button>
          )}

          {conversation.length > 0 && agentState === 'idle' && (
            <button
              onClick={resetDemo}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                color: '#475569',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <RotateCcw size={14} />
              New Conversation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// AI Orb Component - The Hero Visual Element
// ═══════════════════════════════════════════════════════════════════════════

const AIOrb = ({ state, audioLevel, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamic scale based on state
  const getScale = () => {
    if (state === 'listening') return 1.08;
    if (state === 'thinking') return 1.04;
    if (state === 'speaking') return 1.06;
    if (isHovered) return 1.03;
    return 1;
  };
  
  // Dynamic glow based on state
  const getGlow = () => {
    if (state === 'listening') return 'rgba(37,99,235,0.35)';
    if (state === 'thinking') return 'rgba(139,92,246,0.35)';
    if (state === 'speaking') return 'rgba(16,185,129,0.35)';
    if (state === 'error') return 'rgba(239,68,68,0.35)';
    return 'rgba(37,99,235,0.2)';
  };
  
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '180px',
        height: '180px',
        cursor: state === 'idle' || state === 'speaking' ? 'pointer' : 'default',
        transform: `scale(${getScale()})`,
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Outer Glow Rings */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: `-${16 + i * 14}px`,
            borderRadius: '50%',
            border: `1.5px solid ${getGlow()}`,
            opacity: 0.7 - i * 0.2,
            animation: `${state === 'listening' ? 'audioRipple' : 'orbPulse'} ${2.4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
      
      {/* Main Orb */}
      <div style={{
        position: 'relative',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, #60A5FA 0%, #2563EB 55%, #1D4ED8 100%)`,
        boxShadow: `
          0 10px 30px rgba(37, 99, 235, 0.35),
          0 20px 50px rgba(37, 99, 235, 0.18),
          inset 0 2px 10px rgba(255, 255, 255, 0.4)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: state === 'idle' ? 'breathe 4s ease-in-out infinite' : 'none'
      }}>
        {/* Inner Highlight */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '35%',
          height: '35%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)',
          filter: 'blur(10px)'
        }} />
        
        {/* Thinking Particles */}
        {state === 'thinking' && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#38BDF8',
                  animation: `particleOrbit ${3 + i * 0.2}s linear infinite`,
                  animationDelay: `${i * 0.2}s`,
                  boxShadow: '0 0 8px #38BDF8'
                }}
              />
            ))}
          </>
        )}
        
        {/* Audio Level Indicator (Listening) */}
        {state === 'listening' && (
          <div style={{
            position: 'absolute',
            inset: '20px',
            borderRadius: '50%',
            border: '3px solid rgba(56,189,248,0.8)',
            transform: `scale(${1 + audioLevel * 0.3})`,
            transition: 'transform 0.1s ease-out'
          }} />
        )}
        
        {/* Speaking Waveform */}
        {state === 'speaking' && (
          <div style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            height: '60px'
          }}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  height: '100%',
                  background: '#FFFFFF',
                  borderRadius: '3px',
                  animation: `waveBar ${0.8}s ease-in-out infinite`,
                  animationDelay: `${i * 0.08}s`,
                  opacity: 0.8
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Ripple Effect on Click */}
      {isHovered && state === 'idle' && (
        <div style={{
          position: 'absolute',
          inset: '-40px',
          borderRadius: '50%',
          border: '2px solid rgba(56,189,248,0.4)',
          animation: 'rippleOut 1.5s ease-out infinite'
        }} />
      )}
    </div>
  );
};

export default VoiceAgentDemo;
