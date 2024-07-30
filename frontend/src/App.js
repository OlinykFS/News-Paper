import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Aside from "./components/aside";
import PostList from "./components/post_list";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("access_token");

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Aside className="w-1/4 bg-gray-200 p-4" />
          <div className="w-3/4 p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  isAuthenticated ? <PostList /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
