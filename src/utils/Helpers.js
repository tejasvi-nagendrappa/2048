import {
  BOARD_SIZE,
  RANDOM_NUMBERS_FOR_BOARD_INPUT,
} from 'utils/Constants';

const flipBoard = board => {
  const flippedBoard = board[0].map((column, index) => (
    board.map(row => row[index])
  ));
  return flippedBoard;
}

const reverse = board => [...board].reverse();

const getRandomIndexFromArray = (inputArr) => Math.floor(Math.random() * inputArr.length)

const generateRandomNumber = () => {
  const randomIndex = getRandomIndexFromArray(RANDOM_NUMBERS_FOR_BOARD_INPUT);
  const randomNumber = RANDOM_NUMBERS_FOR_BOARD_INPUT[randomIndex];
  return randomNumber;
}

export const rotateBoardToRight = board => flipBoard(reverse(board));

export const rotateBoardToLeft = board => reverse(flipBoard(board));

export const generateInitialBoard = (boardSize = BOARD_SIZE) => {
  const board = []
  for (let i = 0; i < boardSize; i++) {
    board.push(new Array(boardSize).fill(0))
  }
  return board
};

export const getEmptySlotsInTheBoard = (board) => {
  const emptySlots = [];
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if(board[rowIndex][colIndex] === 0) {
        emptySlots.push([rowIndex, colIndex]);
      }
    })
  });
  return emptySlots;
}

export const insertRandomNumber = (board) => {
  const emptySlots = getEmptySlotsInTheBoard(board);
  const randomCoordinate = getRandomIndexFromArray(emptySlots);
  const randomNumber = generateRandomNumber();
  const [rowIndex, colIndex] = emptySlots[randomCoordinate];
  board[rowIndex][colIndex] = randomNumber;
  return board;
}

export const isBoardUpdated = (oldVal, newVal) => {
  return (JSON.stringify(oldVal) !== JSON.stringify(newVal)) ? true : false;
}
