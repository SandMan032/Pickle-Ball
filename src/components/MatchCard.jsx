import React from 'react';
import { ShieldCheck, MapPin, Clock } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const MatchCard = ({ match, onWinnerSelect, isFinals = false }) => {
  const isFinished = match.winner !== null;

  return (
    <div className={twMerge(
      "bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border-2 transition-all",
      isFinished ? "border-slate-200 dark:border-slate-700 opacity-80" : "border-transparent hover:shadow-lg hover:-translate-y-1"
    )}>
      <div className={clsx(
        "px-4 py-2 text-sm font-bold flex justify-between items-center text-white",
        isFinals ? "bg-purple-600" : "bg-slate-700 dark:bg-slate-900"
      )}>
        <span className="flex items-center gap-1">
          {isFinals ? <ShieldCheck size={16} /> : <MapPin size={16} />}
          {isFinals ? match.title : `Court ${match.court}`}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={16} />
          {isFinals ? '25 mins' : '15 mins'}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Team 1 */}
        <button
          onClick={() => !isFinished && onWinnerSelect(match.id, match.team1.id)}
          disabled={isFinished}
          className={clsx(
            "w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all",
            isFinished && match.winner === match.team1.id
              ? "bg-pickleball-light dark:bg-pickleball-dark/40 border-pickleball-DEFAULT"
              : isFinished
              ? "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 text-slate-400"
              : "bg-slate-50 dark:bg-slate-800 hover:border-pickleball-DEFAULT border-slate-200 dark:border-slate-600"
          )}
        >
          <div className="text-left">
            <div className="font-bold text-lg dark:text-slate-100">{match.team1.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {match.team1.players.join(' & ')}
            </div>
          </div>
          {isFinished && match.winner === match.team1.id && (
            <span className="bg-pickleball-DEFAULT text-white px-2 py-1 rounded text-xs font-bold uppercase">Winner</span>
          )}
          {!isFinished && (
            <span className="text-xs font-semibold text-slate-400 hover:text-pickleball-DEFAULT">Select Winner</span>
          )}
        </button>

        <div className="flex items-center justify-center -my-2 relative z-10 pointer-events-none">
          <span className="bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-full">VS</span>
        </div>

        {/* Team 2 */}
        <button
          onClick={() => !isFinished && onWinnerSelect(match.id, match.team2.id)}
          disabled={isFinished}
          className={clsx(
            "w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all",
            isFinished && match.winner === match.team2.id
              ? "bg-pickleball-light dark:bg-pickleball-dark/40 border-pickleball-DEFAULT"
              : isFinished
              ? "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 text-slate-400"
              : "bg-slate-50 dark:bg-slate-800 hover:border-pickleball-DEFAULT border-slate-200 dark:border-slate-600"
          )}
        >
          <div className="text-left">
            <div className="font-bold text-lg dark:text-slate-100">{match.team2.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {match.team2.players.join(' & ')}
            </div>
          </div>
          {isFinished && match.winner === match.team2.id && (
            <span className="bg-pickleball-DEFAULT text-white px-2 py-1 rounded text-xs font-bold uppercase">Winner</span>
          )}
          {!isFinished && (
            <span className="text-xs font-semibold text-slate-400 hover:text-pickleball-DEFAULT">Select Winner</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
