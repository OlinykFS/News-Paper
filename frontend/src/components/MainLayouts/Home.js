import React from 'react';
import Footer from '../Footer/footer';
import Aside from '../Aside/aside';
import PostList from '../PostLayouts/PostList';

const Home = () => {
  return (
    <div className="bg-black-100 min-h-screen">
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PostList className="mb-8" />
          </div>
          <Aside className="lg:col-span-1" />
        </div>
      </main>
    
    </div>
  );
};

export default Home;
