import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedPapers from '../components/Home/FeaturedPapers';
import QuickStats from '../components/Home/QuickStats';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedPapers />
      <QuickStats />
    </div>
  );
};

export default Home;