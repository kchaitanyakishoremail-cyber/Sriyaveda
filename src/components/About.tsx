import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Wrench } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Premium solar panels with 25+ years warranty and certified installations.',
      color: 'text-blue-400'
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Certified solar engineers with decades of combined experience.',
      color: 'text-green-400'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Dedicated support from consultation to post-installation maintenance.',
      color: 'text-orange-400'
    },
    {
      icon: Wrench,
      title: 'Professional Service',
      description: 'Complete installation, maintenance, and monitoring services.',
      color: 'text-teal-400'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16" direction="fade" delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Sriyaveda Solar
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leading solar energy solutions provider, transforming homes and businesses 
            with sustainable, cost-effective renewable energy systems.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <AnimatedSection direction="left" delay={0.3}>
            <div className="space-y-6">
              <motion.div 
                className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-8"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To make clean, renewable energy accessible and affordable for everyone. 
                  We're committed to reducing carbon footprints while maximizing savings 
                  through innovative solar solutions.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-2xl p-8"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(20, 184, 166, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us</h3>
                <ul className="text-gray-300 space-y-2">
                  {[
                    'Premium quality components from top manufacturers',
                    'End-to-end service from design to maintenance',
                    'Competitive pricing with flexible financing options',
                    '24/7 monitoring and support services'
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-orange-400 rounded-full mr-3"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Stats/Visual */}
          <AnimatedSection direction="right" delay={0.5}>
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { number: '500+', label: 'Happy Customers', color: 'text-orange-400' },
                  { number: '5MW+', label: 'Installed Capacity', color: 'text-teal-400' },
                  { number: '25+', label: 'Years Experience', color: 'text-green-400' },
                  { number: '98%', label: 'Satisfaction Rate', color: 'text-yellow-400' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="group cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      y: -5
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className={`text-3xl font-bold ${stat.color} group-hover:scale-110`}
                      animate={{ 
                        textShadow: [
                          "0 0 0px currentColor",
                          "0 0 10px currentColor",
                          "0 0 0px currentColor"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 group-hover:text-white transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Values Grid */}
        <AnimatedSection direction="up" delay={0.7}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.1)"
                }}
              >
                <div className="relative mb-4">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className={`h-12 w-12 ${value.color} group-hover:animate-bounce transition-all duration-300`} />
                  </motion.div>
                  <motion.div 
                    className={`absolute inset-0 bg-current rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}
                    whileHover={{ scale: 1.5 }}
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;