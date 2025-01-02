import React from 'react';
import { Link } from 'react-router-dom';

// D.C. DONE? TODO: Add necessary code to display the navigation bar and link between the pages
const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/src/pages/SavedCandidates.tsx">Potential Canidates</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
