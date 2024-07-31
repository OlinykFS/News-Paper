import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Aside from "./components/Aside/aside";
import PostList from "./components/MainLayouts/post_list";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <div className="w-3/4 p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PostList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Aside className="w-1/4 bg-gray-200 p-4" />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;