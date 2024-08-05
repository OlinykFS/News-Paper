import React from 'react';
import PostList from '../PostLayouts/PostList';
import MainLayout from './MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <PostList />
    </MainLayout>
  );
};

export default Home;
