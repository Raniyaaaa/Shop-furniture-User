import React from 'react';
import Slider from '../components/Slider';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div>
      <Slider />
      <CategoryList />
      <ProductList />
      </div>
  );
};

export default Home;
