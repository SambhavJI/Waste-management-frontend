import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const quizData = {
  ewaste: [
    {
      question: "Which of these is considered e-waste?",
      options: ["Plastic bag", "Broken smartphone", "Banana peel", "Cardboard box"],
      answer: "Broken smartphone",
    },
    {
      question: "What is the main hazard in e-waste?",
      options: ["Lead and mercury", "Water content", "Dust", "Plastic"],
      answer: "Lead and mercury",
    },
    {
      question: "Where should old batteries be disposed?",
      options: ["General trash", "E-waste bin", "Wet waste bin", "Dry waste bin"],
      answer: "E-waste bin",
    },
    {
      question: "Which of these is recyclable e-waste?",
      options: ["Laptop", "Apple core", "Coconut shell", "Paper"],
      answer: "Laptop",
    },
    {
      question: "What happens if e-waste is burnt?",
      options: ["Releases toxic fumes", "Becomes fertilizer", "Safe disposal", "Nothing"],
      answer: "Releases toxic fumes",
    },
    {
      question: "Which heavy metal is common in e-waste?",
      options: ["Mercury", "Calcium", "Iron", "Potassium"],
      answer: "Mercury",
    },
    {
      question: "Which organization handles e-waste recycling?",
      options: ["CPCB", "ISRO", "WHO", "FAO"],
      answer: "CPCB",
    },
    {
      question: "Which item is NOT e-waste?",
      options: ["Fridge", "Television", "Plastic bottle", "Keyboard"],
      answer: "Plastic bottle",
    },
    {
      question: "What should be done before disposing of an old phone?",
      options: ["Factory reset", "Throw directly", "Soak in water", "Burn it"],
      answer: "Factory reset",
    },
    {
      question: "Which law regulates e-waste in India?",
      options: [
        "E-Waste (Management) Rules",
        "Clean India Act",
        "Pollution Act",
        "Plastic Ban Rules",
      ],
      answer: "E-Waste (Management) Rules",
    },
  ],

  "wet waste " : [
    {
      question: "Which of these is wet waste?",
      options: ["Vegetable peels", "Glass bottle", "Aluminum foil", "Pen"],
      answer: "Vegetable peels",
    },
    {
      question: "Which waste goes into composting?",
      options: ["Wet waste", "E-waste", "Dry waste", "Plastic"],
      answer: "Wet waste",
    },
    {
      question: "Which of these is NOT wet waste?",
      options: ["Leftover food", "Banana peel", "Paper cup", "Fish bones"],
      answer: "Paper cup",
    },
    {
      question: "Which color bin is usually for wet waste?",
      options: ["Green", "Blue", "Red", "Yellow"],
      answer: "Green",
    },
    {
      question: "Wet waste can be converted into?",
      options: ["Compost", "Electricity", "Plastic", "Metal"],
      answer: "Compost",
    },
    {
      question: "Which of these is considered wet waste?",
      options: ["Apple core", "Plastic spoon", "Glass jar", "Metal can"],
      answer: "Apple core",
    },
    {
      question: "Why should wet waste be separated?",
      options: [
        "For composting",
        "For burning",
        "For recycling plastic",
        "For making paper",
      ],
      answer: "For composting",
    },
    {
      question: "Which is the correct disposal method for vegetable scraps?",
      options: ["Composting", "E-waste bin", "Dry waste bin", "Burning"],
      answer: "Composting",
    },
    {
      question: "Leftover rice belongs to?",
      options: ["Wet waste", "Dry waste", "E-waste", "Hazardous waste"],
      answer: "Wet waste",
    },
    {
      question: "Which of these improves soil fertility?",
      options: ["Wet waste compost", "Plastic waste", "E-waste", "Glass waste"],
      answer: "Wet waste compost",
    },
  ],

  "dry waste": [
    {
      question: "Which of these is dry waste?",
      options: ["Plastic bottle", "Tomato peel", "Bread", "Banana peel"],
      answer: "Plastic bottle",
    },
    {
      question: "Which color bin is for dry waste?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answer: "Blue",
    },
    {
      question: "Which of these is recyclable dry waste?",
      options: ["Paper", "Food leftovers", "Fish bones", "Vegetable scraps"],
      answer: "Paper",
    },
    {
      question: "Which of these is NOT dry waste?",
      options: ["Newspaper", "Plastic bag", "Banana peel", "Glass bottle"],
      answer: "Banana peel",
    },
    {
      question: "Dry waste includes?",
      options: ["Plastic, paper, glass", "Food waste", "Vegetables", "Leftovers"],
      answer: "Plastic, paper, glass",
    },
    {
      question: "What is the best disposal method for dry waste?",
      options: ["Recycling", "Composting", "Landfilling", "Burning"],
      answer: "Recycling",
    },
    {
      question: "Which of these can be reused?",
      options: ["Glass bottle", "Banana peel", "Fish bones", "Bread"],
      answer: "Glass bottle",
    },
    {
      question: "Cardboard box belongs to?",
      options: ["Dry waste", "Wet waste", "E-waste", "Hazardous waste"],
      answer: "Dry waste",
    },
    {
      question: "Which of these is NOT recyclable dry waste?",
      options: ["Thermocol", "Paper", "Plastic", "Glass"],
      answer: "Thermocol",
    },
    {
      question: "Which is correct segregation?",
      options: ["Plastic → Dry waste", "Food → Dry waste", "Banana peel → Dry waste", "Laptop → Dry waste"],
      answer: "Plastic → Dry waste",
    },
  ],
};

function Quiz() {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (quizData[category]) {
      const shuffled = [...quizData[category]].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 5));
      setScore(0);
      setSubmitted(false);
      setSelectedOptions({});
    }
  }, [category]);

  const handleAnswer = (qIndex, option) => {
    if (!submitted) {
      setSelectedOptions((prev) => ({ ...prev, [qIndex]: option }));
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, i) => {
      if (selectedOptions[i] === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  if (!quizData[category]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Invalid category!
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400 capitalize">
          {category} Quiz
        </h2>

        {questions.map((q, i) => (
          <div
            key={i}
            className="mb-6 p-6 border border-gray-700 rounded-2xl bg-gray-900 shadow-lg"
          >
            <p className="font-medium text-lg mb-3">{q.question}</p>
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let btnClass =
                  "block w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ";

                if (!submitted) {
                  btnClass +=
                    selectedOptions[i] === opt
                      ? "bg-green-700 border-green-500 text-white"
                      : "bg-gray-800 border-gray-600 hover:bg-green-600 hover:text-black";
                } else {
                  if (opt === q.answer) {
                    btnClass +=
                      "bg-green-600 border-green-500 text-black font-semibold";
                  } else if (selectedOptions[i] === opt) {
                    btnClass += "bg-red-600 border-red-500 text-white";
                  } else {
                    btnClass += "bg-gray-800 border-gray-600";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(i, opt)}
                    disabled={submitted}
                    className={btnClass}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="mt-4 w-full px-6 py-3 bg-green-500 text-black font-bold rounded-lg shadow-lg hover:bg-green-400 transition-all"
          >
            Submit
          </button>
        ) : (
          <div className="mt-6 text-2xl font-semibold text-center text-yellow-400">
            Your Score: {score}/{questions.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
