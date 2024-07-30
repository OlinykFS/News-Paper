import React from 'react';

const Aside = ({ className }) => {
  return (
    <aside className={className}>
      <div className="top-stories">
        <h2>Top Stories</h2>
        <ul>
          <li>Lesson Learned As A Designer-Founder</li>
          <li>A Complete Guide To Live Validation UX</li>
          <li>Building A Retro Draggable Web</li>
          <li>Rethinking Star Ratings For Readers</li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
