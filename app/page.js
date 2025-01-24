'use client';
import { useState } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import ScratchToReveal from '@/components/ScratchToReveal';
import React from 'react';
import Confetti from 'react-confetti';
import { FaGrinHearts, FaKissWinkHeart, FaHeartBroken, FaHeart } from 'react-icons/fa';
import '../app/globals.css';

const page = () => {
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [isNoClicked, setIsNoClicked] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0); // Track No button clicks

  // Handle Yes button click
  const handleYesClick = () => {
    setIsYesClicked(true);
    setTimeout(() => {
      // Redirect to WhatsApp after animation
      window.location.href = "https://wa.me/2348127565607?text=Yes%2C%20I%20will%20be%20your%20Valentine%20%F0%9F%98%98%F0%9F%92%9C%F0%9F%98%8D%F0%9F%98%98%F0%9F%98%98";
    }, 5000); // Adjust the time based on animation length
  };

  // Handle No button click
  const handleNoClick = () => {
    setNoClickCount((prevCount) => prevCount + 1); // Increase click count

    if (noClickCount >= 4) {
      setIsNoClicked(true); // Show message on the 5th click
    }
  };

  // Dynamically change button position based on click count
  const noButtonPosition = [
    "", // Initial position (no movement on first load)
    "top-10 left-50", // 1st click moves to this position
    "bottom-20 left-10", // 2nd click moves to this position
    "top-50 right-80", // 3rd click moves to this position
    "bottom-70 right-20", // 4th click moves to this position
  ][Math.min(noClickCount, 4)]; // Cap index to avoid going out of bounds

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
            <div className="flex justify-center items-center gap-4 mt-2 relative">
              <button
                onClick={handleYesClick}
                className="px-6 py-3 text-white bg-red-500 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className={`px-6 py-3 text-white bg-gray-500 rounded-full hover:bg-gray-600 transition ${
                  noClickCount > 0 ? `absolute ${noButtonPosition}` : ""
                }`}
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
              numberOfPieces={200} // Customize the number of pieces
              gravity={0.2} // Adjust gravity (fall speed)
              colors={["#ff0", "#f00", "#ff8c00", "#ff00ff"]} // Custom colors for confetti
            />
            <div className="flex items-center justify-center">
              <div className="animate-pulse text-4xl text-red-600 flex flex-col">
                <div className="flex flex-row items-center justify-center gap-2">
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
