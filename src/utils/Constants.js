export const BOARD_SIZE = 4;
export const RANDOM_NUMBERS_FOR_BOARD_INPUT = [2, 4];
export const GAME_START = 'GAME_START';
export const MOVE_CELLS = 'MOVE_CELLS';
export const WINNING_SCORE = 2048;

export const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};

export const KEY_CODES = {
  UP_KEY: 38,
  DOWN_KEY: 40,
  LEFT_KEY: 37,
  RIGHT_KEY: 39,
  ONE_KEY: 49,
  TWO_KEY: 50,
  THREE_KEY: 51,
  FOUR_KEY: 52,
  N_KEY: 78,
};

export const INITIAL_STATE = {
  isGameStarted: false,
  isGameOver: false,
  board: [[]],
  hasWon: false,
  score: 0,
}
