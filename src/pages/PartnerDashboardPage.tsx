import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PartnerSummary from '../components/PartnerSummary';
import PartnerQuotationList from '../components/PartnerQuotationList';
import { Plus, LogOut, Home } from 'lucide-react';

const PartnerDashboardPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Partner Dashboard</h1>
            <p className="text-gray-300">Manage your quotations and track your performance</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/partner/quotation')}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Quotation</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="border-2 border-teal-400 text-teal-400 px-6 py-3 rounded-xl font-semibold hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Main Site</span>
            </button>
            
            <button
              onClick={handleSignOut}
              className="border-2 border-red-400 text-red-400 px-6 py-3 rounded-xl font-semibold hover:bg-red-400 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          <PartnerSummary />
          <PartnerQuotationList />
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardPage;