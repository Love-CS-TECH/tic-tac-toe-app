import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TicTacToeApp from "./TicTacToeShortName";

export default function App() {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    // After 3.5 seconds, switch to the game
    const timer = setTimeout(() => {
      setShowGame(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (showGame) {
    return <TicTacToeApp />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="grid grid-cols-3 gap-4"
      >
        {/* 3x3 tic tac toe lines animation */}
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="w-20 h-20 border-4 border-cyan-400 rounded-xl shadow-xl"
          />
        ))}
      </motion.div>

      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 text-cyan-400 text-4xl font-bold tracking-widest"
      >
        TIC TAC TOE
      </motion.h1>
    </div>
  );
}
