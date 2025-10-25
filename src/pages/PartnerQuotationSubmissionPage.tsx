import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { FileText, User, Phone, Mail, Zap, Settings, CheckCircle, ArrowLeft } from 'lucide-react';

interface QuotationData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  system_size: number;
  panel_brand: string;
  inverter_brand: string;
  wiring_brand: string;
}

const PartnerQuotationSubmissionPage = () => {
  const { partner } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<QuotationData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    system_size: 5,
    panel_brand: 'tata',
    inverter_brand: 'luminous',
    wiring_brand: 'polycab'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const panelBrands = [
    { value: 'tata', label: 'Tata Solar', price: 25 },
    { value: 'adani', label: 'Adani Solar', price: 28 },
    { value: 'vikram', label: 'Vikram Solar', price: 24 },
    { value: 'waaree', label: 'Waaree Solar', price: 26 },
    { value: 'luminous', label: 'Luminous Solar', price: 27 }
  ];

  const inverterBrands = [
    { value: 'luminous', label: 'Luminous', price: 15000 },
    { value: 'microtek', label: 'Microtek', price: 14000 },
    { value: 'sukam', label: 'Sukam', price: 16000 },
    { value: 'exide', label: 'Exide', price: 15500 },
    { value: 'delta', label: 'Delta', price: 18000 }
  ];

  const wiringBrands = [
    { value: 'polycab', label: 'Polycab', price: 2000 },
    { value: 'havells', label: 'Havells', price: 2200 },
    { value: 'finolex', label: 'Finolex', price: 1800 },
    { value: 'kei', label: 'KEI', price: 2100 }
  ];

  const calculateTotalCost = () => {
    const selectedPanel = panelBrands.find(p => p.value === formData.panel_brand);
    const selectedInverter = inverterBrands.find(i => i.value === formData.inverter_brand);
    const selectedWiring = wiringBrands.find(w => w.value === formData.wiring_brand);

    if (!selectedPanel || !selectedInverter || !selectedWiring) return 0;

    const panelCost = formData.system_size * 1000 * selectedPanel.price;
    const inverterCost = Math.ceil(formData.system_size / 5) * selectedInverter.price;
    const wiringCost = formData.system_size * selectedWiring.price;
    const installationCost = formData.system_size * 8000;
    const otherCosts = formData.system_size * 5000;

    return panelCost + inverterCost + wiringCost + installationCost + otherCosts;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner) return;

    setIsSubmitting(true);

    try {
      const totalCost = calculateTotalCost();
      
      const { error } = await supabase
        .from('partner_quotations')
        .insert([
          {
            partner_id: partner.id,
            ...formData,
            total_cost: totalCost
          }
        ]);

      if (error) {
        console.error('Error submitting quotation:', error);
        alert('Error submitting quotation. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quotation:', error);
      alert('Error submitting quotation. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-green-500/20 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-400 mb-4">Quotation Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Your quotation for {formData.customer_name} has been successfully submitted and saved to your dashboard.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  customer_name: '',
                  customer_email: '',
                  customer_phone: '',
                  system_size: 5,
                  panel_brand: 'tata',
                  inverter_brand: 'luminous',
                  wiring_brand: 'polycab'
                });
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105"
            >
              Submit Another Quotation
            </button>
            <button
              onClick={() => navigate('/partner/dashboard')}
              className="w-full border-2 border-teal-400 text-teal-400 py-3 rounded-xl font-semibold hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/partner/dashboard')}
            className="mr-4 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Submit New Quotation</h1>
            <p className="text-gray-300">Create a quotation for your customer</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Customer & System Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Customer Information</h3>
                
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    placeholder="Enter customer's full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                      placeholder="+91 9999999999"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* System Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">System Configuration</h3>
                
                <div>
                  <label className="block text-white font-semibold mb-3">
                    <Zap className="inline h-4 w-4 mr-2" />
                    System Size: {formData.system_size} kW
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={formData.system_size}
                    onChange={(e) => setFormData({...formData, system_size: Number(e.target.value)})}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Panel Brand</label>
                    <select
                      value={formData.panel_brand}
                      onChange={(e) => setFormData({...formData, panel_brand: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      {panelBrands.map((brand) => (
                        <option key={brand.value} value={brand.value}>
                          {brand.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Inverter Brand</label>
                    <select
                      value={formData.inverter_brand}
                      onChange={(e) => setFormData({...formData, inverter_brand: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      {inverterBrands.map((brand) => (
                        <option key={brand.value} value={brand.value}>
                          {brand.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Wiring Brand</label>
                    <select
                      value={formData.wiring_brand}
                      onChange={(e) => setFormData({...formData, wiring_brand: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      {wiringBrands.map((brand) => (
                        <option key={brand.value} value={brand.value}>
                          {brand.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Settings className="h-5 w-5" />
                    <span>Submit Quotation</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preview */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Quotation Preview</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">System Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">System Size:</span>
                    <span className="text-orange-400 font-semibold">{formData.system_size} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Solar Panels:</span>
                    <span className="text-teal-400">{panelBrands.find(p => p.value === formData.panel_brand)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Inverter:</span>
                    <span className="text-teal-400">{inverterBrands.find(i => i.value === formData.inverter_brand)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Wiring:</span>
                    <span className="text-teal-400">{wiringBrands.find(w => w.value === formData.wiring_brand)?.label}</span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total Cost:</span>
                    <span className="text-green-400">{formatCurrency(calculateTotalCost())}</span>
                  </div>
                </div>
              </div>

              {formData.customer_name && (
                <div className="bg-gray-700/50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Customer Details</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300"><span className="text-orange-400">Name:</span> {formData.customer_name}</p>
                    <p className="text-gray-300"><span className="text-orange-400">Phone:</span> {formData.customer_phone}</p>
                    <p className="text-gray-300"><span className="text-orange-400">Email:</span> {formData.customer_email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerQuotationSubmissionPage;