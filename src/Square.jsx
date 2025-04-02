import React from 'react'

const Square = ({value,onSquareClick}) => {
  return (
    <div>
      <button className="square" onClick={onSquareClick}>
        <span>{value}</span>
      </button>
    </div>
  )
}

export default Square