import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Calculator from '../components/Calculator';
import Quotation from '../components/Quotation';
import ChannelPartners from '../components/ChannelPartners';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Calculator />
      <Quotation />
      <ChannelPartners />
      <Footer />
    </>
  );
};

export default HomePage;