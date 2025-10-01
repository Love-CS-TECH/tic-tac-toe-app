import React, { useState, useEffect } from 'react';

export default function LandingPage({ onStartGame }) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 3000); // Animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      <div className="relative w-80 h-80 perspective-1000">
        {/* 3D Tic-Tac-Toe Grid */}
        <div className="absolute inset-0 flex items-center justify-center transform rotateX-12 rotateY-12">
          {/* Horizontal Lines */}
          <div className="absolute w-64 h-1 bg-white/80 top-20 animate-draw-line-1"></div>
          <div className="absolute w-64 h-1 bg-white/80 top-1/2 animate-draw-line-2"></div>
          <div className="absolute w-64 h-1 bg-white/80 bottom-20 animate-draw-line-3"></div>

          {/* Vertical Lines */}
          <div className="absolute h-64 w-1 bg-white/80 left-20 animate-draw-line-4"></div>
          <div className="absolute h-64 w-1 bg-white/80 left-1/2 animate-draw-line-5"></div>
          <div className="absolute h-64 w-1 bg-white/80 right-20 animate-draw-line-6"></div>
        </div>
      </div>

      <h1 className="text-5xl font-extrabold mt-8 drop-shadow-xl animate-fade-in">Tic-Tac-Toe</h1>
      <p className="text-xl mt-4 animate-fade-in-delay">Experience the classic game in 3D</p>

      {animationComplete && (
        <button
          onClick={onStartGame}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce-in"
        >
          Start Game
        </button>
      )}
    </div>
  );
}
