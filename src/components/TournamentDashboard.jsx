import React from 'react';
import MatchCard from './MatchCard';
import StandingsTable from './StandingsTable';
import FinalsStage from './FinalsStage';
import { Users, RotateCcw } from 'lucide-react';

const TournamentDashboard = ({ 
  teams, 
  matches, 
  standings, 
  finals,
  stage,
  champion,
  onMatchWinnerSelect,
  onFinalsWinnerSelect,
  onRegenerateTeams 
}) => {

  // Dynamically determine the rounds based on matches
  const rounds = [...new Set(matches.map(m => m.round))].sort((a, b) => a - b);

  return (
    <div id="dashboard-container" className="max-w-6xl mx-auto mt-8 relative">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-3">
          Tournament Dashboard
        </h1>
        {stage === 'round-robin' && matches.every(m => m.winner === null) && (
          <button 
            onClick={onRegenerateTeams}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-bold transition-colors"
          >
            <RotateCcw size={18} />
            Regenerate Schedule
          </button>
        )}
      </div>

      {/* Teams Display */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Users size={20} />
          Participating Teams
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="font-bold text-lg text-pickleball-dark dark:text-pickleball-light">{team.name}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{team.players.join(' & ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Schedule */}
        <div className="lg:col-span-2">
          {stage === 'finals' || stage === 'finished' ? (
            <FinalsStage 
              finals={finals} 
              onWinnerSelect={onFinalsWinnerSelect} 
              champion={champion}
            />
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Round Robin Matches</h2>
              <div className="space-y-8">
                {rounds.map(round => (
                  <div key={round}>
                    <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                      Round {round}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matches.filter(m => m.round === round).map(match => (
                        <MatchCard 
                          key={match.id} 
                          match={match} 
                          onWinnerSelect={onMatchWinnerSelect} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Standings */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <StandingsTable standings={standings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDashboard;
