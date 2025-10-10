import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import userAxiosPublic from "../../Hooks/userAxiosPublic";

const operations = ["+", "-", "*", "/"];

const GenerateQuestion = (difficulty = 1) => {
  const maxNum = difficulty * 10;
  const num1 = Math.floor(Math.random() * maxNum) + 1;
  const num2 = Math.floor(Math.random() * maxNum) + 1;
  const op = operations[Math.floor(Math.random() * operations.length)];

  let question = `${num1} ${op} ${num2}`;
  let answer = eval(question);
  if (op === "/") answer = parseFloat(answer.toFixed(2));

  return { question, answer };
};

const MathChallenge = () => {
  const { user } = useAuth();
  const axiosPublic = userAxiosPublic();

  const [difficulty, setDifficulty] = useState(1);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (time <= 0) {
      handleGameOver();
      return;
    }
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time, gameStarted, gameOver]);

  const saveScoreToDB = async (pointsThisGame, bestStreakThisGame) => {
    if (!user?.email) return;
    try {
      const resUser = await axiosPublic.get(`/users/user/${user.email}`);
      const mainUser = resUser.data;
      if (!mainUser?._id) return;

      await axiosPublic.post("/math-game/score", {
        userName: mainUser.name,
        userPhoto: mainUser.photo,
        userEmail: mainUser.email,
        userId: mainUser._id,
        points: pointsThisGame,
        streak: bestStreakThisGame,
      });

      toast.success("🎉 Score saved successfully!", { position: "top-right" });
    } catch (err) {
      // console.error("Error saving score:", err);
      toast.error("❌ Failed to save score!", { position: "top-right" });
    }
  };

  const handleStart = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTime(30);
    setQuestionData(GenerateQuestion(difficulty));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAns = parseFloat(userAnswer);

    if (userAns === questionData.answer) {
      let pointsEarned = difficulty;
      const newStreak = streak + 1;

      if (newStreak >= 5 && newStreak < 10) pointsEarned += 2;
      else if (newStreak >= 10 && newStreak < 15) pointsEarned += 5;
      else if (newStreak >= 15) pointsEarned += 10;

      setScore(score + pointsEarned);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if ([5, 10, 15].includes(newStreak)) confetti();
    } else {
      setStreak(0);
    }

    setQuestionData(GenerateQuestion(difficulty));
    setUserAnswer("");
    setTime(30);
  };

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
    saveScoreToDB(score, bestStreak);
  };

  return (
    <div className="px-5 pt-5 w-full">
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-lg shadow-2xl mt-10 border-b-2 border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">
          🧮 Math Challenge
        </h2>

        {!gameStarted ? (
          <div className="text-center">
            <button
              onClick={handleStart}
              className="bg-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-purple-600 transition duration-300 shadow-md"
            >
              Start Game
            </button>
          </div>
        ) : !gameOver ? (
          <>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-lg">
              <span className="font-semibold text-green-400">
                Score: {score}
              </span>
              <span className="font-semibold text-red-500">Time: {time}s</span>
              <span className="font-semibold text-yellow-400">
                Streak: {streak}
              </span>
            </div>

            <p className="text-2xl font-semibold text-center mb-6 text-white">
              Question: {questionData?.question}
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer"
                className="flex-1 bg-gray-900 text-white border border-gray-600 p-3 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="submit"
                className="bg-cyan-500 text-white px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-cyan-400 transition duration-300 shadow-md"
              >
                Submit
              </button>
            </form>

            <div className="flex justify-between items-center text-lg">
              <label className="font-semibold text-gray-300">
                Difficulty:{" "}
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(parseInt(e.target.value))}
                  className="bg-gray-900 text-white border border-gray-600 rounded px-3 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value={1}>Easy</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Hard</option>
                </select>
              </label>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 text-red-500">Game Over!</h3>
            <p className="mb-2 text-lg text-white">Your final score: {score}</p>
            <p className="mb-4 text-lg text-yellow-400">
              Best streak: {bestStreak}
            </p>
            <button
              onClick={handleStart}
              className="bg-green-500 text-white px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathChallenge;
