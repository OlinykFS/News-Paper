import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 bottom-0 text-white py-4">
      <div className="">
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
