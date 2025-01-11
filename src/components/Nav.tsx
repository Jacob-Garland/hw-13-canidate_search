import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/SavedCandidates">Saved Candidates</Link>
      </nav>
    </div>
  )
};

export default Nav;