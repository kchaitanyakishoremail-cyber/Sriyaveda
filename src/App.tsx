import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Quotation from './components/Quotation';
import ChannelPartners from './components/ChannelPartners';
import ChatBot from './components/ChatBot';
import WhatsAppChat from './components/WhatsAppChat';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-colors duration-500">
      <Header />
      <ThemeToggle />
      <Hero />
      <About />
      <Services />
      <Calculator />
      <Quotation />
      <ChannelPartners />
      <Footer />
      <ChatBot />
      <WhatsAppChat />
    </div>
  );
}

export default App;