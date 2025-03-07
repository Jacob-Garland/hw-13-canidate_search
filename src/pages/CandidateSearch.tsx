import { useState, useEffect, useCallback } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [candidatesList, setCandidatesList] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const fetchCandidates = useCallback(async () => {
    try {
      // Fetch basic candidates list (without details)
      const results = await searchGithub();

      if (results.length === 0) {
        console.log("No candidates found.");
        setCurrentCandidate(null);
        return;
      }
      
      // Store the list of usernames to local storage in an array
      const usernames = results.map((candidate: Candidate) => candidate.login);
      setCandidatesList(usernames);

      // Fetch details for the first candidate from array
      const rando = results[Math.floor(Math.random() * results.length)];
      const candidateData = await searchGithubUser(rando.login);
      console.log("Fetched user data:", candidateData);
      setCurrentCandidate({
        name: candidateData.name,
        login: candidateData.login,
        avatar_url: candidateData.avatar_url,
        email: candidateData.email,
        location: candidateData.location,
        company: candidateData.company,
        bio: candidateData.bio,
        html_url: candidateData.html_url
      })

    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }, []);

  const fetchCandidateDetails = useCallback(async (username: string) => {
    try {
      const candidateData = await searchGithubUser(username);
      console.log("Fetched user data:", candidateData);
      setCurrentCandidate({
        name: candidateData.name,
        login: candidateData.login,
        avatar_url: candidateData.avatar_url,
        email: candidateData.email,
        location: candidateData.location,
        company: candidateData.company,
        bio: candidateData.bio,
        html_url: candidateData.html_url
      });
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    }
  }, []);

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
      fetchNextCandidate();
    }
  }

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);


  return (
    <div>
      <h1>Potential Candidates</h1>
      {currentCandidate ? (
        <div className="candidate-card">
          <img src={currentCandidate.avatar_url} alt="avatar" className="candidateCard-image"/>
          <h2>{currentCandidate.name}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email}</a></p>
          <p>Company: {currentCandidate.company}</p>
          <p>Bio: {currentCandidate.bio}</p>
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
