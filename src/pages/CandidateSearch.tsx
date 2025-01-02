import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import ErrorPage from './ErrorPage';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    login: '',
    avatar_url: '',
    email: '',
    location: '',
    company: '',
    bio: ''
  });

  useEffect(() => {
    fetchCandidate()
  }, []);

  const fetchCandidate = async () => {
    try {
      const users = await searchGithub();
      if (users.length > 0) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const candidateInfo = await searchGithubUser(randomUser.login) as Candidate;
        setCurrentCandidate(candidateInfo);
      } else {
        console.log('No users found');
      }
    } catch (error) {
      return ErrorPage;
      // console.error('Error fetching candidate:', error);
    }
  }

  const saveCandidate = (currentCandidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, currentCandidate])); 
    fetchCandidate();
  }

  return (
  <div>
    <h1>Candidate Search</h1>
    <div>
      <h2><strong>Name: {currentCandidate.name}</strong></h2>
      <p><strong>{currentCandidate.login}</strong></p>
      <img src={currentCandidate.avatar_url} alt="Candidate avatar" />
      <p>Email: {currentCandidate.email}</p>
      <p>Location: {currentCandidate.location}</p>
      <p>Company: {currentCandidate.company}</p>
      <p>Bio: {currentCandidate.bio}</p>
      <div className="buttons">
        <button onClick={() => saveCandidate(currentCandidate)}>Save</button>
        <button onClick={fetchCandidate}>Next</button>
      </div>
    </div>
  </div>);
};

export default CandidateSearch;
