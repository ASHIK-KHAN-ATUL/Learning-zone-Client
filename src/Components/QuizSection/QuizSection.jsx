import React, { useState } from "react";

const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars",
  },
  {
    question: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Nikola Tesla",
      "Albert Einstein",
      "Galileo Galilei",
    ],
    correct: "Albert Einstein",
  },
  {
    question: "What is the capital city of Japan?",
    options: ["Tokyo", "Osaka", "Kyoto", "Hiroshima"],
    correct: "Tokyo",
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correct: "Carbon Dioxide",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Indian Ocean",
      "Atlantic Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correct: "Pacific Ocean",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent Van Gogh",
      "Claude Monet",
    ],
    correct: "Leonardo da Vinci",
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    correct: "Portuguese",
  },
  {
    question: "Which instrument has keys, pedals, and strings?",
    options: ["Guitar", "Piano", "Violin", "Drum"],
    correct: "Piano",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correct: "100°C",
  },
  {
    question: "Who is known as the 'Father of Computers'?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    correct: "Charles Babbage",
  },
];

const QuizSection = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    setSelected(answer);
    if (answer === quizData[current].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl mt-10 border border-gray-700">
      {!showResult ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-md">
            🎯 Test Your Knowledge!
          </h2>
          <h3 className="font-semibold text-lg mb-3 text-white">
            Q{current + 1}: {quizData[current].question}
          </h3>

          <div className="flex flex-col gap-2">
            {quizData[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className={`border rounded-lg py-2 transition-all duration-200 font-medium ${
                  selected
                    ? option === quizData[current].correct
                      ? "bg-green-500 text-black shadow-lg"
                      : option === selected
                      ? "bg-red-500 text-black shadow-lg"
                      : "bg-gray-800 text-gray-300"
                    : "bg-gray-700 text-cyan-200 hover:bg-cyan-400 hover:text-black shadow-md"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selected && (
            <button
              onClick={nextQuestion}
              className="mt-4 bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-400 transition shadow-md"
            >
              {current + 1 === quizData.length ? "Show Result" : "Next"}
            </button>
          )}
        </>
      ) : (
        <div className="py-6">
          <h2 className="text-2xl font-bold text-green-400 mb-3 drop-shadow-md">
            🎉 Quiz Completed!
          </h2>
          <p className="text-lg font-semibold text-white">
            Your Score: <span className="text-yellow-400">{score}</span> /{" "}
            {quizData.length}
          </p>
          <button
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setSelected(null);
              setShowResult(false);
            }}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 shadow-md"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
