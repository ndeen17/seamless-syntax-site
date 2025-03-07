
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import BusinessList from '@/components/BusinessList';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeatureCards />
        <BusinessList />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
