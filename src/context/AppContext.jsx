import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Modals
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedServicePrefill, setSelectedServicePrefill] = useState('');
  const [pendingChatMessage, setPendingChatMessage] = useState(null);
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', duration = 4500) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const openContact = (serviceName = '') => {
    setSelectedServicePrefill(serviceName);
    setIsContactModalOpen(true);
  };

  const closeContact = () => {
    setIsContactModalOpen(false);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const sendMessageToChat = (message) => {
    setPendingChatMessage(message);
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsContactModalOpen(false);
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        toggleChat,
        sendMessageToChat,
        pendingChatMessage,
        setPendingChatMessage,
        isContactModalOpen,
        openContact,
        closeContact,
        selectedServicePrefill,
        toast,
        showToast,
        setToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
