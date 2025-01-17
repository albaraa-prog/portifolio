import React, { useCallback, useEffect, useRef, useState } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 200;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef(null);

  // Game logic functions remain the same
  const isCollision = useCallback((head, snakeBody) => {
    if (head.x < 0 || head.y < 0 || head.x >= GRID_SIZE || head.y >= GRID_SIZE) {
      return true;
    }
    return snakeBody.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
  }, []);

  const isFoodOnSnake = useCallback((foodPos, snakeBody) => {
    return snakeBody.some((segment) => segment.x === foodPos.x && segment.y === foodPos.y);
  }, []);

  const generateFood = useCallback(() => {
    let newFood;
    let validPosition = false;

    while (!validPosition) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      validPosition = !isFoodOnSnake(newFood, snake);
    }

    return newFood;
  }, [snake, isFoodOnSnake]);

  const handleKeyPress = useCallback(
    (e) => {
      const { key } = e;

      if (key === " ") {
        setIsPaused((prev) => !prev);
        return;
      }

      if (isPaused) return;

      const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };

      if (directions[key]) {
        const newDirection = directions[key];
        if (direction.x !== -newDirection.x && direction.y !== -newDirection.y) {
          setDirection(newDirection);
        }
      }
    },
    [direction, isPaused]
  );

  const moveSnake = useCallback(() => {
    if (isPaused || gameOver) return; // Add gameOver check here
  
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
  
    head.x += direction.x;
    head.y += direction.y;
  
    if (isCollision(head, newSnake)) {
      setGameOver(true);
      clearInterval(gameLoopRef.current); // Stop the game loop
      return;
    }
  
    newSnake.unshift(head);
  
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore((prev) => prev + 10);
      if (score > 0 && (score + 10) % 50 === 0) {
        setSpeed((prev) => Math.max(prev * 0.9, 50));
      }
    } else {
      newSnake.pop();
    }
  
    setSnake(newSnake);
  }, [snake, direction, food, generateFood, score, isPaused, isCollision, gameOver]);
  

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    
    // Clear any existing game loop interval
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  
    // Start a new game loop
    gameLoopRef.current = setInterval(moveSnake, speed);
  }, [generateFood, moveSnake, speed]);
  

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    gameLoopRef.current = setInterval(moveSnake, speed);

    return () => {
      clearInterval(gameLoopRef.current);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, moveSnake, speed]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#1a365d', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Snake Game</h1>
        <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Score: {score}</div>
        {isPaused && !gameOver && (
          <div style={{ color: '#fde047', fontSize: '1.25rem' }}>PAUSED</div>
        )}
      </div>

      <div
  style={{
    backgroundColor: '#2d3748',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '4px solid #4a5568',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }}
>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,  // Define columns based on GRID_SIZE
      gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,     // Define rows based on GRID_SIZE
      gap: '1px',
      backgroundColor: '#1a1a1a',
      border: '2px solid #333',
      padding: '4px',
      borderRadius: '4px',
    }}
  >
    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      const isSnakeSegment = snake.some(
        (segment) => segment.x === x && segment.y === y
      );
      const isFoodPosition = food.x === x && food.y === y;
      return (
        <div
          key={index}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '2px',
            backgroundColor: isSnakeSegment
              ? '#22c55e'
              : isFoodPosition
              ? '#ef4444'
              : '#000000',
          }}
        />
      );
    })}
  </div>
</div>


      {gameOver && (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Game Over!</h2>
          <p style={{ marginBottom: '1rem' }}>Final Score: {score}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={resetGame}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.25rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: 'white', color: 'black', transition: 'background-color 0.2s ease', border: 'none', outline: 'none' }}
            >
              Play Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.25rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', transition: 'background-color 0.2s ease', border: 'none', outline: 'none' }}
            >
              Go Home
            </button>
          </div>
        </div>
      )}

      <div style={{ color: 'white', textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
        <p>Controls: Arrow keys or WASD to move</p>
        <p>Space to pause/unpause</p>
      </div>

      {/* PlayStation-style control layout */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', width: '12rem', height: '12rem' }}>
        {/* Control buttons */}
        <div style={{ gridColumn: '2', gridRow: '1' }}>
          <button
            onClick={() => !isPaused && setDirection({ x: 0, y: -1 })}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '9999px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              transition: 'background-color 0.2s ease',
            }}
          >
            ↑
          </button>
        </div>
        <div style={{ gridColumn: '1', gridRow: '2' }}>
          <button
            onClick={() => !isPaused && setDirection({ x: -1, y: 0 })}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '9999px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              transition: 'background-color 0.2s ease',
            }}
          >
            ←
          </button>
        </div>
        <div style={{ gridColumn: '3', gridRow: '2' }}>
          <button
            onClick={() => !isPaused && setDirection({ x: 1, y: 0 })}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '9999px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              transition: 'background-color 0.2s ease',
            }}
          >
            →
          </button>
        </div>
        <div style={{ gridColumn: '2', gridRow: '3' }}>
          <button
            onClick={() => !isPaused && setDirection({ x: 0, y: 1 })}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '9999px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              transition: 'background-color 0.2s ease',
            }}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
