import React, { useState, useEffect } from 'react';

const SimpleGame = () => {
  const [score, setScore] = useState(0);
  const [targetX, setTargetX] = useState(50);
  const [targetY, setTargetY] = useState(50);
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // Initial time in seconds

  const targetSize = 30; // Size of the target
  const maxX = 400; // Maximum X-coordinate for the target
  const maxY = 400; // Maximum Y-coordinate for the target

  const getRandomPosition = () => {
    const x = Math.random() * (maxX - targetSize);
    const y = Math.random() * (maxY - targetSize);
    return { x, y };
  };

  const handleTargetClick = () => {
    if (gameActive) {
      const newPosition = getRandomPosition();
      setTargetX(newPosition.x);
      setTargetY(newPosition.y);
      setScore(score + 1);
    }
  };

  const handleReset = () => {
    setScore(0);
    setTimeLeft(60); // Reset the timer to the initial value
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameActive(false);
      return;
    }

    const gameTimer = setInterval(() => {
      if (gameActive) {
        const newPosition = getRandomPosition();
        setTargetX(newPosition.x);
        setTargetY(newPosition.y);
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(gameTimer);
    };
  }, [gameActive, timeLeft]);

  return (
    <div>
      <h2>Simple Game</h2>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft} seconds</p>
      <div
        style={{
          position: 'relative',
          width: maxX + 'px',
          height: maxY + 'px',
          border: '1px solid #000',
        }}
      >
        {gameActive && (
          <div
            onClick={handleTargetClick}
            style={{
              position: 'absolute',
              left: targetX + 'px',
              top: targetY + 'px',
              width: targetSize + 'px',
              height: targetSize + 'px',
              backgroundColor: 'red',
              cursor: 'pointer',
            }}
          ></div>
        )}
      </div>
      <button onClick={() => setGameActive(!gameActive)}>
        {gameActive ? 'Pause' : 'Resume'}
      </button>
      <button onClick={handleReset}>Reset Score</button>
    </div>
  );
};

export default SimpleGame;
