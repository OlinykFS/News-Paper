import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">News Paper</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li className="relative group">
              <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                Menu
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ul className="py-1">
                  <li>
                    <Link
                      to="/my-posts"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      My Posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user-post"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      User Post
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news-post"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      News Post
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
