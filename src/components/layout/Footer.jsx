import React from 'react';
import { Link } from '../../context/RouterContext';
import { MessageSquare, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      padding: '70px 0 35px',
      color: '#475569'
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare size={17} color="#FFFFFF" />
              </div>
              <span style={{
                fontSize: '19px',
                fontWeight: 800,
                color: '#0F172A',
                fontFamily: 'var(--font-heading)'
              }}>
                ServiceTackle <span style={{ color: '#2563EB' }}>AI</span>
              </span>
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.65',
              color: '#64748B',
              marginBottom: '20px'
            }}>
              Autonomous AI phone receptionists and workflow automation agents for high-growth service businesses.
            </p>
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              {/* Social links */}
              <a
                href="https://www.linkedin.com/company/servicetackleai/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  color: '#475569',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 700
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#BFDBFE';
                  e.currentTarget.style.color = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F1F5F9';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                in
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#0F172A',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Products
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <li>
                <Link
                  to="/products"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  AI Voice Agent
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  AI Web Agent
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  Integrations & Workflows
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#0F172A',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Company
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <li>
                <Link
                  to="/about"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  Contact & Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#0F172A',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Get in Touch
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: '#475569'
              }}>
                <Mail size={16} style={{ color: '#2563EB' }} />
                <a
                  href="mailto:contact@servicetackle.com"
                  style={{
                    color: '#475569',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                >
                  contact@servicetackle.com
                </a>
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '14px',
                color: '#64748B'
              }}>
                <MapPin size={16} style={{ color: '#2563EB', marginTop: '2px' }} />
                <span>
                  Remote-first<br />
                  Serving businesses worldwide
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} ServiceTackle AI. All rights reserved.
          </div>
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/privacy"
              style={{
                color: '#64748B',
                textDecoration: 'none',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={{
                color: '#64748B',
                textDecoration: 'none',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
