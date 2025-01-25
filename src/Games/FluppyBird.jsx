import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../Assets/BG.png";
import BGnight from "../Assets/BGnight.png";
import BirdBase from "../Assets/BirdBody-Base.png";
import BirdDown from "../Assets/BirdBody-Down.png";
import BirdUp from "../Assets/BirdBody-Up.png";
import Ground from "../Assets/Ground.png";
import SiloDown from "../Assets/SiloDown.png";
import SiloUp from "../Assets/SiloUp.png";

const FlappyBird = () => {
  const [birdY, setBirdY] = useState(window.innerHeight * 0.3);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [isDay, setIsDay] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  // Game constants
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -10;
  const BIRD_WIDTH = window.innerWidth * 0.05;
  const BIRD_HEIGHT = window.innerHeight * 0.035;
  const PIPE_WIDTH = window.innerWidth * 0.07;
  const PIPE_GAP = window.innerHeight * 0.2;
  const PIPE_SPEED = 3;
  const GROUND_HEIGHT = window.innerHeight * 0.1;

  // Collision detection
  const checkCollision = useCallback((birdYPos, currentPipes) => {
    const birdLeft = 100;
    const birdRight = birdLeft + BIRD_WIDTH;
    const birdTop = birdYPos;
    const birdBottom = birdYPos + BIRD_HEIGHT;

    // Ground collision
    if (birdBottom > window.innerHeight - GROUND_HEIGHT) {
      return true;
    }

    // Pipe collision
    return currentPipes.some(pipe => {
      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PIPE_WIDTH;

      // Only check collision if bird is within pipe's x-coordinates
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        const topPipeBottom = pipe.gap;
        const bottomPipeTop = pipe.gap + PIPE_GAP;

        return birdTop < topPipeBottom || birdBottom > bottomPipeTop;
      }
      return false;
    });
  }, [BIRD_WIDTH, BIRD_HEIGHT, PIPE_GAP, PIPE_WIDTH, GROUND_HEIGHT]);

  // Start game
  const startGame = useCallback(() => {
    setGameStarted(true);
    setBirdY(window.innerHeight * 0.3);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const pipeInterval = setInterval(() => {
      setPipes(prevPipes => {
        const newPipe = {
          x: window.innerWidth,
          gap: Math.floor(Math.random() * (window.innerHeight - PIPE_GAP - GROUND_HEIGHT - 100)) + 50,
          scored: false
        };
        return [...prevPipes, newPipe];
      });
    }, 2000);

    const gameLoop = setInterval(() => {
      setBirdVelocity(prev => prev + GRAVITY);
      setBirdY(prev => prev + birdVelocity);

      setPipes(prevPipes => {
        const updatedPipes = prevPipes
          .map(pipe => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED,
          }))
          .filter(pipe => pipe.x + PIPE_WIDTH > -50);

        // Score update
        updatedPipes.forEach(pipe => {
          if (!pipe.scored && pipe.x + PIPE_WIDTH < 100) {
            setScore(prev => prev + 1);
            pipe.scored = true;
          }
        });

        return updatedPipes;
      });

      if (checkCollision(birdY, pipes)) {
        setGameOver(true);
      }
    }, 1000 / 60);

    return () => {
      clearInterval(pipeInterval);
      clearInterval(gameLoop);
    };
  }, [gameStarted, gameOver, birdY, birdVelocity, pipes, checkCollision]);

  // Jump handler
  const handleJump = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!gameStarted) {
      startGame();
    } else if (!gameOver) {
      setBirdVelocity(JUMP_STRENGTH);
    }
  }, [gameStarted, gameOver, startGame]);

  // Key handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        handleJump(e);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleJump]);

  return (
    <div
      className="game-container"
      onClick={handleJump}
      style={{
        position: "relative",
        width: "100%",
        height: "90vh",
        overflow: "hidden",
        backgroundImage: `url(${isDay ? BG : BGnight})`,
        backgroundSize: "cover",
        cursor: "pointer",
      }}
    >
      <div
        className="score"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "48px",
          color: "white",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {score}
      </div>

      {/* Bird */}
      <div
        style={{
          position: "absolute",
          left: "100px",
          top: `${birdY}px`,
          width: `${BIRD_WIDTH}px`,
          height: `${BIRD_HEIGHT}px`,
          backgroundImage: `url(${
            birdVelocity < -2 ? BirdUp : birdVelocity > 2 ? BirdDown : BirdBase
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: `rotate(${Math.min(Math.max(birdVelocity * 3, -30), 30)}deg)`,
          transition: "transform 0.1s",
        }}
      />

      {/* Pipes */}
      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              position: "absolute",
              left: `${pipe.x}px`,
              top: "0",
              width: `${PIPE_WIDTH}px`,
              height: `${pipe.gap}px`,
              backgroundImage: `url(${SiloDown})`,
              backgroundSize: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${pipe.x}px`,
              top: `${pipe.gap + PIPE_GAP}px`,
              width: `${PIPE_WIDTH}px`,
              height: `${window.innerHeight - (pipe.gap + PIPE_GAP)}px`,
              backgroundImage: `url(${SiloUp})`,
              backgroundSize: "cover",
            }}
          />
        </React.Fragment>
      ))}

      {/* Ground */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "200%",
          height: `${GROUND_HEIGHT}px`,
          backgroundImage: `url(${Ground})`,
          backgroundSize: "repeat-x",
          animation: "move-ground 3s linear infinite",
        }}
      />

      {/* Start screen */}
      {!gameStarted && !gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          <h1>Flappy Bird</h1>
          <p>Click or press Space to start</p>
        </div>
      )}

      {/* Game over screen */}
      {gameOver && (
        <div
          className="game-over"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              color: "white",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Game Over
            <div style={{ fontSize: "24px", marginTop: "10px" }}>
              Score: {score}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              startGame();
            }}
            style={{
              padding: "12px 25px",
              fontSize: "18px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Play Again
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
            style={{
              padding: "12px 25px",
              fontSize: "18px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Home
          </button>
        </div>
      )}
    </div>
  );
};

export default FlappyBird;
