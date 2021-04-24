import {
  rotateBoardToRight,
  rotateBoardToLeft,
  generateInitialBoard,
  insertRandomNumber,
  isBoardUpdated
 } from 'utils/Helpers';
import {
  GAME_START, MOVE_CELLS, INITIAL_STATE, DIRECTION, WINNING_SCORE
} from 'utils/Constants';

const { UP, DOWN, RIGHT, LEFT } = DIRECTION;

export function moveCells(direction) {
  return {
    direction,
    type: MOVE_CELLS,
  };
}

export function startGame(data) {
  return {
    data,
    type: GAME_START,
  };
}

// Core function to move elements towards right and merge same numbers
const moveCellsToRight = (boardAsInput, score) => {
  const board = [];
  let hasWon = false;
  boardAsInput.forEach((row, rowIndex) => {
    let newRow = [];
    row.forEach((col, colIndex) => {
      const currItem = boardAsInput[rowIndex][colIndex];
      (currItem === 0) ? newRow.unshift(currItem) : newRow.push(currItem);
    })
    board.push(newRow);
  })
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = board[rowIndex].length - 1; colIndex >= 0; colIndex--) {
      if (board[rowIndex][colIndex] > 0 && board[rowIndex][colIndex] === board[rowIndex][colIndex - 1]) {
        board[rowIndex][colIndex] = board[rowIndex][colIndex] * 2;
        board[rowIndex][colIndex - 1] = 0;
        score += board[rowIndex][colIndex];
        if (!hasWon) {
          hasWon = (board[rowIndex][colIndex] === WINNING_SCORE);
        }
      } else if (board[rowIndex][colIndex] === 0 && board[rowIndex][colIndex - 1] > 0) {
        board[rowIndex][colIndex] = board[rowIndex][colIndex - 1];
        board[rowIndex][colIndex - 1] = 0;
      }
    }
  }
  return { board, score, hasWon }
}


const moveCellsToLeftAndMerge = (inputBoard, inputScore) => {
  let boardWithScore = {};

  // Do two right rotations
  let rotatedBoard = rotateBoardToRight(inputBoard);
  rotatedBoard = rotateBoardToRight(rotatedBoard);

  boardWithScore = moveCellsToRight(rotatedBoard, inputScore);
  const { board, score, hasWon } = boardWithScore;

  // Do two left rotations
  rotatedBoard = rotateBoardToLeft(board);
  rotatedBoard = rotateBoardToLeft(rotatedBoard);

  return { board: rotatedBoard, score, hasWon }
}

const moveCellsUpAndMerge = (inputBoard, inputScore) => {
  let boardWithScore = {};

  // Do one right rotations
  let rotatedBoard = rotateBoardToRight(inputBoard);

  boardWithScore = moveCellsToRight(rotatedBoard, inputScore);
  const { board, score, hasWon } = boardWithScore;

  // Do one left rotations
  rotatedBoard = rotateBoardToLeft(board);

  return { board: rotatedBoard, score, hasWon }
}

const moveCellsDownAndMerge = (inputBoard, inputScore) => {
  let boardWithScore = {};

  // Do one left rotations
  let rotatedBoard = rotateBoardToLeft(inputBoard);

  boardWithScore = moveCellsToRight(rotatedBoard, inputScore);
  const { board, score, hasWon } = boardWithScore;

  // Do one right rotations
  rotatedBoard = rotateBoardToRight(board);

  return { board: rotatedBoard, score, hasWon }
}

const moveCellsAndMerge = (state, direction, don) => {
  let { board, score } = state;

  let boardWithScore = {};

  if(direction === RIGHT) {
    boardWithScore = moveCellsToRight(board,score);
  } else if(direction === LEFT) {
    boardWithScore = moveCellsToLeftAndMerge(board, score);
  } else if(direction === UP) {
    boardWithScore = moveCellsUpAndMerge(board, score);
  } else if(direction === DOWN) {
    boardWithScore = moveCellsDownAndMerge(board, score);
  }
  return boardWithScore;
}

const getMovedBoard = (board, direction) => {
  const result = moveCellsAndMerge({ board, score: 0}, direction);
  const { board: movedBoard } = result;
  return movedBoard;
}

const checkForGameOver = (board) => {
  let moves = [
    isBoardUpdated(board, getMovedBoard(board, UP)),
    isBoardUpdated(board, getMovedBoard(board, DOWN)),
    isBoardUpdated(board, getMovedBoard(board, RIGHT)),
    isBoardUpdated(board, getMovedBoard(board, LEFT)),
  ];

  return (moves.includes(true)) ? false : true;
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GAME_START:
      let board = generateInitialBoard();
      board = insertRandomNumber(board);
      board = insertRandomNumber(board);

      return { ...INITIAL_STATE, ...{ board, isGameStarted: true } }

    case MOVE_CELLS:
      const { board:inputBoard } = state;
      const { direction } = action;
      let boardWithScore = moveCellsAndMerge(state, direction);
      let { board:updatedBoard, hasWon } = boardWithScore;
      const hasBoardMoved = isBoardUpdated(inputBoard, updatedBoard);

      if(hasBoardMoved) {
        updatedBoard = insertRandomNumber(updatedBoard);
        const isGameOver = (checkForGameOver(updatedBoard) && !hasWon);
        boardWithScore = { ...boardWithScore, isGameOver };
      }

      return { ...state, ...{ ...boardWithScore }}

    default:
        return state;
  }
}
