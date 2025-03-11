import React from 'react';
import { GameState, Ship, Attempt } from '../types';
import { Target, Crosshair } from 'lucide-react';
import { defaultGameConfig } from '../config/gameConfig';

interface ControlPanelProps {
  gameState: GameState;
  onNumpadInput: (value: string) => void;
  onFire: () => void;
  onClear: () => void;
  onLevelSelect: (level: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  gameState,
  onNumpadInput,
  onFire,
  onClear,
  onLevelSelect,
}) => {
  // Calculate score percentage for the progress bar
  const scorePercentage = Math.min(100, (gameState.score / 1000) * 100);
  
  // Determine color based on score
  const getScoreColor = () => {
    if (scorePercentage < 30) return 'from-blue-500 to-cyan-400';
    if (scorePercentage < 60) return 'from-green-500 to-emerald-400';
    if (scorePercentage < 90) return 'from-yellow-500 to-amber-400';
    return 'from-red-500 to-rose-400';
  };

  return (
    <div className="w-[500px] bg-black/60 backdrop-blur-sm p-8 flex flex-col items-center rounded-r-3xl">
      <div className="flex justify-around w-full mb-8">
        <div className="flex flex-col items-center">
          <div 
            className="w-32 h-32 rounded-xl flex items-center justify-center overflow-hidden shadow-lg transform transition-transform hover:scale-105 mb-2"
            style={{ backgroundColor: defaultGameConfig.player.color }}
          >
            <img 
              src={defaultGameConfig.player.assetUrl} 
              alt={defaultGameConfig.player.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white font-bold text-xl">{defaultGameConfig.player.name}</div>
        </div>
        
        <div className="flex items-center font-bold text-6xl text-white shadow-text">VS</div>
        
        <div className="flex flex-col items-center">
          <div 
            className="w-32 h-32 rounded-xl flex items-center justify-center overflow-hidden shadow-lg transform transition-transform hover:scale-105 mb-2"
            style={{ backgroundColor: defaultGameConfig.cpu.color }}
          >
            <img 
              src={defaultGameConfig.cpu.assetUrl} 
              alt={defaultGameConfig.cpu.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white font-bold text-xl">{defaultGameConfig.cpu.name}</div>
        </div>
      </div>

      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-white text-xl font-bold">Score</div>
          <div className="text-white text-xl font-bold">{gameState.score}</div>
        </div>
        <div className="w-full h-[20px] bg-black/30 rounded-full overflow-hidden shadow-inner backdrop-blur-sm">
          <div 
            className={`h-full bg-gradient-to-r ${getScoreColor()} flex items-center justify-end px-4 text-white font-bold text-sm transition-all duration-1000 ease-out`}
            style={{ width: `${scorePercentage}%` }}
          >
            {scorePercentage >= 10 && `${Math.round(scorePercentage)}%`}
          </div>
        </div>
        
        <div className="w-full flex justify-between mt-1 px-1 text-xs text-white/70">
          <div>0</div>
          <div>250</div>
          <div>500</div>
          <div>750</div>
          <div>1000+</div>
        </div>
      </div>

      <div className="w-full mb-8">
        <div className="text-white text-2xl mb-2">Select Level:</div>
        <div className="grid grid-cols-3 gap-4">
          {defaultGameConfig.levels.map((level) => (
            <button
              key={level.id}
              onClick={() => onLevelSelect(level.id)}
              className={`p-4 rounded-xl text-white font-bold transition-all duration-200 transform hover:scale-105
                ${gameState.level === level.id ? 'bg-white/30' : 'bg-black/30'}`}
            >
              <div className="text-xl">{level.name}</div>
              <div className="text-sm mt-1 opacity-75">
                {level.boardSize.rows}×{level.boardSize.cols} Grid
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[50px] mb-6 font-bold text-4xl text-center text-white shadow-text">
        Enter target coordinates
      </div>

      <div className="w-full h-[100px] bg-black/30 rounded-xl mb-8 flex items-center justify-center text-white text-7xl font-bold shadow-lg backdrop-blur-sm">
        {gameState.userAnswer || '?'}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8 w-full">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            className="h-[80px] bg-black/30 rounded-xl flex items-center justify-center text-5xl font-bold text-white shadow-lg backdrop-blur-sm
              hover:bg-white/20 active:bg-white/30 transform transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => onNumpadInput(num.toString())}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className="w-full h-[90px] rounded-xl text-white text-5xl font-bold mb-8 shadow-lg
          hover:brightness-110 active:brightness-90 transform transition-all duration-200 hover:scale-105 active:scale-95
          flex items-center justify-center gap-4"
        style={{ backgroundColor: defaultGameConfig.cpu.color }}
        onClick={onFire}
      >
        <Target className="w-14 h-14" />
        FIRE
      </button>

      <button
        className="w-full h-[70px] bg-black/30 rounded-xl text-3xl font-bold text-white shadow-lg backdrop-blur-sm
          hover:bg-white/20 active:bg-white/30 transform transition-all duration-200 hover:scale-105 active:scale-95
          flex items-center justify-center gap-4"
        onClick={onClear}
      >
        <Crosshair className="w-10 h-10" />
        CLEAR
      </button>
    </div>
  );
}