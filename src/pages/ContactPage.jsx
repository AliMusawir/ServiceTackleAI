import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ShieldCheck, Sparkles, Send, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ContactPage = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Voice Agent',
    message: '',
    attachment: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment' && files && files[0]) {
      setFormData(prev => ({ ...prev, attachment: files[0] }));
      setFileName(files[0].name);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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
      submitData.append('service', formData.service);
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
        showToast?.('Demo request received! We will reach out within 2 hours.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'AI Voice Agent',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Failed to send request');
      }
    } catch (err) {
      setSubmitStatus('error'); showToast?.('Unable to send your request. Please try again or email contact@servicetackle.com.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '120px', paddingBottom: '90px' }}>
      <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px' }}>
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
            <Sparkles size={14} />
            <span>Schedule a Demo</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 3.6vw, 42px)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '14px',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.025em',
            color: '#0F172A'
          }}>
            Talk to an AI Automation Expert
          </h1>
          <p style={{
            fontSize: '15.5px',
            lineHeight: '1.6',
            color: '#64748B'
          }}>
            See a live demo configured for your industry, test sub-second voice latency, and discover how to automate your inbound operations.
          </p>
        </div>

        {/* 2-Column Main Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '48px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Value Proof & Contact Info */}
          <div>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#0F172A',
              marginBottom: '16px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em'
            }}>
              What happens on your call:
            </h2>

            {/* Feature points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                {
                  title: 'Live Custom Voice Demo',
                  desc: 'Test an AI phone receptionist live with your own business services and FAQs.',
                  icon: Phone,
                  color: '#2563EB'
                },
                {
                  title: 'Full Workflow Architecture',
                  desc: 'We will map your calendar, CRM, spreadsheets, and dispatch rules.',
                  icon: Sparkles,
                  color: '#059669'
                },
                {
                  title: 'Fast 48-Hour Turnaround',
                  desc: 'Zero tech skills needed. We build, connect, test, and deploy everything turnkey.',
                  icon: Clock,
                  color: '#D97706'
                },
                {
                  title: 'Secure & Enterprise Ready',
                  desc: 'Encrypted connections, 99.9% uptime SLA, and human handoff fallback.',
                  icon: ShieldCheck,
                  color: '#7C3AED'
                }
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '16px 18px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#0F172A',
                      marginBottom: '2px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '13.5px',
                      lineHeight: '1.5',
                      color: '#64748B',
                      margin: 0
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Contact Card */}
            <div style={{
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '14px',
              padding: '20px 24px'
            }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 800,
                color: '#1E40AF',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Prefer Direct Communication?
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#1E3A8A' }}>
                  <Mail size={16} color="#2563EB" />
                  <a href="mailto:contact@servicetackle.com" style={{ color: '#1E40AF', fontWeight: 600, textDecoration: 'underline' }}>
                    contact@servicetackle.com
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Clock size={16} color="#2563EB" />
                  <span>Average response time: <strong>under 2 hours</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <MapPin size={16} color="#2563EB" />
                  <span>Remote-first • Serving clients worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form Container */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '16px',
            padding: '36px 32px',
            boxShadow: '0 16px 40px -8px rgba(15, 23, 42, 0.08)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#0F172A',
              marginBottom: '6px',
              fontFamily: 'var(--font-heading)'
            }}>
              Request Your 1-on-1 AI Demo
            </h2>
            <p style={{
              fontSize: '13.5px',
              color: '#64748B',
              marginBottom: '24px'
            }}>
              Fill out the form below and we will prepare a live demo configured for your business.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Row 1: Name & Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
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
                        padding: '10px 14px',
                        fontSize: '14px',
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
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
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
                        padding: '10px 14px',
                        fontSize: '14px',
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '14px'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
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
                        padding: '10px 14px',
                        fontSize: '14px',
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
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Services Inc."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        fontSize: '14px',
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
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Primary AI Solution Needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      fontSize: '14px',
                      color: '#0F172A',
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
                    <option value="Full Workflow Automation">Full Workflow & CRM Automation</option>
                    <option value="Other Custom AI">Other Custom Solution</option>
                  </select>
                </div>

                {/* Message / Details */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Tell us about your business & goals
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="E.g., We get ~30 inbound calls a day and need an AI to answer after hours, qualify the customer, and book appointments into ServiceTitan."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      fontSize: '14px',
                      color: '#0F172A',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      outline: 'none',
                      resize: 'vertical',
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
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Attach a File <span style={{ color: '#94A3B8', fontWeight: 500 }}>(optional — PDF, doc, image)</span>
                  </label>
                  <label
                    htmlFor="contact-page-file"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      background: '#F8FAFC',
                      border: `1px dashed ${fileName ? '#2563EB' : '#CBD5E1'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      fontSize: '13.5px',
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
                          fontSize: '20px',
                          lineHeight: 1,
                          padding: '0 2px'
                        }}
                        title="Remove file"
                      >×</button>
                    )}
                  </label>
                  <input
                    id="contact-page-file"
                    type="file"
                    name="attachment"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.txt,.xls,.xlsx"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Status Message */}
                {submitStatus === 'success' && (
                  <div style={{
                    padding: '12px 16px',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#166534'
                  }}>
                    <CheckCircle2 size={18} />
                    <span style={{ fontSize: '13.5px', fontWeight: 600 }}>
                      Thank you! Your request has been received. We will reach out within 2 hours.
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '15px',
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
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
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
                    <span>Submitting Request...</span>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Request Sent Successfully</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Demo Request</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p style={{
                  fontSize: '12px',
                  color: '#64748B',
                  textAlign: 'center',
                  margin: '4px 0 0'
                }}>
                  🔒 100% Confidential. No spam. Instant confirmation.
                </p>

              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
