import { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { ControlPanel } from './components/ControlPanel';
import { MessageBox } from './components/MessageBox';
import { GameState, Cell, Ship, Attempt, Coordinate } from './types';
import { playKravenVoice, playSound, stopSound } from './utils/audio';
import { defaultGameConfig } from './config/gameConfig';
import { MusicControls } from './components/MusicControls';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(5).fill(null).map(() => 
      Array(10).fill(null).map(() => ({ 
        hasPlayerShip: false, 
        hasComputerShip: false, 
        isHit: false 
      }))
    ),
    playerShips: [],
    computerShips: [],
    attempts: [],
    score: 0,
    userAnswer: '',
    targetValue: null,
    turnCount: 0,
    cpuTarget: null,
    level: 1,
  });

  const getRandomDialogue = (dialogues: string[] | undefined): string => {
    if (!dialogues || dialogues.length === 0) {
      return "..."; // Default message if no dialogues available
    }
    return dialogues[Math.floor(Math.random() * dialogues.length)];
  };

  const getRemainingShips = (ships: Ship[], attempts: Attempt[], isPlayerShips: boolean): number => {
    return ships.filter(ship => 
      !attempts.some(attempt => 
        attempt.row === ship.row && 
        attempt.col === ship.col && 
        attempt.isPlayerShip === isPlayerShips
      )
    ).length;
  };

  const checkGameEnd = (attempts: Attempt[]): { isGameOver: boolean; playerWon: boolean } => {
    const remainingPlayerShips = getRemainingShips(gameState.playerShips, attempts, true);
    const remainingComputerShips = getRemainingShips(gameState.computerShips, attempts, false);

    return {
      isGameOver: remainingPlayerShips === 0 || remainingComputerShips === 0,
      playerWon: remainingComputerShips === 0
    };
  };

  const initializeBoard = (level: number = 1) => {
    const levelConfig = defaultGameConfig.levels.find(l => l.id === level) || defaultGameConfig.levels[0];
    const playerShipCount = levelConfig.minShips.player;
    const computerShipCount = levelConfig.minShips.cpu;
    const { rows, cols } = levelConfig.boardSize;
    
    const newBoard: Cell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({
        hasPlayerShip: false,
        hasComputerShip: false,
        isHit: false
      }))
    );
    
    const placeShips = () => {
      const playerShips: Ship[] = [];
      const computerShips: Ship[] = [];

      for (let i = 0; i < playerShipCount; i++) {
        let row, col;
        do {
          row = Math.floor(Math.random() * rows);
          col = Math.floor(Math.random() * cols);
        } while (newBoard[row][col].hasPlayerShip);
        
        newBoard[row][col].hasPlayerShip = true;
        playerShips.push({ row, col });
      }

      for (let i = 0; i < computerShipCount; i++) {
        let row, col;
        do {
          row = Math.floor(Math.random() * rows);
          col = Math.floor(Math.random() * cols);
        } while (newBoard[row][col].hasPlayerShip || newBoard[row][col].hasComputerShip);
        
        newBoard[row][col].hasComputerShip = true;
        computerShips.push({ row, col });
      }

      return { playerShips, computerShips };
    };

    const { playerShips, computerShips } = placeShips();

    playSound('buttonClick');

    setGameState({
      board: newBoard,
      playerShips,
      computerShips,
      attempts: [],
      score: level === 1 ? 0 : gameState.score,
      userAnswer: '',
      targetValue: null,
      turnCount: 0,
      cpuTarget: null,
      level,
    });
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const cpuTurn = async () => {
    const remainingPlayerShips = gameState.playerShips.filter(ship => 
      !gameState.attempts.some(attempt => 
        attempt.row === ship.row && 
        attempt.col === ship.col && 
        attempt.isPlayerShip
      )
    );

    if (remainingPlayerShips.length > 0) {
      const targetShip = remainingPlayerShips[Math.floor(Math.random() * remainingPlayerShips.length)];
      
      setGameState(prev => ({
        ...prev,
        cpuTarget: targetShip
      }));

      playSound('targeting');
      await new Promise(resolve => setTimeout(resolve, 1000));
      stopSound('targeting');

      const villainDialogue = getRandomDialogue(defaultGameConfig.cpu.dialogues!.hit);
      const sidekickDialogue = getRandomDialogue(defaultGameConfig.sidekick.dialogues!.incorrectAnswer!);
      
      await playKravenVoice(villainDialogue);
      playSound('hit');

      const newAttempts = [...gameState.attempts, { ...targetShip, isPlayerShip: true }];
      const newBoard = [...gameState.board];
      newBoard[targetShip.row][targetShip.col].isHit = true;

      const gameEndState = checkGameEnd(newAttempts);

      setGameState(prev => ({
        ...prev,
        board: newBoard,
        attempts: newAttempts,
        turnCount: prev.turnCount + 1,
        cpuTarget: null,
      }));

      if (gameEndState.isGameOver && !gameEndState.playerWon) {
        const victoryDialogue = getRandomDialogue(defaultGameConfig.cpu.dialogues!.victory);
        playSound('victory');
        await playKravenVoice(victoryDialogue);
        setMessage({
          title: 'Mission Failed',
          text: victoryDialogue + `\n\n${defaultGameConfig.sidekick.name} says: "${sidekickDialogue}"\n\nFinal score: ${gameState.score}`,
          buttonText: 'Retry Sector',
          secondaryButtonText: 'Abort Mission',
          onSecondaryClick: () => initializeBoard(1),
        });
      } else {
        setMessage({
          title: `${defaultGameConfig.cpu.name}'s Turn`,
          text: `${villainDialogue}\n\n${defaultGameConfig.sidekick.name} says: "${sidekickDialogue}"`,
          buttonText: 'Continue'
        });
      }
    }
  };

  const findMultiplicationCoordinates = (number: number): Coordinate[] => {
    const coordinates: Coordinate[] = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 10; col++) {
        if ((row + 1) * (col + 1) === number) {
          coordinates.push({ row, col });
        }
      }
    }
    return coordinates;
  };

  const [message, setMessage] = useState<{
    title: string;
    text: string;
    buttonText: string;
    secondaryButtonText?: string;
    onSecondaryClick?: () => void;
    isLevelUp?: boolean;
    onClose?: () => void;
    onShow?: () => void;
  } | null>(null);

  const showVictoryMessage = async (newScore: number) => {
    const defeatDialogue = getRandomDialogue(defaultGameConfig.cpu.dialogues!.defeat);
    playSound('defeat');
    await playKravenVoice(defeatDialogue);
    setMessage({
      title: 'Level Complete!',
      text: `${defeatDialogue} Current score: ${newScore}. Ready for the next sector?`,
      buttonText: 'Next Sector',
      secondaryButtonText: 'End Mission',
      onSecondaryClick: () => initializeBoard(1),
      isLevelUp: true
    });
  };

  const handleFire = async () => {
    if (gameState.userAnswer === '') {
      playSound('buttonClick');
      setMessage({
        title: 'Enter Target',
        text: 'Please enter target coordinates!',
        buttonText: 'OK'
      });
      return;
    }

    const targetNumber = parseInt(gameState.userAnswer);
    if (isNaN(targetNumber)) {
      playSound('buttonClick');
      setMessage({
        title: 'Invalid Target',
        text: 'Please enter valid coordinates!',
        buttonText: 'OK'
      });
      return;
    }

    const coordinates = findMultiplicationCoordinates(targetNumber);
    if (coordinates.length === 0) {
      const incorrectDialogue = getRandomDialogue(defaultGameConfig.sidekick.dialogues!.incorrectAnswer!);
      playSound('buttonClick');
      
      setMessage({
        title: `${defaultGameConfig.sidekick.name} says:`,
        text: incorrectDialogue,
        buttonText: 'OK',
        onShow: async () => {
          await playKravenVoice(incorrectDialogue);
        }
      });
      return;
    }

    let hits = 0;
    const newAttempts = [...gameState.attempts];
    const newBoard = [...gameState.board];
    
    coordinates.forEach(coord => {
      if (!newAttempts.some(a => a.row === coord.row && a.col === coord.col && !a.isPlayerShip)) {
        newAttempts.push({ ...coord, isPlayerShip: false });
        if (newBoard[coord.row]?.[coord.col]?.hasComputerShip) {
          hits++;
          newBoard[coord.row][coord.col].isHit = true;
        }
      }
    });

    const pointsMultiplier = hits > 1 ? 2 : 1;
    const levelMultiplier = gameState.level;
    const newScore = gameState.score + (hits * 100 * pointsMultiplier * levelMultiplier);

    const gameEndState = checkGameEnd(newAttempts);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      attempts: newAttempts,
      score: newScore,
      userAnswer: '',
      targetValue: null,
      turnCount: prev.turnCount + 1,
    }));

    if (gameEndState.playerWon) {
      await showVictoryMessage(newScore);
      return;
    }

    let title, text;
    
    const villainDialogue = hits > 0 
      ? getRandomDialogue(defaultGameConfig.cpu.dialogues!.playerHit!)
      : getRandomDialogue(defaultGameConfig.cpu.dialogues!.playerMiss!);
      
    const sidekickDialogue = hits > 0
      ? getRandomDialogue(defaultGameConfig.sidekick.dialogues!.correctAnswer!)
      : getRandomDialogue(defaultGameConfig.sidekick.dialogues!.incorrectAnswer!);
    
    if (hits > 0) {
      if (hits > 1) {
        playSound('multiHit');
        setTimeout(() => playSound('explosion'), 300);
      } else {
        playSound('hit');
        setTimeout(() => playSound('explosion'), 200);
      }
      
      title = `${defaultGameConfig.sidekick.name} cheers:`;
      text = `${sidekickDialogue}\n\n${defaultGameConfig.cpu.name} growls: "${villainDialogue}"\n\nDestroyed ${hits} Mercada ship${hits > 1 ? 's' : ''} at coordinates ${targetNumber}!`;
    } else {
      playSound('miss');
      title = `${defaultGameConfig.cpu.name} taunts:`;
      text = `${villainDialogue}\n\n${defaultGameConfig.sidekick.name} encourages: "${sidekickDialogue}"\n\nNo enemy vessels detected at coordinates ${targetNumber}.`;
    }

    const multiHitText = hits > 1 ? ` (${hits}x multiplier for multiple targets!)` : '';
    const levelBonusText = levelMultiplier > 1 ? ` (${levelMultiplier}x level bonus!)` : '';
    
    setMessage({
      title: title,
      text: text + (hits > 0 ? `${multiHitText}${levelBonusText}` : ''),
      buttonText: 'Continue',
      onClose: () => {
        if (!gameEndState.isGameOver) {
          cpuTurn();
        }
      },
      onShow: async () => {
        if (hits > 0) {
          await playKravenVoice(sidekickDialogue);
        } else {
          await playKravenVoice(villainDialogue);
        }
      }
    });
  };

  const handleClear = () => {
    playSound('buttonClick');
    setGameState(prev => ({
      ...prev,
      userAnswer: ''
    }));
  };

  const handleLevelSelect = (level: number) => {
    if (level > gameState.level) {
      playSound('levelUp');
    } else {
      playSound('buttonClick');
    }
    initializeBoard(level);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (/^\d$/.test(e.key)) {
      handleNumpadInput(e.key);
    } else if (e.key === 'Enter') {
      handleFire();
    } else if (e.key === 'Escape' || e.key === 'Delete' || e.key === 'Backspace') {
      handleClear();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNumpadInput = (value: string) => {
    playSound('buttonClick');
    setGameState(prev => ({
      ...prev,
      userAnswer: prev.userAnswer.length < 3 ? prev.userAnswer + value : prev.userAnswer
    }));
  };

  return (
    <div 
      className="min-h-screen flex items-stretch font-['Orbitron',sans-serif] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${defaultGameConfig.backgroundUrl}")`,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="flex flex-1">
        <Board
          gameState={gameState}
          onCellSelect={() => {}}
        />
        <MusicControls tracks={defaultGameConfig.music} />
        <ControlPanel
          gameState={gameState}
          onNumpadInput={handleNumpadInput}
          onFire={handleFire}
          onClear={handleClear}
          onLevelSelect={handleLevelSelect}
        />
      </div>
      {message && (
        <MessageBox
          title={message.title}
          text={message.text}
          buttonText={message.buttonText}
          secondaryButtonText={message.secondaryButtonText}
          onClose={() => {
            playSound('buttonClick');
            setMessage(null);
            if (message.buttonText === 'Retry Sector') {
              initializeBoard(gameState.level);
            } else if (message.isLevelUp) {
              initializeBoard(gameState.level + 1);
            }
            message.onClose?.();
          }}
          onSecondaryClick={message.onSecondaryClick}
          onShow={message.onShow}
        />
      )}
    </div>
  );
}

export default App;