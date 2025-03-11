import React from 'react';
import { GameState } from '../types';
import { defaultGameConfig } from '../config/gameConfig';

interface BoardProps {
  gameState: GameState;
  onCellSelect: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({ gameState }) => {
  const remainingPlayerShips = gameState.playerShips.filter(ship => 
    !gameState.attempts.some(a => 
      a.row === ship.row && 
      a.col === ship.col && 
      a.isPlayerShip
    )
  ).length;

  const remainingComputerShips = gameState.computerShips.filter(ship => 
    !gameState.attempts.some(a => 
      a.row === ship.row && 
      a.col === ship.col && 
      !a.isPlayerShip
    )
  ).length;

  return (
    <div className="relative p-4 flex-1 flex flex-col">
      <div className="text-center text-white text-7xl mb-6 font-bold shadow-text animate-slide-down bg-black/30 py-4 rounded-xl backdrop-blur-sm">
        Multiplication Battleship
      </div>
      <div className="text-center mb-6 text-white text-3xl animate-slide-up bg-black/30 py-3 rounded-xl backdrop-blur-sm">
        Enter a number to fire at all coordinates that multiply to make it!
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col bg-black/40 p-6 rounded-3xl backdrop-blur-sm">
          {/* Column numbers (1-10) */}
          <div className="flex">
            <div className="w-24 h-24" /> {/* Empty corner cell */}
            {Array(10).fill(null).map((_, i) => (
              <div 
                key={`col-${i}`} 
                className="w-24 h-24 flex items-center justify-center font-bold text-4xl text-white shadow-text"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Grid with row numbers (1-5) */}
          <div className="flex">
            {/* Row numbers */}
            <div className="flex flex-col">
              {Array(5).fill(null).map((_, i) => (
                <div 
                  key={`row-${i}`} 
                  className="w-24 h-24 flex items-center justify-center font-bold text-4xl text-white shadow-text"
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Game grid */}
            <div className="grid grid-rows-5 grid-cols-10 gap-[2px]">
              {gameState.board.map((row, rowIndex) => (
                row.map((cell, colIndex) => {
                  const playerShip = gameState.playerShips.find(ship => 
                    ship.row === rowIndex && ship.col === colIndex
                  );

                  const computerShip = gameState.computerShips.find(ship => 
                    ship.row === rowIndex && ship.col === colIndex
                  );

                  const isHit = cell.isHit;
                  const playerHit = isHit && playerShip;
                  const computerHit = isHit && computerShip;

                  const showPlayerShip = playerShip && !isHit;
                  const showComputerShip = computerShip && !isHit;

                  return (
                    <div
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`w-24 h-24 bg-white/10 border-2 ${
                        gameState.cpuTarget?.row === rowIndex && gameState.cpuTarget?.col === colIndex
                          ? 'border-red-500 animate-pulse'
                          : 'border-white/30'
                      } flex items-center justify-center relative transition-all duration-200 hover:bg-white/20`}
                    >
                      {showPlayerShip && (
                        <img 
                          src={defaultGameConfig.player.assetUrl}
                          alt={`${defaultGameConfig.player.name}'s ship`}
                          className="absolute w-20 h-20 object-contain transition-transform duration-300 hover:scale-110"
                          key={`player-ship-${rowIndex}-${colIndex}`}
                        />
                      )}
                      {showComputerShip && (
                        <img 
                          src={defaultGameConfig.cpu.assetUrl}
                          alt={`${defaultGameConfig.cpu.name}'s ship`}
                          className="absolute w-20 h-20 object-contain transition-transform duration-300 hover:scale-110"
                          key={`cpu-ship-${rowIndex}-${colIndex}`}
                        />
                      )}
                      {isHit && (
                        <div className={`absolute w-16 h-16 rounded-full ${
                          playerHit ? 'bg-red-500/70 animate-pulse' : 
                          computerHit ? 'bg-yellow-300/70 animate-pulse' : 
                          'bg-gray-500/70'
                        } transition-all duration-300`} />
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center px-8">
        <div className="font-bold text-white text-4xl text-center shadow-text bg-black/30 px-8 py-4 rounded-xl backdrop-blur-sm">
          {defaultGameConfig.player.name}'s ships: {remainingPlayerShips}
        </div>
        <div className="font-bold text-white text-4xl text-center shadow-text bg-black/30 px-8 py-4 rounded-xl backdrop-blur-sm">
          {defaultGameConfig.cpu.name}'s ships: {remainingComputerShips}
        </div>
      </div>
    </div>
  );
}