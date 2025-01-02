import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    login: '',
    avatar_url: '',
    email: '',
    location: '',
    company: '',
    bio: ''
  });
  const [SavedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    fetchCandidate()
  })

  const fetchCandidate = async () => {
    setLoading(true);
    setError(false);
    try {
      const users = await searchGithub();
      if (users.length > 0) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const candidateInfo = await searchGithubUser(randomUser.login) as Candidate;
        setCurrentCandidate(candidateInfo);
      } else {
        console.log('No users found');
        setError(true);
      }
    } catch (error) {
      console.log('Error fetching candidate:', error);
      setError(true);
    } finally {
      setLoading(false);
    };
  }

  const saveCandidate = () => {
    const candidate = currentCandidate;
    const updatedCandidates = [...SavedCandidates, candidate];
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    console.log('Candidate saved:');
  };

  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
