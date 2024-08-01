import React from 'react';

const Footer = () => {
  return (
    <footer className="bottom-0 min-w-full absolute bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <nav>
          <ul className="flex justify-around">
            <li className="hover:text-gray-400">About</li>
            <li className="hover:text-gray-400">Contact</li>
            <li className="hover:text-gray-400">Source</li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
