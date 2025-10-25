import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase, PartnerQuotation } from '../lib/supabase';
import { TrendingUp, Users, Calendar, DollarSign, Target, Award } from 'lucide-react';

const PartnerSummary = () => {
  const { partner } = useAuth();
  const [stats, setStats] = useState({
    totalQuotations: 0,
    todayQuotations: 0,
    totalValue: 0,
    conversionRate: 0,
    statusBreakdown: {
      new: 0,
      contacted: 0,
      converted: 0,
      lost: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (partner) {
      fetchStats();
    }
  }, [partner]);

  const fetchStats = async () => {
    if (!partner) return;

    try {
      const { data: quotations, error } = await supabase
        .from('partner_quotations')
        .select('*')
        .eq('partner_id', partner.id);

      if (error) {
        console.error('Error fetching quotations:', error);
        return;
      }

      const today = new Date().toDateString();
      const todayQuotations = quotations?.filter(q => 
        new Date(q.date_submitted).toDateString() === today
      ).length || 0;

      const totalValue = quotations?.reduce((sum, q) => sum + (q.total_cost || 0), 0) || 0;
      
      const statusBreakdown = quotations?.reduce((acc, q) => {
        acc[q.status] = (acc[q.status] || 0) + 1;
        return acc;
      }, { new: 0, contacted: 0, converted: 0, lost: 0 }) || { new: 0, contacted: 0, converted: 0, lost: 0 };

      const conversionRate = quotations?.length > 0 
        ? (statusBreakdown.converted / quotations.length) * 100 
        : 0;

      setStats({
        totalQuotations: quotations?.length || 0,
        todayQuotations,
        totalValue,
        conversionRate,
        statusBreakdown
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    } finally {
      setLoading(false);
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, {partner?.name}!</h2>
          <p className="text-gray-300">Here's your performance overview</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
          <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-400">{stats.totalQuotations}</div>
          <div className="text-gray-300 text-sm">Total Quotations</div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
          <Calendar className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-400">{stats.todayQuotations}</div>
          <div className="text-gray-300 text-sm">Today's Quotations</div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
          <DollarSign className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-400">{formatCurrency(stats.totalValue)}</div>
          <div className="text-gray-300 text-sm">Total Value</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
          <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-400">{stats.conversionRate.toFixed(1)}%</div>
          <div className="text-gray-300 text-sm">Conversion Rate</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-orange-400" />
            Status Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">New Leads</span>
              <span className="text-blue-400 font-semibold">{stats.statusBreakdown.new}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Contacted</span>
              <span className="text-yellow-400 font-semibold">{stats.statusBreakdown.contacted}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Converted</span>
              <span className="text-green-400 font-semibold">{stats.statusBreakdown.converted}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Lost</span>
              <span className="text-red-400 font-semibold">{stats.statusBreakdown.lost}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Partner Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Business Type</span>
              <span className="text-orange-400 font-semibold capitalize">{partner?.business_type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Phone</span>
              <span className="text-teal-400 font-semibold">{partner?.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Email</span>
              <span className="text-purple-400 font-semibold">{partner?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Member Since</span>
              <span className="text-green-400 font-semibold">
                {partner?.created_at ? new Date(partner.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSummary;