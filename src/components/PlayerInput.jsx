import React from 'react';
import { User, Trophy, Users } from 'lucide-react';

const PlayerInput = ({ players, setPlayers, onGenerate }) => {
  const handlePlayerCountChange = (e) => {
    const count = parseInt(e.target.value);
    const newPlayers = Array(count).fill('');
    // Copy over existing names if decreasing/increasing
    for (let i = 0; i < Math.min(count, players.length); i++) {
      newPlayers[i] = players[i];
    }
    setPlayers(newPlayers);
  };

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const isComplete = players.every(p => p.trim().length > 0);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mt-8">
      <div className="bg-pickleball-DEFAULT p-6 text-center">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
          <Trophy size={36} />
          Pickleball Tournament
        </h1>
        <p className="text-pickleball-dark font-medium mt-2">Enter players to begin the ultimate showdown</p>
      </div>
      
      <div className="p-8">
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 mb-2 sm:mb-0">
            <Users size={20} className="text-pickleball-DEFAULT" />
            Number of Players:
          </label>
          <select 
            value={players.length}
            onChange={handlePlayerCountChange}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 font-semibold text-slate-700 dark:text-slate-200 focus:ring-pickleball-DEFAULT focus:border-pickleball-DEFAULT outline-none"
          >
            {[4, 6, 8, 10, 12, 14, 16].map(num => (
              <option key={num} value={num}>{num} Players ({num / 2} Teams)</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((player, index) => (
            <div key={index} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="pl-10 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-pickleball-DEFAULT focus:ring-pickleball-DEFAULT dark:text-white py-3 transition-colors shadow-sm"
                placeholder={`Player ${index + 1}`}
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <button
            onClick={onGenerate}
            disabled={!isComplete}
            className={`w-full py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              isComplete
                ? 'bg-pickleball-DEFAULT hover:bg-pickleball-dark text-white shadow-lg'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            Generate Teams
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerInput;
