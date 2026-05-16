import React, { useState } from 'react';
import { Edit2, CheckCircle2, ArrowRightLeft, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

const TeamEditor = ({ teams, setTeams, onStartTournament }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null); // { teamId, playerIndex }

  const handleNameChange = (teamId, newName) => {
    setTeams(teams.map(t => t.id === teamId ? { ...t, name: newName } : t));
  };

  const handlePlayerClick = (teamId, playerIndex) => {
    if (!selectedPlayer) {
      // First selection
      setSelectedPlayer({ teamId, playerIndex });
    } else {
      // Second selection -> Swap
      if (selectedPlayer.teamId === teamId && selectedPlayer.playerIndex === playerIndex) {
        // Deselect
        setSelectedPlayer(null);
        return;
      }

      // Perform swap
      const newTeams = [...teams];
      const team1Index = newTeams.findIndex(t => t.id === selectedPlayer.teamId);
      const team2Index = newTeams.findIndex(t => t.id === teamId);

      const temp = newTeams[team1Index].players[selectedPlayer.playerIndex];
      newTeams[team1Index].players[selectedPlayer.playerIndex] = newTeams[team2Index].players[playerIndex];
      newTeams[team2Index].players[playerIndex] = temp;

      setTeams(newTeams);
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8 text-center border-t-4 border-pickleball-DEFAULT">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center justify-center gap-2 mb-2">
          Review & Edit Teams
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          You can rename your teams or swap players. 
          <br/>
          <span className="inline-flex items-center gap-1 font-semibold text-pickleball-DEFAULT mt-1">
            <ArrowRightLeft size={16} /> Tap one player, then tap another to swap them.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {teams.map((team) => (
          <div key={team.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 transition-all hover:shadow-md">
            
            {/* Team Name Edit */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Edit2 className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text"
                value={team.name}
                onChange={(e) => handleNameChange(team.id, e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border-b-2 border-transparent focus:border-pickleball-DEFAULT text-lg font-bold text-slate-800 dark:text-slate-100 rounded-t-md outline-none transition-colors"
                placeholder="Team Name"
              />
            </div>

            {/* Players list */}
            <div className="space-y-2">
              {team.players.map((player, idx) => {
                const isSelected = selectedPlayer?.teamId === team.id && selectedPlayer?.playerIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePlayerClick(team.id, idx)}
                    className={clsx(
                      "w-full text-left px-4 py-3 rounded-lg border-2 font-medium transition-all transform active:scale-95 flex justify-between items-center",
                      isSelected 
                        ? "border-pickleball-DEFAULT bg-pickleball-light/30 dark:bg-pickleball-dark/40 text-pickleball-dark dark:text-pickleball-light shadow-sm" 
                        : "border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                    )}
                  >
                    <span>{player}</span>
                    {isSelected && <ArrowRightLeft size={16} className="animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStartTournament}
        className="w-full bg-pickleball-DEFAULT hover:bg-pickleball-dark text-white text-xl font-bold py-5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
      >
        <CheckCircle2 size={24} />
        Start Tournament
      </button>
    </div>
  );
};

export default TeamEditor;
