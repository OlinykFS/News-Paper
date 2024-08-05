import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/MainLayouts/Home";
import PostList from "./components/PostLayouts/PostList";
import Header from "./components/Header/header";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Profile from "./components/MainLayouts/Profile";
import SinglePostPage from "./components/MainLayouts/singlePostPage";
import Footer from "./components/Footer/footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-100 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post-list" element={<PostList />} />
              <Route path="/posts/:id" element={<SinglePostPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
