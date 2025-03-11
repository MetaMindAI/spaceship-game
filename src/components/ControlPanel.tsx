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
  const getRemainingShips = (ships: Ship[], attempts: Attempt[], isPlayerShips: boolean): number => {
    return ships.filter(ship => 
      !attempts.some(attempt => 
        attempt.row === ship.row && 
        attempt.col === ship.col && 
        attempt.isPlayerShip === isPlayerShips
      )
    ).length;
  };

  const remainingComputerShips = getRemainingShips(gameState.computerShips, gameState.attempts, false);
  const currentLevel = defaultGameConfig.levels.find(l => l.id === gameState.level) || defaultGameConfig.levels[0];

  return (
    <div className="w-[500px] bg-black/60 backdrop-blur-sm p-8 flex flex-col items-center rounded-r-3xl">
      <div className="flex justify-around w-full mb-8">
        <div 
          className="w-32 h-32 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg transform transition-transform hover:scale-105 bg-opacity-80 backdrop-blur-sm"
          style={{ backgroundColor: defaultGameConfig.player.color }}
        >
          {defaultGameConfig.player.name}
        </div>
        <div className="flex items-center font-bold text-5xl text-white shadow-text">VS</div>
        <div 
          className="w-32 h-32 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg transform transition-transform hover:scale-105 bg-opacity-80 backdrop-blur-sm"
          style={{ backgroundColor: defaultGameConfig.cpu.color }}
        >
          {defaultGameConfig.cpu.name}
        </div>
      </div>

      <div className="w-full h-[50px] bg-black/30 rounded-full mb-8 overflow-hidden shadow-inner backdrop-blur-sm">
        <div 
          className="h-full transition-all duration-500"
          style={{
            width: `${(remainingComputerShips / gameState.computerShips.length) * 100}%`,
            backgroundColor: defaultGameConfig.cpu.color
          }}
        />
      </div>

      <div className="w-full h-[70px] bg-black/30 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-4xl shadow-lg backdrop-blur-sm">
        Score: {gameState.score}
      </div>

      <div className="w-full mb-8">
        <div className="text-white text-xl mb-2">Select Level:</div>
        <div className="grid grid-cols-3 gap-4">
          {defaultGameConfig.levels.map((level) => (
            <button
              key={level.id}
              onClick={() => onLevelSelect(level.id)}
              className={`p-4 rounded-xl text-white font-bold transition-all duration-200 transform hover:scale-105
                ${gameState.level === level.id ? 'bg-white/30' : 'bg-black/30'}`}
            >
              <div className="text-lg">{level.name}</div>
              <div className="text-sm opacity-75">{level.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[50px] mb-6 font-bold text-3xl text-center text-white shadow-text">
        Enter target coordinates
      </div>

      <div className="w-full h-[100px] bg-black/30 rounded-xl mb-8 flex items-center justify-center text-white text-6xl font-bold shadow-lg backdrop-blur-sm">
        {gameState.userAnswer || '?'}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8 w-full">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            className="h-[80px] bg-black/30 rounded-xl flex items-center justify-center text-4xl font-bold text-white shadow-lg backdrop-blur-sm
              hover:bg-white/20 active:bg-white/30 transform transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => onNumpadInput(num.toString())}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className="w-full h-[90px] rounded-xl text-white text-4xl font-bold mb-8 shadow-lg
          hover:brightness-110 active:brightness-90 transform transition-all duration-200 hover:scale-105 active:scale-95
          flex items-center justify-center gap-4"
        style={{ backgroundColor: defaultGameConfig.cpu.color }}
        onClick={onFire}
      >
        <Target className="w-12 h-12" />
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