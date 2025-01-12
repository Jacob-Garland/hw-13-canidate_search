import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const getPotentialCandidates = () => {
    const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem('storedCandidates') || "[]");

    return storedCandidates.map((candidate: Candidate, index: number) => (
      <div className="table-user-container" key={index}>
        <div className="table-user">
          <img src={candidate?.avatar_url} className="box-image"></img>
        </div>
        <div className="table-user">{candidate?.name} / {candidate?.login}</div>
        <div className="table-user">{candidate?.location}</div>
        <div className="table-user">{candidate?.email}</div>
        <div className="table-user">{candidate?.company}</div>
        <div className="table-user">{candidate?.bio}</div>
        <div className="table-user">
          <button className='button-reject' onClick={() => deletePotentialCandidate(index)}>-</button>
        </div>
      </div>
    ));
  }

  const deletePotentialCandidate = (index: number) => {
    console.log(`delete ${index}`);
    const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem('storedCandidates') || "[]");
    storedCandidates.splice(index, 1);
    localStorage.setItem('storedCandidates', JSON.stringify(storedCandidates));
    window.location.reload();
  }

  return (
    <>
      <h1>Saved Candidates</h1>
      <div className="table">
        <div className="table-container">
          <div className="table-box">Avatar</div>
          <div className="table-box">Name/Login</div>
          <div className="table-box">Location</div>
          <div className="table-box">Email</div>
          <div className="table-box">Company</div>
          <div className="table-box">Bio</div>
          <div className="table-box">Reject</div>
        </div>
        {getPotentialCandidates()}
      </div>
    </>
  );
};

export default SavedCandidates;
