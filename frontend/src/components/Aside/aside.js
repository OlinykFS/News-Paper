import React from 'react';

const Aside = ({ className }) => {
  return (
    <aside className={`p-4 bg-white shadow-md rounded-lg ${className}`}>
      <div className="top-stories">
        <h2 className="text-xl font-bold mb-4">Top Stories</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-600">Lesson Learned As A Designer-Founder</li>
          <li className="hover:text-gray-600">A Complete Guide To Live Validation UX</li>
          <li className="hover:text-gray-600">Building A Retro Draggable Web</li>
          <li className="hover:text-gray-600">Rethinking Star Ratings For Readers</li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
