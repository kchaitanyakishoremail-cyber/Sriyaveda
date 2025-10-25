import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sun, Battery, Leaf } from 'lucide-react';
import { useParallax } from '../hooks/useScrollAnimation';

const Hero = () => {
  const [animationActive, setAnimationActive] = useState(false);
  const scrollY = useParallax();

  useEffect(() => {
    setAnimationActive(true);
  }, []);

  const features = [
    { icon: Sun, text: 'Solar Installation', color: 'text-orange-400' },
    { icon: Battery, text: 'Energy Storage', color: 'text-green-400' },
    { icon: Leaf, text: 'Eco-Friendly', color: 'text-teal-400' },
    { icon: Zap, text: 'Grid Connection', color: 'text-yellow-400' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        {/* Floating Solar Panels */}
        <motion.div 
          className="absolute top-20 left-10 w-16 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform rotate-12 opacity-20"
          animate={{
            y: [0, -10, 0],
            rotate: [12, 15, 12],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-20 h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform -rotate-12 opacity-20"
          animate={{
            y: [0, 15, 0],
            rotate: [-12, -8, -12],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform rotate-45 opacity-20"
          animate={{
            y: [0, -8, 0],
            rotate: [45, 50, 45],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Sun Rays */}
        <motion.div 
          className="absolute top-20 right-10 w-32 h-32"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-orange-400 to-transparent rounded-full"></div>
        </motion.div>
        
        {/* Energy Flow Lines */}
        <div className="absolute inset-0 hidden md:block">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 bg-gradient-to-t from-transparent via-orange-400 to-transparent opacity-30 animate-pulse`}
              style={{
                left: `${20 + i * 15}%`,
                height: '100%',
                animationDelay: `${i * 500}ms`,
                transform: `rotate(${Math.random() * 20 - 10}deg)`
              }}
            ></div>
          ))}
        </div>
        
        {/* Mobile-friendly background elements */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-20 bg-gradient-to-t from-transparent via-orange-400 to-transparent opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-16 bg-gradient-to-t from-transparent via-teal-400 to-transparent opacity-20 animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-12 bg-gradient-to-t from-transparent via-yellow-400 to-transparent opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Logo Area */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center items-center space-x-4 mb-6">
              <motion.div 
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="h-16 w-16 text-orange-500" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-30"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="text-left">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  SRIYAVEDA
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-teal-400 font-semibold"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  SOLAR ENERGIES
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Power Your Future with
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {' '}Clean Energy
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Transform your home or business with premium solar installations. 
            Save money, reduce carbon footprint, and join the renewable energy revolution.
          </motion.p>

          {/* Feature Icons */}
          <motion.div 
            className="flex justify-center space-x-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color} transition-all duration-300`} />
                  </motion.div>
                  <div className={`absolute inset-0 bg-current rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <span className="text-sm text-gray-400 mt-2 group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button 
              className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 flex items-center space-x-2"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-semibold">Get Free Quote</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </motion.button>
            
            <motion.button 
              className="group border-2 border-teal-400 text-teal-400 px-8 py-4 rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/30"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgb(45, 212, 191)",
                color: "black"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-semibold">Learn More</span>
              <div className="absolute inset-0 bg-teal-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            {[
              { number: '500+', label: 'Installations' },
              { number: '98%', label: 'Satisfaction' },
              { number: '25+', label: 'Years Warranty' },
              { number: '₹50L+', label: 'Savings Generated' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-orange-400 group-hover:text-orange-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-orange-400 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;