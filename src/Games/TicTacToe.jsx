import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicTac = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const navigate = useNavigate();

    const handleClick = useCallback(
        (index) => {
            if (board[index] || winner) return;

            const newBoard = [...board];
            newBoard[index] = isXNext ? "X" : "O";
            setBoard(newBoard);
            setIsXNext(!isXNext);
            checkWinner(newBoard);
        },
        [board, isXNext, winner]
    );

    const aiMove = useCallback(() => {
        const emptySquares = board
            .map((value, index) => (value === null ? index : null))
            .filter((index) => index !== null);
        if (emptySquares.length > 0) {
            const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
            handleClick(randomMove);
        }
    }, [board, handleClick]);

    useEffect(() => {
        if (!isXNext && winner === null) {
            setTimeout(aiMove, 500);
        }
    }, [isXNext, winner, aiMove]);

    const checkWinner = (newBoard) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                setWinner(newBoard[a]);
                return;
            }
        }

        if (!newBoard.includes(null)) {
            setWinner("Draw");
        }
    };

    const renderSquare = (index) => (
        <Square value={board[index]} onClick={() => handleClick(index)} />
    );

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    const navigateHome = () => {
        navigate("/");
    };

    const resultMessage = winner === "Draw" ? "It's a Draw!" : winner === "X" ? "You Win!" : "You Lose!";
    const resultColor = winner === "Draw" ? "#333" : winner === "X" ? "green" : "red";

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Tic Tac Toe</h1>
            <div style={styles.card}>
                <div style={styles.board}>
                    {Array(3)
                        .fill(null)
                        .map((_, rowIndex) => (
                            <div key={rowIndex} style={styles.row}>
                                {Array(3)
                                    .fill(null)
                                    .map((_, colIndex) =>
                                        renderSquare(rowIndex * 3 + colIndex)
                                    )}
                            </div>
                        ))}
                </div>
            </div>
            {winner && (
                <div style={{ ...styles.result, color: resultColor }}>
                    {resultMessage}
                    <div style={styles.spacing} />
                    <button onClick={resetGame} style={styles.resetButton}>
                        Restart Game
                    </button>
                    <button onClick={navigateHome} style={styles.resetButton}>
                        Go Home
                    </button>
                </div>
            )}
            <p style={styles.nextPlayer}>
                Next Player: {isXNext ? "X" : "O"}
            </p>
        </div>
    );
};

const Square = ({ value, onClick }) => (
    <button style={styles.square} onClick={onClick}>
        {value}
    </button>
);

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Arial', sans-serif",
        minHeight: "100vh",
    },
    title: {
        fontSize: "48px",
        fontWeight: "700",
        marginBottom: "20px",
        color: "white",
    },
    card: {
        background: "lightgrey",
        borderRadius: "15px",
        padding: "40px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
    },
    board: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
    },
    square: {
        width: "100px",
        height: "100px",
        background: "lightblue",
        border: "3px solid darkblue",
        fontSize: "48px",
        fontWeight: "800",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.3s ease",
    },
    result: {
        marginTop: "30px",
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
    },
    spacing: {
        marginBottom: "20px",
    },
    resetButton: {
        marginTop: "20px",
        padding: "12px 25px",
        fontSize: "18px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "8px",
        marginRight: "10px",
    },
    nextPlayer: {
        marginTop: "20px",
        fontSize: "24px",
        color: "white",
    },
};

export default TicTac;
