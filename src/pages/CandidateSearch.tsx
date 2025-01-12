import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [candidatesList, setCandidatesList] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      // Fetch basic candidates list (without details)
      const results = await searchGithub();

      // Extract usernames and store them in the state
      const usernames = results.map((user: { login: string }) => user.login);
      console.log("Usernames:", usernames);
      setCandidatesList(usernames);

      // Fetch details for the first username
      if (usernames.length > 0) {
        fetchCandidateDetails(usernames[0]);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchCandidateDetails = async (username: string) => {
    try {
      const userData = await searchGithubUser(username);
      console.log("Fetched user data:", userData);
      setCurrentCandidate(userData || null);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      setCurrentCandidate(null);
    }
  };

  const fetchNextCandidate = () => {
    const nextIndex = index + 1;
    if (nextIndex < candidatesList.length) {
      setIndex(nextIndex);
      fetchCandidateDetails(candidatesList[nextIndex]);
    } else {
      setCurrentCandidate(null); // No more candidates available
    }
  };
 
  const saveCandidate = () => {
    if (currentCandidate) {
      const storedCandidates = localStorage.getItem('storedCandidates');
      if (storedCandidates) {
        const candidates = JSON.parse(storedCandidates) as Candidate[];
        candidates.push(currentCandidate);
        localStorage.setItem('candidates', JSON.stringify(candidates));
      } else {
        localStorage.setItem('candidates', JSON.stringify([currentCandidate]));
      }
      fetchCandidate();
    }
  }

  return (
    <div className='candadite-card'>
      <h1>Potential Candidates</h1>
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt="avatar" />
          <h2>{currentCandidate.name || "Not Provided"}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || "Not provided"}</p>
          <p>Email: {currentCandidate.email || "Not provided"}</p>
          <p>Company: {currentCandidate.company || "Not provided"}</p>
          <p>Bio: {currentCandidate.bio || "Not provided"}</p>
          <div>
            <button className='button-accept' onClick={saveCandidate}>Save</button>
            <button className='button-reject' onClick={fetchNextCandidate}>Next</button>
          </div>
        </div>
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
