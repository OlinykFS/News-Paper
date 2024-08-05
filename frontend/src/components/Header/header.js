import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">News Paper</div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
            <li><Link to="/news" className="text-gray-600 hover:text-gray-900">News Category</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/my-posts" className="text-gray-600 hover:text-gray-900">My Posts</Link></li>
                <li><Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link></li>
                <li><button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link></li>
                <li><Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
