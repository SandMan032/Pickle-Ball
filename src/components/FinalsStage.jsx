import React from 'react';
import Confetti from 'react-confetti';
import MatchCard from './MatchCard';
import { Medal, Download } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

const FinalsStage = ({ finals, onWinnerSelect, champion }) => {

  const handleExport = async () => {
    const node = document.getElementById('dashboard-container');
    if (!node) return;
    
    try {
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1.0,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#f8fafc',
        style: { padding: '20px' },
        // filter out buttons so they don't appear in the image
        filter: (node) => {
          if (node.tagName === 'BUTTON') return false;
          return true;
        }
      });
      
      const link = document.createElement('a');
      link.download = `Pickleball_Tournament_Results.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting image:', err);
      alert('Failed to export image. Make sure the tournament is fully finished.');
    }
  };

  return (
    <div className="mt-8">
      {champion && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti recycle={false} numberOfPieces={800} />
        </div>
      )}

      {champion && (
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-2xl p-8 mb-6 shadow-2xl text-center transform scale-105 animate-fade-in-up relative z-10">
          <Medal className="mx-auto text-yellow-800 mb-4" size={64} />
          <h2 className="text-4xl font-extrabold text-yellow-900 mb-2">Tournament Champions!</h2>
          <div className="text-3xl font-bold text-yellow-800">{champion.name}</div>
          <div className="text-xl text-yellow-700 mt-2">{champion.players.join(' & ')}</div>
        </div>
      )}

      {champion && (
        <div className="flex justify-center mb-10">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1"
          >
            <Download size={20} />
            Export Final Results
          </button>
        </div>
      )}

      {finals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {finals.length > 1 && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">3rd Place Match</h3>
              <MatchCard match={finals[0]} onWinnerSelect={onWinnerSelect} isFinals={true} />
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Championship Match</h3>
            <MatchCard match={finals[finals.length > 1 ? 1 : 0]} onWinnerSelect={onWinnerSelect} isFinals={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalsStage;
