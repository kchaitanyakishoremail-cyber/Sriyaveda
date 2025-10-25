import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, Zap, Home, TrendingUp, Download, ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface CalculationResult {
  systemSize: number;
  totalCost: number;
  monthlyBill: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackPeriod: number;
  carbonOffset: number;
}

const Calculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [roofArea, setRoofArea] = useState<number>(500);
  const [location, setLocation] = useState<string>('bangalore');
  const [systemType, setSystemType] = useState<string>('grid-tie');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const locations = [
    { value: 'bangalore', label: 'Bangalore', sunHours: 5.2 },
    { value: 'mumbai', label: 'Mumbai', sunHours: 5.5 },
    { value: 'delhi', label: 'Delhi', sunHours: 5.1 },
    { value: 'chennai', label: 'Chennai', sunHours: 5.8 },
    { value: 'hyderabad', label: 'Hyderabad', sunHours: 5.3 },
    { value: 'pune', label: 'Pune', sunHours: 5.4 }
  ];

  const systemTypes = [
    { value: 'grid-tie', label: 'Grid-Tie System', multiplier: 1 },
    { value: 'hybrid', label: 'Hybrid System', multiplier: 1.3 },
    { value: 'off-grid', label: 'Off-Grid System', multiplier: 1.6 }
  ];

  const calculateSystem = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const selectedLocation = locations.find(loc => loc.value === location);
      const selectedSystem = systemTypes.find(sys => sys.value === systemType);
      
      if (!selectedLocation || !selectedSystem) return;

      // Solar calculations
      const unitsPerMonth = monthlyBill / 6; // Assuming ₹6 per unit
      const dailyUnits = unitsPerMonth / 30;
      const systemSize = Math.ceil((dailyUnits / selectedLocation.sunHours) * 1.2); // 20% buffer
      const maxSystemSize = Math.floor(roofArea / 100); // 100 sq ft per kW
      const finalSystemSize = Math.min(systemSize, maxSystemSize);
      
      const costPerKW = systemType === 'grid-tie' ? 65000 : systemType === 'hybrid' ? 85000 : 105000;
      const totalCost = finalSystemSize * costPerKW;
      const generatedUnits = finalSystemSize * selectedLocation.sunHours * 30;
      const monthlySavings = Math.min(generatedUnits * 6, monthlyBill * 0.95);
      const yearlySavings = monthlySavings * 12;
      const paybackPeriod = totalCost / yearlySavings;
      const carbonOffset = finalSystemSize * 1.5; // Tons of CO2 per year

      setResult({
        systemSize: finalSystemSize,
        totalCost,
        monthlyBill,
        monthlySavings,
        yearlySavings,
        paybackPeriod,
        carbonOffset
      });
      setIsCalculating(false);
    }, 1500);
  };

  useEffect(() => {
    if (monthlyBill > 0 && roofArea > 0) {
      const timer = setTimeout(() => {
        calculateSystem();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [monthlyBill, roofArea, location, systemType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16" direction="fade" delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Solar Savings{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your potential savings and see how solar can benefit your home or business
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <AnimatedSection direction="left" delay={0.3}>
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(249, 115, 22, 0.1)"
              }}
            >
              <div className="flex items-center mb-8">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <CalcIcon className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Enter Your Details</h3>
              </div>

              <div className="space-y-6">
                {/* Monthly Bill */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-white font-semibold mb-3">
                    Monthly Electricity Bill
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-gray-400 text-sm mt-2">
                      <span>₹1,000</span>
                      <motion.span 
                        className="text-orange-400 font-bold text-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                        key={monthlyBill}
                      >
                        {formatCurrency(monthlyBill)}
                      </motion.span>
                      <span>₹50,000</span>
                    </div>
                  </div>
                </motion.div>

                {/* Similar animations for other form elements */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-white font-semibold mb-3">
                    Available Roof Area (sq ft)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="200"
                      max="5000"
                      step="100"
                      value={roofArea}
                      onChange={(e) => setRoofArea(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-gray-400 text-sm mt-2">
                      <span>200 sq ft</span>
                      <motion.span 
                        className="text-teal-400 font-bold text-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                        key={roofArea}
                      >
                        {roofArea} sq ft
                      </motion.span>
                      <span>5,000 sq ft</span>
                    </div>
                  </div>
                </motion.div>

                {/* Location and System Type with similar animations */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-white font-semibold mb-3">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  >
                    {locations.map((loc) => (
                      <option key={loc.value} value={loc.value}>
                        {loc.label} ({loc.sunHours} sun hours/day)
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-white font-semibold mb-3">System Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {systemTypes.map((system) => (
                      <motion.button
                        key={system.value}
                        onClick={() => setSystemType(system.value)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          systemType === system.value
                            ? 'border-orange-400 bg-orange-500/20 text-orange-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-sm font-semibold">{system.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection direction="right" delay={0.5}>
            {isCalculating ? (
              <motion.div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 flex items-center justify-center h-96"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-center">
                  <motion.div 
                    className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-white text-lg">Calculating your solar savings...</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(20, 184, 166, 0.1)"
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <TrendingUp className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Your Solar Benefits</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <motion.div 
                    className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6 text-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(249, 115, 22, 0.2)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <motion.div 
                      className="text-2xl font-bold text-orange-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {result.systemSize} kW
                    </motion.div>
                    <div className="text-gray-300 text-sm">System Size</div>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(34, 197, 94, 0.2)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Home className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <motion.div 
                      className="text-2xl font-bold text-green-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      {formatCurrency(result.totalCost)}
                    </motion.div>
                    <div className="text-gray-300 text-sm">System Cost</div>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Monthly Savings', value: formatCurrency(result.monthlySavings), color: 'text-teal-400' },
                    { label: 'Yearly Savings', value: formatCurrency(result.yearlySavings), color: 'text-green-400' },
                    { label: 'Payback Period', value: `${result.paybackPeriod.toFixed(1)} years`, color: 'text-yellow-400' },
                    { label: 'CO₂ Offset (per year)', value: `${result.carbonOffset.toFixed(1)} tons`, color: 'text-emerald-400' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(55, 65, 81, 0.7)"
                      }}
                    >
                      <span className="text-gray-300">{item.label}</span>
                      <motion.span 
                        className={`${item.color} font-bold text-lg`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.value}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  className="w-full mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-5 w-5" />
                  <span>Get Detailed Quote</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
              </motion.div>
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-500/20 flex items-center justify-center h-96">
                <p className="text-gray-400 text-lg text-center">
                  Adjust the values above to see your solar savings calculation
                </p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #eab308);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #eab308);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Calculator;