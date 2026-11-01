import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, Mic, MicOff, Sparkles, AlertCircle, RefreshCw, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// ─── Suggested Questions Based on Context ─────────────────────────────────────
const INITIAL_SUGGESTIONS = [
  "What does ServiceTackle do?",
  "How does the Voice Agent work?",
  "Can AI book appointments?",
  "Can I get an AI agent for my business?"
];

const VOICE_AI_SUGGESTIONS = [
  "How does pricing work?",
  "Can it connect to my CRM?",
  "Can it transfer calls?",
  "Book a demo"
];

const WEB_AI_SUGGESTIONS = [
  "Can it capture leads?",
  "Can it use my website content?",
  "How do I install it?",
  "Book a demo"
];

const PRICING_SUGGESTIONS = [
  "What affects the cost?",
  "Is there a setup fee?",
  "Book a consultation",
  "See all products"
];

// ─── Main Component ───────────────────────────────────────────────────────────
const PremiumAIChatbot = () => {
  const { isChatOpen, setIsChatOpen, toggleChat, openContact, pendingChatMessage, setPendingChatMessage } = useApp();
  
  // State
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  const [currentSuggestions, setCurrentSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechAvailable, setIsSpeechAvailable] = useState(false);
  const [sessionRestored, setSessionRestored] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const abortControllerRef = useRef(null);
  const pendingMessageRef = useRef(null);
  
  // ─── Initialize ──────────────────────────────────────────────────────────────
  useEffect(() => {
    // Check speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechAvailable(!!SpeechRecognition);
    
    // DO NOT load previous session - always start fresh on page load
    
    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  // ─── Auto-scroll to bottom ──────────────────────────────────────────────────
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);
  
  // ─── Auto-focus input when opened ───────────────────────────────────────────
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isChatOpen]);
  
  // ─── Handle pending message from context ────────────────────────────────────
  useEffect(() => {
    if (pendingChatMessage) {
      // Store it in ref
      pendingMessageRef.current = pendingChatMessage;
      setPendingChatMessage(null);
      
      // If chat is already open, send immediately
      if (isChatOpen) {
        sendMessage(pendingMessageRef.current);
        pendingMessageRef.current = null;
      }
    }
  }, [pendingChatMessage]);
  
  // ─── Send pending message when chat opens ───────────────────────────────────
  useEffect(() => {
    if (isChatOpen && pendingMessageRef.current) {
      // Small delay to ensure chat is fully rendered
      const timer = setTimeout(() => {
        sendMessage(pendingMessageRef.current);
        pendingMessageRef.current = null;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);
  
  // ─── Save messages to session storage ───────────────────────────────────────
  // REMOVED - Do not persist chat history across page refreshes
  
  // ─── Update suggestions based on context ────────────────────────────────────
  const updateSuggestions = useCallback((messageText) => {
    const text = messageText.toLowerCase();
    
    if (text.includes('voice') || text.includes('phone') || text.includes('call')) {
      setCurrentSuggestions(VOICE_AI_SUGGESTIONS);
    } else if (text.includes('web') || text.includes('website') || text.includes('chat')) {
      setCurrentSuggestions(WEB_AI_SUGGESTIONS);
    } else if (text.includes('price') || text.includes('pricing') || text.includes('cost')) {
      setCurrentSuggestions(PRICING_SUGGESTIONS);
    }
  }, []);
  
  // ─── Typing Animation Effect ─────────────────────────────────────────────────
  useEffect(() => {
    if (!typingMessageId) return;
    
    // Find the message that's currently typing
    const messageIndex = messages.findIndex(msg => msg.id === typingMessageId);
    if (messageIndex === -1) return;
    
    const message = messages[messageIndex];
    const targetText = message.fullContent || message.content;
    const currentText = message.content;
    
    if (currentText.length >= targetText.length) {
      // Typing complete
      setTypingMessageId(null);
      updateSuggestions(targetText);
      return;
    }
    
    // Type one character at a time
    const timeout = setTimeout(() => {
      setMessages(prev => prev.map((msg, idx) => 
        idx === messageIndex 
          ? { ...msg, content: targetText.slice(0, msg.content.length + 1) }
          : msg
      ));
    }, 20);
    
    return () => clearTimeout(timeout);
  }, [messages, typingMessageId, updateSuggestions]);
  
  // ─── Submit Contact Form (AI-triggered) ─────────────────────────────────────
  const submitContactForm = async (formData) => {
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name || '');
      submitData.append('email', formData.email || '');
      submitData.append('phone', formData.phone || '');
      submitData.append('company', formData.company || '');
      submitData.append('service', formData.service || '');
      submitData.append('message', formData.message || 'Contact request submitted via AI chat assistant');
      submitData.append('budget', 'Standard');
      
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        body: submitData
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Form submitted successfully - AI will inform user in its response
        console.log('Contact form submitted successfully by AI');
      } else {
        console.error('Failed to submit contact form:', data.message);
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
    }
  };
  
  // ─── Send Message ────────────────────────────────────────────────────────────
  const sendMessage = async (messageText) => {
    const text = (messageText || inputValue).trim();
    if (!text || isThinking) return;
    
    if (!isOnline) {
      setError({
        type: 'offline',
        message: "You're currently offline. Please check your connection and try again."
      });
      return;
    }
    
    setInputValue('');
    setError(null);
    setSessionRestored(false);
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);
    
    // Prepare history for API - include current user message
    const history = [...messages, userMessage].map(msg => ({
      role: msg.role,
      content: msg.fullContent || msg.content // Use fullContent for AI messages
    }));
    
    // Abort any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch('/api/chatbot.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history.slice(0, -1) // Don't include the current message in history
        }),
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data && data.data.reply) {
        const aiMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: '', // Start empty for typing animation
          fullContent: data.data.reply, // Store full content
          chips: data.data.chips || [],
          timestamp: new Date().toISOString()
        };
        
        // Check if AI wants to submit form
        if (data.data.formData) {
          // AI has collected enough info, submit the form
          submitContactForm(data.data.formData);
        }
        
        // Add message and start typing animation
        setMessages(prev => [...prev, aiMessage]);
        setTypingMessageId(aiMessage.id);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // User cancelled, ignore
      }
      
      setError({
        type: err.name === 'TypeError' ? 'network' : 'api',
        message: err.name === 'TypeError' 
          ? 'Network error. Please check your connection.' 
          : "Sorry, I couldn't complete that response."
      });
    } finally {
      setIsThinking(false);
      abortControllerRef.current = null;
    }
  };
  
  // ─── Voice Input ─────────────────────────────────────────────────────────────
  const toggleVoice = () => {
    if (!isSpeechAvailable) return;
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognitionRef.current = recognition;
    recognition.start();
  };
  
  // ─── Handle Suggestion Click ─────────────────────────────────────────────────
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.toLowerCase().includes('demo') || suggestion.toLowerCase().includes('consultation')) {
      openContact?.('Chatbot - ' + suggestion);
      return;
    }
    sendMessage(suggestion);
  };
  
  // ─── Reset Chat ──────────────────────────────────────────────────────────────
  const resetChat = () => {
    setMessages([]);
    setCurrentSuggestions(INITIAL_SUGGESTIONS);
    setError(null);
    setSessionRestored(false);
    // No sessionStorage to clear
  };
  
  // ─── Render Message ──────────────────────────────────────────────────────────
  const renderMessage = (message) => {
    const isUser = message.role === 'user';
    const isTyping = message.id === typingMessageId;
    const displayContent = message.content || '';
    const fullContent = message.fullContent || message.content || '';
    
    // Format message content: Simple text rendering (no markdown processing needed)
    const formatContent = (text) => {
      if (!text) return null;
      
      // Split by lines and render as plain text
      const lines = text.split('\n');
      
      return lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <br key={lineIdx} />;
        }
        
        const isLastLine = lineIdx === lines.length - 1;
        
        return (
          <span key={lineIdx}>
            {line}
            {!isLastLine && <br />}
          </span>
        );
      });
    };
    
    return (
      <div
        key={message.id}
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          marginBottom: '16px',
          animation: 'slideUp 0.3s ease-out',
          justifyContent: isUser ? 'flex-end' : 'flex-start'
        }}
      >
        {!isUser && (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
          }}>
            <Sparkles size={16} color="#FFFFFF" />
          </div>
        )}
        
        <div style={{
          maxWidth: isUser ? '75%' : '85%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{
            padding: '12px 16px',
            borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            background: isUser 
              ? '#2563EB'
              : '#FFFFFF',
            border: isUser ? 'none' : '1px solid #E2E8F0',
            color: isUser ? '#FFFFFF' : '#0F172A',
            fontSize: '14.5px',
            lineHeight: '1.55',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
          }}>
            <div style={{ display: 'inline' }}>
              {formatContent(displayContent)}
              {/* Show blinking cursor inline with text while actively typing */}
              {isTyping && displayContent.length < fullContent.length && (
                <span style={{
                  display: 'inline',
                  color: '#2563EB',
                  marginLeft: '1px',
                  animation: 'blink 1s infinite',
                  fontSize: '14.5px',
                  lineHeight: '1.55'
                }}>|</span>
              )}
            </div>
          </div>
          
          {!isUser && message.chips && message.chips.length > 0 && !isTyping && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              {message.chips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(chip)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#2563EB',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#DBEAFE';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#EFF6FF';
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {isUser && (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <User size={16} color="#64748B" />
          </div>
        )}
      </div>
    );
  };
  
  // ─── Render UI ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating Launcher Button */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          aria-label="Open AI Chat"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 18px',
            background: '#2563EB',
            border: '1px solid #1D4ED8',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.2s ease'
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
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <Sparkles size={16} color="#FFFFFF" />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981',
              border: '2px solid #2563EB'
            }} />
          </div>
          <span style={{
            fontSize: '14.5px',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.01em'
          }}>
            Talk to AI
          </span>
        </button>
      )}
      
      {/* Chat Window */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '420px',
            maxWidth: 'calc(100vw - 48px)',
            height: '650px',
            maxHeight: 'calc(100vh - 48px)',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '20px',
            boxShadow: '0 24px 60px -8px rgba(15, 23, 42, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'slideUpFade 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                position: 'relative'
              }}>
                <Sparkles size={18} color="#FFFFFF" />
              </div>
              <div>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.01em',
                  marginBottom: '1px'
                }}>
                  ServiceTackle AI
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10B981'
                  }} />
                  {isThinking ? 'Thinking...' : 'Online • Ready to help'}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '6px' }}>
              {messages.length > 0 && (
                <button
                  onClick={resetChat}
                  title="Reset chat"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#E2E8F0';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#F1F5F9';
                  }}
                >
                  <RefreshCw size={14} color="#475569" />
                </button>
              )}
              
              <button
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FEE2E2';
                  e.currentTarget.style.borderColor = '#FCA5A5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#F1F5F9';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <X size={16} color="#475569" />
              </button>
            </div>
          </div>
          
          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            background: '#F8FAFC'
          }}>
            {/* Welcome Message */}
            {messages.length === 0 && !error && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textAlign: 'center',
                padding: '16px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={30} color="#2563EB" />
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    Hi! I'm ServiceTackle AI 👋
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.55',
                    color: '#64748B',
                    maxWidth: '300px',
                    margin: '0 auto'
                  }}>
                    I can answer questions about our AI agents, explain workflows, and demonstrate capabilities live.
                  </p>
                </div>
                
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '2px'
                  }}>
                    Try asking:
                  </div>
                  {INITIAL_SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(suggestion)}
                      style={{
                        padding: '10px 14px',
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#334155',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 3px rgba(15,23,42,0.03)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#EFF6FF';
                        e.currentTarget.style.borderColor = '#BFDBFE';
                        e.currentTarget.style.color = '#2563EB';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.color = '#334155';
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Messages */}
            {messages.map(renderMessage)}
            
            {/* Thinking Indicator */}
            {isThinking && (
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                marginBottom: '14px'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={15} color="#FFFFFF" />
                </div>
                
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '14px 14px 14px 4px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(15,23,42,0.03)'
                }}>
                  <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 500 }}>
                    ServiceTackle AI is generating...
                  </span>
                </div>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div style={{
                padding: '14px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '10px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: '#991B1B', marginBottom: '6px' }}>
                    {error.message}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => {
                        setError(null);
                        if (messages.length > 0) {
                          const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
                          if (lastUserMessage) {
                            sendMessage(lastUserMessage.content);
                          }
                        }
                      }}
                      style={{
                        padding: '4px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#991B1B',
                        background: '#FFFFFF',
                        border: '1px solid #FECACA',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Try again
                    </button>
                    <button
                      onClick={() => setError(null)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#64748B',
                        background: 'transparent',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #E2E8F0',
            background: '#FFFFFF',
            flexShrink: 0
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              {/* Voice Button */}
              {isSpeechAvailable && (
                <button
                  onClick={toggleVoice}
                  disabled={isThinking}
                  aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: isListening 
                      ? '#EF4444' 
                      : '#F1F5F9',
                    border: `1px solid ${isListening ? '#DC2626' : '#E2E8F0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isThinking ? 'not-allowed' : 'pointer',
                    opacity: isThinking ? 0.5 : 1,
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                >
                  {isListening ? (
                    <MicOff size={18} color="#FFFFFF" />
                  ) : (
                    <Mic size={18} color="#475569" />
                  )}
                </button>
              )}
              
              {/* Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder={isListening ? 'Listening...' : 'Type your question...'}
                disabled={isThinking || isListening}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  fontSize: '14px',
                  color: '#0F172A',
                  outline: 'none',
                  transition: 'all 0.15s ease'
                }}
                onFocus={e => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                }}
                onBlur={e => {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              
              {/* Send Button */}
              <button
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isThinking}
                aria-label="Send message"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: inputValue.trim() && !isThinking
                    ? '#2563EB'
                    : '#F1F5F9',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() && !isThinking ? 'pointer' : 'not-allowed',
                  opacity: inputValue.trim() && !isThinking ? 1 : 0.5,
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <Send size={16} color={inputValue.trim() && !isThinking ? '#FFFFFF' : '#94A3B8'} />
              </button>
            </div>
            
            {/* Offline Indicator */}
            {!isOnline && (
              <div style={{
                marginTop: '8px',
                padding: '6px 10px',
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: '6px',
                fontSize: '11.5px',
                color: '#92400E',
                textAlign: 'center'
              }}>
                You're currently offline
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumAIChatbot;
