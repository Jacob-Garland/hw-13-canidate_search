import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

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
      console.error('Error fetching candidate:', error);
    }
  }

  const saveCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = localStorage.getItem('savedCandidates');
      if (savedCandidates) {
        const storedCandidates = JSON.parse(savedCandidates) as Candidate[];
        storedCandidates.push(currentCandidate);
        localStorage.setItem('savedCandidates', JSON.stringify(storedCandidates));
      } else {
        localStorage.setItem('savedCandidates', JSON.stringify([currentCandidate]));
      } 
      fetchCandidate();
    }
  };

  return (
  <div>
    <h1>Candidate Search</h1>
    <div>
      <img src={currentCandidate.avatar_url} alt="Candidate avatar" />
      <h2>Name: {currentCandidate.name}</h2>
      <p><strong>{currentCandidate.login}</strong></p>
      <p>Email: {currentCandidate.email}</p>
      <p>Location: {currentCandidate.location}</p>
      <p>Company: {currentCandidate.company}</p>
      <p>Bio: {currentCandidate.bio}</p>
      <div className="buttons">
        <button onClick={saveCandidate}>Save Candidate</button>
        <button onClick={fetchCandidate}>Next Candidate</button>
      </div>
    </div>
  </div>);
};

export default CandidateSearch;
