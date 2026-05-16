import React, { useState } from 'react';
import PlayerInput from './components/PlayerInput';
import TeamEditor from './components/TeamEditor';
import TournamentDashboard from './components/TournamentDashboard';
import { generateTeams, generateRoundRobinSchedule, calculateStandings, generateFinals } from './utils/tournamentLogic';

function App() {
  const [players, setPlayers] = useState(Array(8).fill(''));
  const [stage, setStage] = useState('input'); // 'input', 'team-editor', 'round-robin', 'finals', 'finished'
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [finals, setFinals] = useState([]);
  const [champion, setChampion] = useState(null);

  const handleGenerateTeams = () => {
    const newTeams = generateTeams(players);
    setTeams(newTeams);
    setStage('team-editor');
  };

  const handleStartTournament = () => {
    const newMatches = generateRoundRobinSchedule(teams);
    setMatches(newMatches);
    setStandings(calculateStandings(teams, newMatches));
    setStage('round-robin');
    setChampion(null);
    setFinals([]);
  };

  const handleRegenerateSchedule = () => {
    // Only valid to do this before any matches are played
    handleStartTournament();
  };

  const handleMatchWinnerSelect = (matchId, winnerTeamId) => {
    const updatedMatches = matches.map(m => 
      m.id === matchId ? { ...m, winner: winnerTeamId } : m
    );
    setMatches(updatedMatches);
    
    // Update standings
    const updatedStandings = calculateStandings(teams, updatedMatches);
    setStandings(updatedStandings);

    // Check if all round-robin matches are done
    if (updatedMatches.every(m => m.winner !== null)) {
      setStage('finals');
      setFinals(generateFinals(updatedStandings));
    }
  };

  const handleFinalsWinnerSelect = (matchId, winnerTeamId) => {
    const updatedFinals = finals.map(m => 
      m.id === matchId ? { ...m, winner: winnerTeamId } : m
    );
    setFinals(updatedFinals);

    // If championship match is decided, set champion
    const championshipMatch = updatedFinals.find(m => m.id === 'f_champ');
    if (championshipMatch && championshipMatch.winner) {
      setStage('finished');
      const winningTeam = teams.find(t => t.id === championshipMatch.winner);
      setChampion(winningTeam);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors p-4 md:p-8">
      {stage === 'input' && (
        <PlayerInput 
          players={players} 
          setPlayers={setPlayers} 
          onGenerate={handleGenerateTeams} 
        />
      )}
      
      {stage === 'team-editor' && (
        <TeamEditor 
          teams={teams}
          setTeams={setTeams}
          onStartTournament={handleStartTournament}
        />
      )}

      {(stage === 'round-robin' || stage === 'finals' || stage === 'finished') && (
        <TournamentDashboard 
          teams={teams}
          matches={matches}
          standings={standings}
          finals={finals}
          stage={stage}
          champion={champion}
          onMatchWinnerSelect={handleMatchWinnerSelect}
          onFinalsWinnerSelect={handleFinalsWinnerSelect}
          onRegenerateTeams={handleRegenerateSchedule}
        />
      )}
    </div>
  );
}

export default App;
