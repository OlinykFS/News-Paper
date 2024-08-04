import React from 'react';
import PostList from '../PostLayouts/PostList';
import MainLayout from './MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <PostList className="mb-8" />
    </MainLayout>
  );
};

export default Home;