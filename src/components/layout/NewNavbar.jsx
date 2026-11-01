import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, Phone, MessageSquare, ChevronDown } from 'lucide-react';
import { Link, useRouter } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';

const NewNavbar = ({ onOpenMobileMenu }) => {
  const { openContact } = useApp();
  const { currentPath, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsProductsOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 200);
  };

  const productsDropdown = [
    { 
      title: 'Voice Agent', 
      icon: Phone, 
      color: '#34D399',
      description: 'Your AI employee on the phone',
      action: () => {
        navigate('/products');
        setTimeout(() => {
          document.getElementById('voice-agent-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    { 
      title: 'Web Agent', 
      icon: MessageSquare, 
      color: '#38BDF8',
      description: 'Your AI employee on your website',
      action: () => {
        navigate('/products');
        setTimeout(() => {
          const element = document.querySelector('[data-web-agent-section]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  ];

  return (
    <header className="site-header">
      <div className="container nav-inner" style={{ flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" style={{ 
          whiteSpace: 'nowrap', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          flexShrink: 0 
        }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '10px', 
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)', 
            flexShrink: 0 
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 16L9 9L14 14L19 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="4" cy="16" r="2" fill="#38BDF8"/>
              <circle cx="19" cy="7" r="2" fill="#38BDF8"/>
            </svg>
          </div>
          <span style={{ 
            fontSize: '18px', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            whiteSpace: 'nowrap' 
          }}>
            ServiceTackle <span style={{ color: '#38BDF8' }}>AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu" style={{ gap: '24px', alignItems: 'center' }}>
          
          {/* Products Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="nav-link"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                whiteSpace: 'nowrap',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: isProductsOpen ? '#FFFFFF' : ''
              }}
            >
              <span>Products</span>
              <ChevronDown 
                size={14} 
                style={{ 
                  transform: isProductsOpen ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s' 
                }} 
              />
            </button>

            {isProductsOpen && (
              <div
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: '320px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '10px',
                  boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 100
                }}
              >
                {productsDropdown.map((product, idx) => {
                  const Icon = product.icon;
                  return (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProductsOpen(false);
                        product.action();
                      }}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease',
                        background: 'transparent',
                        border: '1px solid transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%'
                      }}
                      className="dropdown-item"
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={18} color="#2563EB" />
                      </div>
                      <div>
                        <div style={{ 
                          fontSize: '14px', 
                          fontWeight: 700, 
                          color: '#0F172A',
                          marginBottom: '2px'
                        }}>
                          {product.title}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#64748B',
                          lineHeight: '1.4'
                        }}>
                          {product.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Link to="/solutions" className="nav-link" style={{ whiteSpace: 'nowrap' }}>
            Solutions
          </Link>
          
          <Link to="/how-it-works" className="nav-link" style={{ whiteSpace: 'nowrap' }}>
            How It Works
          </Link>
          
          <Link to="/pricing" className="nav-link" style={{ whiteSpace: 'nowrap' }}>
            Pricing
          </Link>
          
          <Link to="/about" className="nav-link" style={{ whiteSpace: 'nowrap' }}>
            About
          </Link>

          <Link to="/contact" className="nav-link" style={{ whiteSpace: 'nowrap' }}>
            Contact
          </Link>
        </nav>

        {/* Action Buttons & Mobile Menu Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => openContact('Navbar CTA')}
            className="btn btn-primary btn-sm"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>Book a Demo</span>
            <ArrowRight size={14} />
          </button>

          {/* Hamburger for Mobile */}
          <button
            onClick={onOpenMobileMenu}
            className="btn btn-secondary btn-sm"
            style={{ 
              padding: '8px 10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
            aria-label="Open Mobile Menu"
            id="mobile-menu-toggle"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NewNavbar;
