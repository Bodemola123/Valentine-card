"use client";
import { useRef, useEffect, useState } from "react";

const ScratchToReveal = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const scratchImage = new Image();
    scratchImage.src = "/Card.png"; // Replace with your image path

    const desiredSize = 300; // Set the desired size of the image and canvas

    // Set the canvas dimensions
    canvas.width = desiredSize;
    canvas.height = desiredSize;

    scratchImage.onload = () => {
      // Draw the image to match the canvas dimensions (resize to fit the canvas)
      ctx.drawImage(scratchImage, 0, 0, desiredSize, desiredSize);
    };

    let isDrawing = false;

    const startDrawing = (e) => {
      isDrawing = true;
      draw(e);
    };

    const endDrawing = () => {
      isDrawing = false;

      // Check if enough of the area is scratched
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let scratchedPixels = 0;
      for (let i = 3; i < imageData.length; i += 4) {
        if (imageData[i] === 0) scratchedPixels++;
      }

      const totalPixels = canvas.width * canvas.height;
      const scratchPercentage = (scratchedPixels / totalPixels) * 100;

      if (scratchPercentage > 70) setIsRevealed(true);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
    };

    // Event Listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", endDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", endDrawing);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {isRevealed ? (
        <div className="w-[300px] h-[300px] bg-black rounded-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            loop
            autoPlay
            muted
          >
            <source src="/Handvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <>
          <h2 className="text-2xl text-center font-semibold text-pink-600 mb-4">
            Scratch to reveal your surprise! 🎉
          </h2>
          <canvas
            ref={canvasRef}
            className="w-[300px] h-[300px] border rounded-lg shadow-lg"
          />
        </>
      )}
    </div>
  );
};

export default ScratchToReveal;
