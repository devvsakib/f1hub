import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const ReactionGame = () => {
  const [lightsOn, setLightsOn] = useState(0);
  const [canClick, setCanClick] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [earlyClick, setEarlyClick] = useState(false);
  let interval;
  let timeout;

  useEffect(() => {

    const startLights = () => {
      let count = 0;
      interval = setInterval(() => {
        count += 1;
        setLightsOn(count);
        if (count === 5) {
          clearInterval(interval);
          timeout = setTimeout(() => {
            setCanClick(true);
            setStartTime(Date.now());
          }, Math.random() * 2000 + 1000);
        }
      }, 700);
    };

    startLights();
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = () => {
    if (!canClick && lightsOn < 5) {
      setEarlyClick(true);
      return;
    }
    if (canClick && startTime) {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      setCanClick(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-carbon text-white p-4">
      <h1 className="text-3xl font-bold mb-6">F1 Reaction Time Test</h1>

      <div className="flex space-x-4 mb-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-6 h-6 rounded-full ${i < lightsOn ? 'bg-red-500' : 'bg-gray-700'
              }`}
          />
        ))}
      </div>

      <button
        onClick={handleClick}
        className="bg-ferrari text-white py-3 px-6 rounded shadow-lg hover:bg-red-700 transition-all"
      >
        {reactionTime !== null
          ? `Your Time: ${reactionTime}ms`
          : earlyClick
            ? 'Too Early! Restart the test.'
            : canClick
              ? 'CLICK!'
              : 'Wait for Green...'}
      </button>
    </div>
  );
};
