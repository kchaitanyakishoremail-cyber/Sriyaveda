import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Quotation from './components/Quotation';
import OrderTracking from './components/OrderTracking';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />
      <Hero />
      <About />
      <Services />
      <Calculator />
      <Quotation />
      <OrderTracking />
      <Footer />
    </div>
  );
}

export default App;