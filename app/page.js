'use client';
import { useState } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import ScratchToReveal from '@/components/ScratchToReveal';
import React from 'react';
import Confetti from 'react-confetti';
import { CiHeart } from 'react-icons/ci';
import { FaGrinHearts, FaKissWinkHeart, FaHeartBroken, FaHeart } from 'react-icons/fa';
import '../app/globals.css';

const page = () => {
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [isNoClicked, setIsNoClicked] = useState(false);

  const handleYesClick = () => {
    setIsYesClicked(true);
    setTimeout(() => {
      // Redirect to WhatsApp after animation
      window.location.href = "https://wa.me/08127565607?text=Yes%2C%20I%20will%20be%20your%20Valentine%20%F0%9F%92%96%F0%9F%8C%B9%F0%9F%A4%8D";
    }, 5000); // Adjust the time based on animation length
  };

  const handleNoClick = () => {
    setIsNoClicked(true);
  };

  return (
    <div className="flex flex-col overflow-y-auto items-center justify-center min-h-screen bg-gradient-to-r from-black via-black to-red-900 scrollbar-hide scroll-container font-dancingScript">
      <CountdownTimer />

      <div className="text-center mt-6">
        {/* Conditional content based on Yes or No click */}
        {!isYesClicked && !isNoClicked && (
          <>
            <h2 className="text-3xl font-semibold text-center text-pink-500">
              Will you be my Valentine? 💕
            </h2>
            <div className="flex justify-center items-center gap-4 mt-2">
              <button
                onClick={handleYesClick}
                className="px-6 py-3 text-white bg-red-500 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className="px-6 py-3 text-white bg-gray-500 rounded-full hover:bg-gray-600 transition"
              >
                No
              </button>
            </div>
          </>
        )}

        {/* Animation for Yes Button */}
        {isYesClicked && (
          <>
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}  // Customize the number of pieces
              gravity={0.2}         // Adjust gravity (fall speed)
              colors={["#ff0", "#f00", "#ff8c00", "#ff00ff"]}  // Custom colors for confetti
            />
            <div className="flex items-center justify-center">
              <div className="animate-pulse text-4xl text-red-600 flex flex-col">
                <div className='flex flex-row gap-2'>
                  <FaHeart className="text-red-500" size={60} />
                  <FaGrinHearts className="text-red-500" size={60} />
                  <FaKissWinkHeart className="text-red-500" size={60} />
                </div>
                <div className="mt-4 text-white">Sending your love...</div>
              </div>
            </div>
          </>
        )}

        {/* Playful/Sad Animation for No Button */}
        {isNoClicked && (
          <>
            <div className="flex items-center justify-center">
              <div className="text-xl text-gray-700 flex flex-col items-center justify-center">
                <FaHeartBroken className="text-red-600" size={60} />
                <p className="mt-4 text-white">Aww, maybe next time?</p>
              </div>
            </div>
          </>
        )}
      </div>
      <ScratchToReveal />
    </div>
  );
};

export default page;
