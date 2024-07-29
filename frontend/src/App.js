import React from 'react';
import PostList from './components/post_list';
import Header from './components/header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <PostList />
    </div>
  );
};

export default App;
