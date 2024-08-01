import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/MainLayouts/Home';
import PostList from './components/PostLayouts/PostList';
import Header from './components/Header/header'; 
import { AuthProvider, AuthContext } from './Context/AuthContext'; 
import Login from './components/auth/login';
import Register from './components/auth/register'; 
import Profile from './components/MainLayouts/Profile';
import SinglePost from './components/PostLayouts/SinglePost'; 

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);

  console.log('ProtectedRoute isAuthenticated:', isAuthenticated); 
  console.log('ProtectedRoute loading:', loading);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>; 
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-list" element={<PostList />} />
          <Route path="/posts/:id" element={<SinglePost />} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
