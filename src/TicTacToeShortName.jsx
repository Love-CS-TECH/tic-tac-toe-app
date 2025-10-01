import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Futuristic 3D TicTacToe Short Name Game (Two-player, local mode)
export default function TicTacToeApp() {
  const [playerAName, setPlayerAName] = useState("");
  const [playerBName, setPlayerBName] = useState("");
  const [shortA, setShortA] = useState("");
  const [shortB, setShortB] = useState("");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("A");
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(0);
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  function genShort(name) {
    if (!name) return "";
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return words.slice(0, 3).map(w => w[0].toUpperCase()).join("");
  }

  function getAllPermutations(str) {
    if (str.length <= 1) return [str];
    const perms = [];
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const rest = str.slice(0, i) + str.slice(i + 1);
      for (const perm of getAllPermutations(rest)) {
        perms.push(char + perm);
      }
    }
    return perms;
  }

  function startGame() {
    const sA = genShort(playerAName);
    const sB = genShort(playerBName);
    if (!sA || !sB) return alert("Please enter both players' names.");
    setShortA(sA);
    setShortB(sB);
    setBoard(Array(9).fill(""));
    setTurn("A");
    setIndexA(0);
    setIndexB(0);
    setWinner(null);
    setStarted(true);
    setShowHome(false);
  }

  function resetAll() {
    setPlayerAName("");
    setPlayerBName("");
    setShortA("");
    setShortB("");
    setBoard(Array(9).fill(""));
    setTurn("A");
    setIndexA(0);
    setIndexB(0);
    setStarted(false);
    setWinner(null);
    setShowIntro(true);
  }

  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner(bd, short) {
    const L = short.length;
    if (L === 0) return false;
    const perms = getAllPermutations(short.toUpperCase());

    for (const line of lines) {
      const s = line.map(i => bd[i] || "").join("");
      if (s.length === L && perms.includes(s)) {
        return true;
      }
    }
    return false;
  }

  function handleCellClick(i) {
    if (!started || winner) return;
    if (board[i]) return;

    const bd = board.slice();
    if (turn === "A") {
      const char = shortA[indexA % shortA.length];
      bd[i] = char;
      setBoard(bd);
      setIndexA(indexA + 1);
      if (checkWinner(bd, shortA)) {
        setWinner({ player: "A", name: playerAName });
        return;
      }
      setTurn("B");
    } else {
      const char = shortB[indexB % shortB.length];
      bd[i] = char;
      setBoard(bd);
      setIndexB(indexB + 1);
      if (checkWinner(bd, shortB)) {
        setWinner({ player: "B", name: playerBName });
        return;
      }
      setTurn("A");
    }

    if (!bd.includes("") && !winner) {
      setWinner({ player: "draw" });
    }
  }

  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute w-64 h-1 bg-cyan-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-32"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute w-64 h-1 bg-cyan-400 top-1/2 left-1/2 -translate-x-1/2 translate-y-32"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute h-64 w-1 bg-pink-400 top-1/2 left-1/2 -translate-x-32 -translate-y-1/2"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute h-64 w-1 bg-pink-400 top-1/2 left-1/2 translate-x-32 -translate-y-1/2"
        />

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
        >
          TicTacToe Awakens
        </motion.h1>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 overflow-hidden relative">
        <motion.h1
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-10 drop-shadow-xl text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
        >
          🚀 Enter the Futuristic TicTacToe
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-lg"
        >
          <label className="block mb-3">Player A (starts):
            <input value={playerAName} onChange={e => setPlayerAName(e.target.value)} placeholder="Enter Player A Name" className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/20" />
          </label>
          <label className="block mb-3">Player B:
            <input value={playerBName} onChange={e => setPlayerBName(e.target.value)} placeholder="Enter Player B Name" className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/20" />
          </label>
          <button onClick={startGame} className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-lg font-bold shadow-lg hover:scale-105 transition">
            Start Game
          </button>
          <button onClick={() => setShowIntro(true)} className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-md font-semibold hover:scale-105 transition">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <h1 className="text-3xl font-extrabold mb-6 text-center">⚡ Futuristic TicTacToe ⚡</h1>
        <div className="flex gap-10">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-3 bg-black/30 p-4 rounded-2xl shadow-inner">
              {board.map((cell, i) => (
                <button key={i} onClick={() => handleCellClick(i)} className={`h-24 w-24 flex items-center justify-center text-3xl font-bold rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-white/20 hover:from-purple-600 hover:to-pink-600 transition-transform transform hover:scale-105 ${cell ? 'cursor-default' : ''}`}>
                  {cell}
                </button>
              ))}
            </div>
            <div className="mt-4 text-center">
              {winner ? (
                winner.player === 'draw' ? (
                  <div className="text-xl font-bold text-yellow-400">🤝 It's a draw!</div>
                ) : (
                  <div className="text-2xl font-bold text-green-400">🎉 {winner.name} Wins!</div>
                )
              ) : (
                <div className="text-lg">Turn: <span className="font-semibold text-cyan-400">{turn === 'A' ? (playerAName || 'Player A') : (playerBName || 'Player B')}</span></div>
              )}
            </div>
          </div>
          <div className="flex-1 bg-black/30 rounded-2xl p-4">
            <h2 className="font-semibold mb-3">📜 Rules</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Each player’s short form is generated: initials (if multi-word) or first 3 letters (if single word).</li>
              <li>Players place the next letter of their short form in turn.</li>
              <li>You win by aligning any permutation of your short form on a row/col/diag.</li>
              <li>Draw if board fills without a winner.</li>
            </ul>
            <div className="mt-4">
              <div className="text-sm">Player A: <span className="font-bold text-green-300">{shortA}</span> ({playerAName})</div>
              <div className="text-sm">Player B: <span className="font-bold text-pink-300">{shortB}</span> ({playerBName})</div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={resetAll} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500">Reset</button>
              <button onClick={() => {setStarted(false); setShowHome(true);}} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
