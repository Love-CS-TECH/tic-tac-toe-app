import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// TicTacToeShortName.jsx
// Futuristic 3D TicTacToe Short Name Game with permutation win logic
export default function TicTacToeApp() {
  const [playerAName, setPlayerAName] = useState("");
  const [playerBName, setPlayerBName] = useState("");
  const [shortA, setShortA] = useState("");
  const [shortB, setShortB] = useState("");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [ownerBoard, setOwnerBoard] = useState(Array(9).fill(null)); // 'A' or 'B' or null
  const [turn, setTurn] = useState("A");
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(0);
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState(null); // { player:'A'|'B'|'draw', name?:string, indices?:number[] }
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) {
      const t = setTimeout(() => setShowIntro(false), 3800);
      return () => clearTimeout(t);
    }
  }, [showIntro]);

  function genShort(name) {
    if (!name) return "";
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return words.slice(0, 3).map(w => w[0].toUpperCase()).join("");
  }

  // return unique permutations as an array
  function getAllPermutations(str) {
    const results = new Set();
    function permute(s, prefix = "") {
      if (s.length === 0) {
        results.add(prefix);
        return;
      }
      for (let i = 0; i < s.length; i++) {
        permute(s.slice(0, i) + s.slice(i + 1), prefix + s[i]);
      }
    }
    permute(str);
    return Array.from(results);
  }

  function startGame() {
    const sA = genShort(playerAName);
    const sB = genShort(playerBName);
    if (!sA || !sB) {
      alert("Please enter both players' names.");
      return;
    }
    setShortA(sA);
    setShortB(sB);
    setBoard(Array(9).fill(""));
    setOwnerBoard(Array(9).fill(null));
    setTurn("A");
    setIndexA(0);
    setIndexB(0);
    setWinner(null);
    setStarted(true);
  }

  function resetAll() {
    setPlayerAName("");
    setPlayerBName("");
    setShortA("");
    setShortB("");
    setBoard(Array(9).fill(""));
    setOwnerBoard(Array(9).fill(null));
    setTurn("A");
    setIndexA(0);
    setIndexB(0);
    setWinner(null);
    setStarted(false);
    setShowIntro(true);
  }

  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  // Check for a win for a player. Returns winning indices array if found, otherwise null.
  function checkWinner(bd, short, ownerBd, player) {
    const L = short.length;
    if (L === 0) return null;
    const perms = new Set(getAllPermutations(short.toUpperCase()));

    for (const line of lines) {
      // for each possible contiguous window within the 3-length line
      for (let start = 0; start <= 3 - L; start++) {
        const window = line.slice(start, start + L);
        // all cells in window must be owned by the player
        const ownersOk = window.every(i => ownerBd[i] === player);
        if (!ownersOk) continue;
        const s = window.map(i => (bd[i] || "").toUpperCase()).join("");
        if (s.length === L && perms.has(s)) {
          return window;
        }
      }
    }
    return null;
  }

  function handleCellClick(i) {
    if (!started || winner) return;
    if (board[i]) return;

    const bd = board.slice();
    const ob = ownerBoard.slice();

    if (turn === "A") {
      const char = shortA[indexA % shortA.length];
      bd[i] = char;
      ob[i] = 'A';
      setBoard(bd);
      setOwnerBoard(ob);
      setIndexA(indexA + 1);
      const win = checkWinner(bd, shortA, ob, 'A');
      if (win) {
        setWinner({ player: 'A', name: playerAName, indices: win });
        return;
      }
      // draw check
      if (!bd.includes("") ) {
        setWinner({ player: 'draw' });
        return;
      }
      setTurn('B');

    } else {
      const char = shortB[indexB % shortB.length];
      bd[i] = char;
      ob[i] = 'B';
      setBoard(bd);
      setOwnerBoard(ob);
      setIndexB(indexB + 1);
      const win = checkWinner(bd, shortB, ob, 'B');
      if (win) {
        setWinner({ player: 'B', name: playerBName, indices: win });
        return;
      }
      if (!bd.includes("") ) {
        setWinner({ player: 'draw' });
        return;
      }
      setTurn('A');
    }
  }

  // Intro animation (draws 2 vertical/horizontal lines in sequence)
  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <motion.svg width="360" height="360" viewBox="0 0 360 360">
          <defs>
            <filter id="f" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Vertical 1 */}
          <motion.line x1="120" y1="20" x2="120" y2="340" stroke="#00f6ff" strokeWidth="6" strokeLinecap="round" filter="url(#f)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0 }} />

          {/* Vertical 2 */}
          <motion.line x1="240" y1="20" x2="240" y2="340" stroke="#ff7adf" strokeWidth="6" strokeLinecap="round" filter="url(#f)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.9 }} />

          {/* Horizontal 1 */}
          <motion.line x1="20" y1="120" x2="340" y2="120" stroke="#a0ffef" strokeWidth="6" strokeLinecap="round" filter="url(#f)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 1.8 }} />

          {/* Horizontal 2 */}
          <motion.line x1="20" y1="240" x2="340" y2="240" stroke="#ffd07a" strokeWidth="6" strokeLinecap="round" filter="url(#f)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 2.7 }} />
        </motion.svg>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.3 }} className="absolute bottom-24 text-4xl font-bold text-cyan-300">TicTacToe Awakens</motion.h1>
      </div>
    );
  }

  // Name entry screen
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="text-4xl font-extrabold mb-8 text-center">🚀 Futuristic Short-Name TicTacToe</motion.h1>

        <div className="bg-white/5 backdrop-blur p-6 rounded-2xl shadow-lg w-full max-w-md">
          <label className="block mb-4">
            <div className="text-sm text-gray-300 mb-1">Player A (starts)</div>
            <input value={playerAName} onChange={e => setPlayerAName(e.target.value)} placeholder="Enter Player A Name" className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white" />
          </label>

          <label className="block mb-4">
            <div className="text-sm text-gray-300 mb-1">Player B</div>
            <input value={playerBName} onChange={e => setPlayerBName(e.target.value)} placeholder="Enter Player B Name" className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white" />
          </label>

          <div className="flex gap-3">
            <button onClick={startGame} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 font-semibold">Start Game</button>
            <button onClick={resetAll} className="py-3 px-4 rounded-lg bg-gray-700">Reset</button>
          </div>

          <div className="mt-4 text-xs text-gray-400">Short forms will be generated automatically (initials or first 3 letters).</div>
        </div>
      </div>
    );
  }

  // Main game screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur p-8 rounded-3xl shadow-2xl border border-white/10">
        <h1 className="text-2xl font-bold mb-6 text-center">⚡ Futuristic TicTacToe ⚡</h1>

        <div className="flex gap-8">
          <div>
            <div className="grid grid-cols-3 gap-3 bg-black/30 p-4 rounded-2xl shadow-inner">
              {board.map((cell, i) => {
                const isWinning = winner && winner.indices && winner.indices.includes(i);
                return (
                  <button key={i} onClick={() => handleCellClick(i)} disabled={!!cell || !!winner} className={`h-20 w-20 flex items-center justify-center text-2xl font-bold rounded-2xl transition-transform transform ${cell ? 'cursor-default' : 'hover:scale-105'} ${isWinning ? 'bg-green-500 text-black' : 'bg-gradient-to-br from-gray-800 to-gray-700'}`}>
                    {cell}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              {winner ? (
                winner.player === 'draw' ? (
                  <div className="text-xl font-bold text-yellow-400">🤝 It's a draw!</div>
                ) : (
                  <div className="text-2xl font-bold text-green-400">🎉 {winner.name} Wins!</div>
                )
              ) : (
                <div className="text-lg">Turn: <span className="font-semibold text-cyan-300">{turn === 'A' ? (playerAName || 'Player A') : (playerBName || 'Player B')}</span></div>
              )}
            </div>
          </div>

          <div className="flex-1 bg-black/30 rounded-2xl p-4">
            <h2 className="font-semibold mb-3">📜 Rules</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Each player’s short form is generated: initials (if multi-word) or first 3 letters (if single word).</li>
              <li>Players place the next letter of their short form in turn.</li>
              <li>You win if any contiguous segment (length = short form length) in a row/col/diag contains a permutation of your short form and <strong>all those letters were placed by you</strong>.</li>
              <li>Draw if board fills without a winner.</li>
            </ul>

            <div className="mt-4 text-sm">Player A: <span className="font-bold text-green-300">{shortA}</span> ({playerAName})</div>
            <div className="mt-2 text-sm">Player B: <span className="font-bold text-pink-300">{shortB}</span> ({playerBName})</div>

            <div className="mt-6 flex gap-3">
              <button onClick={resetAll} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500">Reset</button>
              <button onClick={() => { setStarted(false); setShowIntro(true); }} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
