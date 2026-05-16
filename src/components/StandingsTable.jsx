import React from 'react';
import clsx from 'clsx';
import { Trophy } from 'lucide-react';

const StandingsTable = ({ standings }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden mt-6">
      <div className="bg-slate-800 dark:bg-slate-900 p-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy size={20} className="text-pickleball-DEFAULT" />
          Current Standings
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300 text-sm border-b dark:border-slate-700">
              <th className="p-4 font-semibold w-16 text-center">Rank</th>
              <th className="p-4 font-semibold">Team</th>
              <th className="p-4 font-semibold text-center w-24">W</th>
              <th className="p-4 font-semibold text-center w-24">L</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr 
                key={team.id} 
                className={clsx(
                  "border-b last:border-b-0 dark:border-slate-700 transition-colors",
                  index === 0 ? "bg-pickleball-light/30 dark:bg-pickleball-dark/20" : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                )}
              >
                <td className="p-4 text-center">
                  <div className={clsx(
                    "inline-flex items-center justify-center w-8 h-8 rounded-full font-bold",
                    index === 0 ? "bg-pickleball-DEFAULT text-white shadow-sm" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  )}>
                    {team.rank}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-slate-900 dark:text-slate-100">{team.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{team.players.join(' & ')}</div>
                </td>
                <td className="p-4 text-center font-bold text-lg text-slate-900 dark:text-slate-100">{team.wins}</td>
                <td className="p-4 text-center font-bold text-lg text-slate-500 dark:text-slate-400">{team.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsTable;
