export interface Cell {
  hasPlayerShip: boolean;
  hasComputerShip: boolean;
  isHit: boolean;
}

export interface Ship {
  row: number;
  col: number;
}

export interface Attempt {
  row: number;
  col: number;
  isPlayerShip: boolean;  // true if this attempt was on a player ship (CPU's attack)
}

export interface GameState {
  board: Cell[][];
  playerShips: Ship[];
  computerShips: Ship[];
  attempts: Attempt[];
  score: number;
  userAnswer: string;
  targetValue: number | null;
  turnCount: number;
  cpuTarget: Ship | null;  // The ship that CPU is currently targeting
  level: number;  // Current game level
}

export interface Coordinate {
  row: number;
  col: number;
}

export interface CharacterConfig {
  name: string;
  assetUrl: string;
  color: string;
  dialogues?: {
    hit: string[];
    defeat: string[];
    victory: string[];
  };
}

export interface LevelConfig {
  id: number;
  name: string;
  description: string;
  maxNumber: number;
  minShips: {
    player: number;
    cpu: number;
  };
}

export interface GameConfig {
  player: CharacterConfig;
  cpu: CharacterConfig;
  backgroundUrl: string;
  levels: LevelConfig[];
}