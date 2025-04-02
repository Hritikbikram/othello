import React, { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {
  const initialTiles = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

    
  initialTiles[3][3] = "⚪";
  initialTiles[3][4] = "⚫";
  initialTiles[4][3] = "⚫";
  initialTiles[4][4] = "⚪";



  const [board, setBoard] = useState(initialTiles);
  const [currentPlayer, setCurrentPlayer] = useState("⚫");


  const directions = [
    [-1, 0], [1, 0], 
    [0, -1], [0, 1], 
    [-1, -1], [-1, 1], 
    [1, -1], [1, 1],
  ];



   const isValidMove = (row, col, player) => {
    if (board[row][col] !== null) return false;
    const opponent = player === "⚫" ? "⚪" : "⚫";

    for (let [dx, dy] of directions) {
      let r = row + dx, c = col + dy;
      let piecesToFlip = [];

      while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opponent) {
        piecesToFlip.push([r, c]);
        r += dx;
        c += dy;
      }

      if (piecesToFlip.length > 0 && r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === player) {
        return true;
      }
    }
    return false;
  };




   const hasValidMove = (player) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isValidMove(r, c, player)) {
          return true;
        }
      }
    }
    return false;
  };




   const handleClick = (row, col) => {
    if (!isValidMove(row, col, currentPlayer)) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;


    const opponent = currentPlayer === "⚫" ? "⚪" : "⚫";
    for (let [dx, dy] of directions) {
      let r = row + dx, c = col + dy;
      let piecesToFlip = [];

      while (r >= 0 && r < 8 && c >= 0 && c < 8 && newBoard[r][c] === opponent) {
        piecesToFlip.push([r, c]);
        r += dx;
        c += dy;
      }

      if (piecesToFlip.length > 0 && r >= 0 && r < 8 && c >= 0 && c < 8 && newBoard[r][c] === currentPlayer) {
        piecesToFlip.forEach(([fr, fc]) => (newBoard[fr][fc] = currentPlayer));
      }
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "⚫" ? "⚪" : "⚫");
  };

  const countTiles = () => {
    let blackCount = 0;
    let whiteCount = 0;
    board.forEach((row) =>
      row.forEach((cell) => {
        if (cell === "⚫") blackCount++;
        if (cell === "⚪") whiteCount++;
      })
    );
    return { blackCount, whiteCount };
  };


    const isGameOver = () => {
      return !hasValidMove("⚫") && !hasValidMove("⚪");
     
    };

    
  
    const declareWinner = () => {
      let blackCount = 0, whiteCount = 0;
      board.forEach(row => row.forEach(cell => {
        if (cell === "⚫") blackCount++;
        if (cell === "⚪") whiteCount++;
      }));
  
      if (blackCount > whiteCount) return "Black Wins!✨✨";
      if (whiteCount > blackCount) return "White Wins!✨✨";
      return "It's a Draw!";
    };

    const { blackCount, whiteCount } = countTiles();

      useEffect(() => {
        if (!isGameOver() && !hasValidMove(currentPlayer)) {
          setCurrentPlayer(currentPlayer === "⚫" ? "⚪" : "⚫");
        }
      }, [board, currentPlayer]);




  return (
    <div className="container">
      <h1>Othello Game</h1>
      <h1 style={{ color:'black' }}>Current Player :- {currentPlayer}</h1>

       <div style={{ fontSize: "18px",color:'Black', fontWeight: "bold", marginTop: "10px" }}>
        Total : Black: {blackCount} | White: {whiteCount}
      </div>

       {isGameOver() && (
        <h2 style={{ color: "Green" }}>{declareWinner()}</h2>
      )}


      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Square
             key={`${rowIndex}-${colIndex}`} 
            value={cell} 
            onSquareClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
