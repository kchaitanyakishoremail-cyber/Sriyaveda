import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase, PartnerQuotation } from '../lib/supabase';
import { FileText, Eye, CreditCard as Edit, Calendar, Phone, Mail, Zap } from 'lucide-react';

const PartnerQuotationList = () => {
  const { partner } = useAuth();
  const [quotations, setQuotations] = useState<PartnerQuotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState<PartnerQuotation | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    if (partner) {
      fetchQuotations();
    }
  }, [partner]);

  const fetchQuotations = async () => {
    if (!partner) return;

    try {
      const { data, error } = await supabase
        .from('partner_quotations')
        .select('*')
        .eq('partner_id', partner.id)
        .order('date_submitted', { ascending: false });

      if (error) {
        console.error('Error fetching quotations:', error);
        return;
      }

      setQuotations(data || []);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuotationStatus = async (quotationId: string, newStatus: string) => {
    setUpdatingStatus(quotationId);
    
    try {
      const { error } = await supabase
        .from('partner_quotations')
        .update({ status: newStatus })
        .eq('id', quotationId);

      if (error) {
        console.error('Error updating status:', error);
        return;
      }

      // Update local state
      setQuotations(prev => 
        prev.map(q => 
          q.id === quotationId ? { ...q, status: newStatus as any } : q
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'contacted': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'converted': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'lost': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Quotations</h2>
        </div>
        <div className="text-gray-400">
          Total: {quotations.length}
        </div>
      </div>

      {quotations.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No quotations submitted yet</p>
          <p className="text-gray-500">Start by submitting your first quotation</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotations.map((quotation) => (
            <div
              key={quotation.id}
              className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-lg font-bold text-white">{quotation.customer_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(quotation.status)}`}>
                      {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Zap className="h-4 w-4 mr-2 text-orange-400" />
                      {quotation.system_size} kW System
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Phone className="h-4 w-4 mr-2 text-teal-400" />
                      {quotation.customer_phone}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail className="h-4 w-4 mr-2 text-purple-400" />
                      {quotation.customer_email}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-green-400" />
                      {new Date(quotation.date_submitted).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xl font-bold text-green-400">
                    {formatCurrency(quotation.total_cost)}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setSelectedQuotation(quotation)}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  
                  <select
                    value={quotation.status}
                    onChange={(e) => updateQuotationStatus(quotation.id, e.target.value)}
                    disabled={updatingStatus === quotation.id}
                    className="px-4 py-2 bg-gray-600 text-white rounded-xl border border-gray-500 focus:border-orange-400 focus:outline-none transition-colors"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quotation Detail Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Quotation Details</h3>
              <button
                onClick={() => setSelectedQuotation(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300"><span className="text-orange-400">Name:</span> {selectedQuotation.customer_name}</p>
                    <p className="text-gray-300"><span className="text-orange-400">Email:</span> {selectedQuotation.customer_email}</p>
                    <p className="text-gray-300"><span className="text-orange-400">Phone:</span> {selectedQuotation.customer_phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">System Details</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300"><span className="text-teal-400">System Size:</span> {selectedQuotation.system_size} kW</p>
                    <p className="text-gray-300"><span className="text-teal-400">Panel Brand:</span> {selectedQuotation.panel_brand}</p>
                    <p className="text-gray-300"><span className="text-teal-400">Inverter:</span> {selectedQuotation.inverter_brand}</p>
                    <p className="text-gray-300"><span className="text-teal-400">Wiring:</span> {selectedQuotation.wiring_brand}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total System Cost:</span>
                  <span className="text-2xl font-bold text-green-400">{formatCurrency(selectedQuotation.total_cost)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300">Submitted on:</span>
                <span className="text-orange-400">{new Date(selectedQuotation.date_submitted).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerQuotationList;