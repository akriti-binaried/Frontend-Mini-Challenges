import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "What is the purpose of state in React?",
    options: ["To store information that may change over time", "To declare static values for components", "To define global variables", "None of the above"],
    answer: "To store information that may change over time"
  },
  
  {
    id: 2,
    question: "What are hooks in React?",
    options: ["Functions that let you use state and other React features without writing a class", "Functional components","Connections between components","None of the above" ],
    answer: "Functions that let you use state and other React features without writing a class"
  }, 

  {
    id: 3,
    question: "What is the purpose of key prop in React lists?",
    options: ["To uniquely identify a child component","To style elements within a list","To define the position of a component","None of the above"],
    answer: "To uniquely identify a child component"
  }, 

  {
    id: 4,
    question: "What is the role of componentDidMount() in React?",
    options: ["It runs after the component output has been rendered to the DOM","It handles updates before rendering","It initializes state variables","None of the above"],
    answer: "It runs after the component output has been rendered to the DOM"
  }, 

  {
    id: 5, 
    question: "How can you pass data between components in React?",
    options: ["Using props","Directly modifying state","Using only functional components","none of the above"],
    answer: "Using props"
  },

  {
    id: 6,
    question: "What is the purpose of React.Fragment?",
    options: ["To create an independent component", "To wrap multiple elements without adding an extra node to the DOM","To handle routing in React applications","None of the above"],
    answer: "To wrap multiple elements without adding an extra node to the DOM"
  },
  {
    id: 7,
    question: "What is the significance of shouldComponentUpdate() in React?",
    options: ["It determines if a component should re-render","It defines the initial state of a component","It helps to update the DOM directly","None of the above"],
    answer: "It determines if a component should re-render"
  },
  {
    id: 8,
    question: "What is the main purpose of Redux in React applications?",
    options: ["To manage the state of the entire application","To define the structure of components","To handle routing between components","None of the above"],
    answer: "To manage the state of the entire application"
  },
  {
    id: 9,
    question: "How does React handle events?",
    options: ["Using event handlers like onClick","By modifying the DOM directly","Through asynchronous processes only","None of the above"],
    answer: "Using event handlers like onClick"
  },
  {
    id: 10,
    question: "What are the benefits of using PropTypes in React?",
    options: ["To enforce the type of props passed to components","To declare global variables","To initialize state variables","None of the above"],
    answer: "To enforce the type of props passed to components"
  }
  
];

const QuizApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    // Score update logic
    if (selectedOption === questions[currentStep].answer) {
      setScore(score + 5);
      setCorrectCount(correctCount + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null); 
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#2D3758] flex items-center justify-center p-4">
        <div className="w-1/2 max-w-xl bg-[#6495ED] rounded-3xl p-8 shadow-2xl border-t-8 border-cyan-400">
          <div className="bg-[#4DABF7] text-white text-center py-3 rounded-xl text-2xl font-bold mb-8 shadow-inner">
            Result
          </div>
          <div className="overflow-hidden rounded-lg border border-cyan-300">
            <table className="w-full text-white text-left border-collapse">
              <tbody className="bg-[#3B71CA]">
                <tr className="border-b border-cyan-400">
                  <td className="p-4 font-semibold">Total Questions</td>
                  <td className="p-4 border-l border-cyan-400 text-center">10</td>
                </tr>
                <tr className="border-b border-cyan-400">
                  <td className="p-4 font-semibold">Total Score</td>
                  <td className="p-4 border-l border-cyan-400 text-center">{score}</td>
                </tr>
                <tr className="border-b border-cyan-400">
                  <td className="p-4 font-semibold">Correct Answers</td>
                  <td className="p-4 border-l border-cyan-400 text-center">{String(correctCount).padStart(2, '0')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Wrong Answers</td>
                  <td className="p-4 border-l border-cyan-400 text-center">{10 - correctCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D3758] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-[#6495ED] rounded-3xl p-6 md:p-10 shadow-2xl border-t-8 border-cyan-400">
        
       
        <div className="flex justify-between items-center text-white font-bold mb-10">
          <span className="text-lg md:text-xl uppercase tracking-wider">TOPIC: React</span>
          <span className="text-lg md:text-xl">{String(currentStep + 1).padStart(2, '0')}/10</span>
        </div>

        
        <div className="bg-[#4DABF7] p-6 rounded-xl mb-8 border border-cyan-300 shadow-inner">
          <h2 className="text-white text-xl md:text-2xl font-bold leading-tight">
            {questions[currentStep].question}
          </h2>
        </div>

       
        <div className="space-y-4 mb-10">
          {questions[currentStep].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full text-left p-4 rounded-xl text-white font-medium border-2 transition-all duration-200 
                ${selectedOption === option 
                  ? 'bg-[#1E40AF] border-white shadow-lg scale-[1.02]' 
                  : 'bg-[#3B71CA]/60 border-transparent hover:bg-[#3B71CA]'
                }`}
            >
              {option}
            </button>
          ))}
        </div>

       
        <div className="flex justify-end">
          <button
            disabled={!selectedOption}
            onClick={handleNext}
            className={`px-10 py-2 rounded-lg text-white font-bold transition-all duration-300 cursor-pointer
              ${selectedOption 
                ? 'bg-[#3B71CA] opacity-100 hover:bg-[#1E40AF] cursor-pointer' 
                : 'bg-[#3B71CA]/50 opacity-70 cursor-not-allowed'
              }`}
          >
            {currentStep === 9 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;