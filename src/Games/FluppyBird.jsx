import React, { useEffect, useRef, useState } from 'react';

const FluppyBird = () => {
  const [birdY, setBirdY] = useState(200);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);

  const gravity = 0.6;
  const jumpStrength = -15;
  const birdWidth = 40;
  const birdHeight = 40;
  const pipeWidth = 50;
  const pipeGap = 150;
  const pipeSpeed = 2;

  const birdRef = useRef();

  useEffect(() => {
    if (gameOver) return;

    const pipeInterval = setInterval(() => {
      const newPipe = {
        x: window.innerWidth,
        gap: Math.floor(Math.random() * (window.innerHeight - pipeGap)),
      };
      setPipes((prevPipes) => [...prevPipes, newPipe]);
    }, 2000);

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        setBirdVelocity((prevVelocity) => prevVelocity + gravity);
        setBirdY((prevY) => prevY + birdVelocity);

        // Move pipes
        setPipes((prevPipes) =>
          prevPipes
            .map((pipe) => ({
              ...pipe,
              x: pipe.x - pipeSpeed,
            }))
            .filter((pipe) => pipe.x + pipeWidth > 0)
        );

        // Detect collisions with pipes or the ground
        pipes.forEach((pipe) => {
          if (
            pipe.x < birdWidth &&
            (birdY < pipe.gap || birdY + birdHeight > pipe.gap + pipeGap)
          ) {
            setGameOver(true);
          }
        });

        // Increment score
        pipes.forEach((pipe) => {
          if (pipe.x + pipeWidth < birdWidth && !pipe.scored) {
            setScore((prevScore) => prevScore + 1);
            pipe.scored = true;
          }
        });

        // Check for ground collision
        if (birdY > window.innerHeight - 50) {
          setBirdY(window.innerHeight - 50);
          setBirdVelocity(0);
          setGameOver(true);
        }
      }
    }, 1000 / 60);

    return () => {
      clearInterval(pipeInterval);
      clearInterval(gameLoop);
    };
  }, [birdY, birdVelocity, pipes, gameOver]);

  const handleJump = () => {
    if (gameOver) {
      setGameOver(false);
      setBirdY(200);
      setBirdVelocity(0);
      setPipes([]);
      setScore(0);
    } else {
      setBirdVelocity(jumpStrength);
    }
  };

  return (
    <div
      className="game-container"
      onClick={handleJump}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#70c5ce',
        overflow: 'hidden',
      }}
    >
      <div
        className="score"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '24px',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Score: {score}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '100px',
          top: birdY + 'px',
          width: birdWidth + 'px',
          height: birdHeight + 'px',
          backgroundColor: 'yellow',
          borderRadius: '50%',
        }}
      />

      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              position: 'absolute',
              left: pipe.x + 'px',
              top: '0',
              width: pipeWidth + 'px',
              height: pipe.gap + 'px',
              backgroundColor: 'green',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: pipe.x + 'px',
              bottom: '0',
              width: pipeWidth + 'px',
              height: '100vh',
              backgroundColor: 'green',
              clipPath: `inset(0 0 ${window.innerHeight - (pipe.gap + pipeGap)}px 0)`,
            }}
          />
        </React.Fragment>
      ))}

      {gameOver && (
        <div
          className="game-over"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '32px',
            color: 'red',
            fontWeight: 'bold',
          }}
        >
          Game Over
        </div>
      )}
    </div>
  );
};

export default FluppyBird;
