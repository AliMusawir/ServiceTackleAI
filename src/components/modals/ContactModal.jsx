import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ContactModal = () => {
  const { isContactModalOpen, closeContact, selectedServicePrefill, showToast } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: selectedServicePrefill || '',
    otherService: '',
    message: '',
    attachment: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  
  // Update service when prefill changes
  useEffect(() => {
    if (selectedServicePrefill) {
      setFormData(prev => ({ ...prev, service: selectedServicePrefill }));
    }
  }, [selectedServicePrefill]);
  
  // Reset form when modal closes
  useEffect(() => {
    if (!isContactModalOpen) {
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          otherService: '',
          message: '',
          attachment: null
        });
        setFileName('');
        setSubmitStatus(null);
      }, 300);
    }
  }, [isContactModalOpen]);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'attachment' && files && files[0]) {
      setFormData({
        ...formData,
        attachment: files[0]
      });
      setFileName(files[0].name);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('company', formData.company);
      submitData.append('service', formData.service === 'Other' ? formData.otherService : formData.service);
      submitData.append('message', formData.message);
      
      if (formData.attachment) {
        submitData.append('attachment', formData.attachment);
      }
      
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        body: submitData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        showToast?.('Message sent! We\'ll get back to you soon.', 'success');
        setTimeout(() => {
          closeContact();
        }, 2000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (err) {
      setSubmitStatus('error');
      showToast?.('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isContactModalOpen) return null;
  
  return (
    <div
      onClick={closeContact}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'modalFadeIn 0.2s ease-out'
      }}
    >
      {/* Modal Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '20px',
          boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.25)',
          position: 'relative',
          animation: 'modalZoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          position: 'relative'
        }}>
          
          {/* Close Button Top-Right */}
          <button
            onClick={closeContact}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
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
            <X size={17} color="#475569" />
          </button>

          {/* Left Column: Value Panel */}
          <div style={{
            background: '#F8FAFC',
            borderRight: '1px solid #E2E8F0',
            padding: '36px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '100px',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#2563EB',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                <Sparkles size={13} />
                <span>Custom AI Demo</span>
              </div>

              <h2 style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '8px',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.02em',
                lineHeight: '1.25'
              }}>
                Book an AI Agent Demo
              </h2>

              <p style={{
                fontSize: '13.5px',
                lineHeight: '1.55',
                color: '#64748B',
                marginBottom: '24px'
              }}>
                See how an autonomous voice & web agent handles your customer calls, qualifies leads, and schedules appointments live.
              </p>

              {/* Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                {[
                  { title: 'Live Voice Test', desc: 'Hear the AI answer questions in your industry with sub-400ms latency.' },
                  { title: 'Workflow Blueprint', desc: 'We connect directly to your CRM, calendar, and intake channels.' },
                  { title: 'Turnkey 48h Setup', desc: 'Zero technical setup required on your end.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <CheckCircle2 size={13} color="#2563EB" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Email helper */}
            <div style={{
              padding: '12px 14px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#64748B'
            }}>
              Need immediate assistance?{' '}
              <a href="mailto:contact@servicetackle.com" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'underline' }}>
                contact@servicetackle.com
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div style={{ padding: '36px 30px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Row 1: Name & Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                      Full Name <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        fontSize: '13.5px',
                        color: '#0F172A',
                        background: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.15s ease'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#2563EB';
                        e.target.style.background = '#FFFFFF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#CBD5E1';
                        e.target.style.background = '#F8FAFC';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                      Work Email <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        fontSize: '13.5px',
                        color: '#0F172A',
                        background: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.15s ease'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#2563EB';
                        e.target.style.background = '#FFFFFF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#CBD5E1';
                        e.target.style.background = '#F8FAFC';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        fontSize: '13.5px',
                        color: '#0F172A',
                        background: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.15s ease'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#2563EB';
                        e.target.style.background = '#FFFFFF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#CBD5E1';
                        e.target.style.background = '#F8FAFC';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Plumbing & HVAC"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        fontSize: '13.5px',
                        color: '#0F172A',
                        background: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'all 0.15s ease'
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#2563EB';
                        e.target.style.background = '#FFFFFF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#CBD5E1';
                        e.target.style.background = '#F8FAFC';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Service Interest */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                    Interested Solution
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      fontSize: '13.5px',
                      color: formData.service ? '#0F172A' : '#64748B',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#2563EB';
                      e.target.style.background = '#FFFFFF';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = '#CBD5E1';
                      e.target.style.background = '#F8FAFC';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="AI Voice Agent">AI Voice Agent (Phone Reception & Booking)</option>
                    <option value="AI Web Agent">AI Web Agent (Website Lead Capture)</option>
                    <option value="Business Automation">Full Workflow & CRM Automation</option>
                    <option value="Other">Other Custom Automation</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                    What would you like to automate?
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                    placeholder="E.g., Inbound phone intake after-hours and calendar scheduling."
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      fontSize: '13.5px',
                      color: '#0F172A',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#2563EB';
                      e.target.style.background = '#FFFFFF';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = '#CBD5E1';
                      e.target.style.background = '#F8FAFC';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                    Attach a File <span style={{ color: '#94A3B8', fontWeight: 500 }}>(optional — PDF, image, doc)</span>
                  </label>
                  <label
                    htmlFor="file-upload"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 12px',
                      background: '#F8FAFC',
                      border: `1px dashed ${fileName ? '#2563EB' : '#CBD5E1'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      fontSize: '13px',
                      color: fileName ? '#2563EB' : '#64748B',
                      fontWeight: fileName ? 600 : 400
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#2563EB';
                      e.currentTarget.style.background = '#EFF6FF';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = fileName ? '#2563EB' : '#CBD5E1';
                      e.currentTarget.style.background = '#F8FAFC';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                    </svg>
                    <span>{fileName ? `📎 ${fileName}` : 'Click to attach a file (max 10 MB)'}</span>
                    {fileName && (
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          setFormData(prev => ({ ...prev, attachment: null }));
                          setFileName('');
                        }}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#EF4444',
                          fontSize: '18px',
                          lineHeight: 1,
                          padding: '0 2px'
                        }}
                        title="Remove file"
                      >×</button>
                    )}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    name="attachment"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.txt,.xls,.xlsx"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div style={{
                    padding: '10px 14px',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#166534',
                    fontSize: '13px'
                  }}>
                    <CheckCircle2 size={16} />
                    <span>Demo request received! We'll reach out within 24 hours.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    background: '#2563EB',
                    border: '1px solid #1D4ED8',
                    borderRadius: '8px',
                    cursor: isSubmitting || submitStatus === 'success' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                    marginTop: '4px'
                  }}
                  onMouseEnter={e => {
                    if (!isSubmitting && submitStatus !== 'success') {
                      e.currentTarget.style.background = '#1D4ED8';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#2563EB';
                  }}
                >
                  {isSubmitting ? (
                    <span>Sending Request...</span>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Request Sent</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Demo Request</span>
                      <Send size={15} />
                    </>
                  )}
                </button>

                <p style={{
                  fontSize: '11.5px',
                  color: '#64748B',
                  textAlign: 'center',
                  margin: '0'
                }}>
                  🔒 100% Confidential. Instant confirmation.
                </p>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
