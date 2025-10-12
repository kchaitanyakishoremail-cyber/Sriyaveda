import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import PartnerAuthPage from './pages/PartnerAuthPage';
import PartnerDashboardPage from './pages/PartnerDashboardPage';
import PartnerQuotationSubmissionPage from './pages/PartnerQuotationSubmissionPage';

// Components that appear on all pages
import ChatBot from './components/ChatBot';
import WhatsAppChat from './components/WhatsAppChat';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/partner/auth" element={<PartnerAuthPage />} />
          
          {/* Protected Partner Routes */}
          <Route 
            path="/partner/dashboard" 
            element={
              <ProtectedRoute>
                <PartnerDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/partner/quotation" 
            element={
              <ProtectedRoute>
                <PartnerQuotationSubmissionPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
        
        {/* Global Components - Only show on main site */}
        <Routes>
          <Route path="/" element={
            <>
              <ChatBot />
              <WhatsAppChat />
            </>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;