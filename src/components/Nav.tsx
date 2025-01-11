import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
}

// TODO: Add necessary code to display the navigation bar and link between the pages
const Nav: React.FC = () => {
  const navLinks: NavLinkProps[] = [
    { to: '/src/pages/CandidateSearch.tsx', label: 'Home' },
    { to: '/src/pages/SavedCandidates.tsx', label: 'Potential Candidates' }
  ];

  return (
    <nav className="nav">
      <ul className='nav-item'>
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
