import React, { useState, useEffect } from "react";

const MiniLearningTools = () => {
  const [word, setWord] = useState("");
  const [fact, setFact] = useState("");
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [calc, setCalc] = useState("");

  const words = [
    { en: "Eloquent", bn: "বক্তৃতাপূর্ণ" },
    { en: "Diligent", bn: "পরিশ্রমী" },
    { en: "Serenity", bn: "শান্তি" },
    { en: "Ambitious", bn: "উদ্দেশ্যমুখী" },
    { en: "Innovate", bn: "নতুনত্ব সৃষ্টি করা" },
    { en: "Curiosity", bn: "জিজ্ঞাসু" },
    { en: "Optimism", bn: "আশাবাদী" },
    { en: "Resilience", bn: "সহিষ্ণুতা" },
  ];

  const facts = [
    "The human brain has about 86 billion neurons.",
    "Bananas are berries, but strawberries are not.",
    "Octopuses have three hearts.",
    "Honey never spoils.",
    "Reading for 6 minutes reduces stress by 68%.",
  ];

  const wordIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 6)) % words.length;
  const factIndex = Math.floor(Math.random() * facts.length);
  const wordOfTheDay = words[wordIndex];
  const randomFact = fact || facts[factIndex];

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      clearInterval(interval);
      alert("⏰ Time’s up! Take a short break.");
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleCalc = (value) => {
    if (value === "C") return setCalc("");
    if (value === "=") {
      try {
        setCalc(eval(calc).toString());
      } catch {
        setCalc("Error");
      }
      return;
    }
    setCalc(calc + value);
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-cyan-400 drop-shadow-lg">
          🧩 Mini Learning Tools
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Calculator */}
          <div className="bg-gray-800/80 border border-cyan-600 rounded-2xl shadow-lg p-5 flex flex-col h-full hover:scale-[1.03] transition">
            <h3 className="font-semibold text-lg mb-3 text-center text-cyan-400">
              🧮 Quick Calculator
            </h3>
            <input
              value={calc}
              readOnly
              className="w-full border border-gray-600 rounded-md p-2 mb-2 text-center text-lg bg-gray-900 text-white"
            />
            <div className="grid grid-cols-4 gap-2 flex-grow">
              {[
                "7",
                "8",
                "9",
                "/",
                "4",
                "5",
                "6",
                "*",
                "1",
                "2",
                "3",
                "-",
                "0",
                ".",
                "C",
                "+",
              ].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalc(btn)}
                  className="bg-cyan-700 hover:bg-cyan-600 text-white p-2 rounded-md transition"
                >
                  {btn}
                </button>
              ))}
              <button
                onClick={() => handleCalc("=")}
                className="col-span-4 bg-green-600 text-white p-2 rounded-md mt-2 hover:bg-green-500 transition"
              >
                =
              </button>
            </div>
          </div>

          {/* Word of the Day */}
          <div className="bg-gray-800/80 border border-yellow-400 rounded-2xl shadow-lg p-5 flex flex-col justify-center items-center text-center h-full hover:scale-[1.03] transition">
            <h3 className="font-semibold text-lg mb-3 text-yellow-400">
              🧠 Word of the Day
            </h3>
            <p className="text-2xl font-bold text-green-400 mb-1">
              {wordOfTheDay.en}
            </p>
            <p className="text-sm text-gray-300 italic">{wordOfTheDay.bn}</p>
          </div>

          {/* Random Fact */}
          <div className="bg-gray-800/80 border border-pink-500 rounded-2xl shadow-lg p-5 flex flex-col justify-between text-center h-full hover:scale-[1.03] transition">
            <h3 className="font-semibold text-lg mb-3 text-pink-400">
              📖 Random Fact
            </h3>
            <p className="text-gray-200 mb-4">{randomFact}</p>
            <button
              onClick={() =>
                setFact(facts[Math.floor(Math.random() * facts.length)])
              }
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-500 self-center transition"
            >
              New Fact
            </button>
          </div>

          {/* Pomodoro Timer */}
          <div className="bg-gray-800/80 border border-purple-500 rounded-2xl shadow-lg p-5 flex flex-col justify-between text-center h-full hover:scale-[1.03] transition">
            <h3 className="font-semibold text-lg mb-3 text-purple-400">
              ⏳ Study Timer
            </h3>
            <p className="text-3xl font-bold text-yellow-400">
              {formatTime(time)}
            </p>
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => setIsActive(!isActive)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition"
              >
                {isActive ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                  setTime(25 * 60);
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniLearningTools;
