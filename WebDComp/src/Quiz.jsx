

import { useState, useEffect } from "react";
import "./Quiz.css"
import redbwall from "./assets/redbwallpaper.jpg";
const questions = [
  { text: "Which drink packaging is the world´s most recycled?", choices: ["Glass", "PET Bottle", "Aluminium", "Tetra Pak"], answer: "Aluminium" },
  { text: "Which packaging material is used for the Red Bull drink container?", choices: ["Aluminium", "Glass", "Plastic", "Cardboard"], answer: "Aluminium" },
  { text: "How many times can aluminium be recycled?", choices: ["50 Times", "500 Times", "5000 Times", "Infinitely"], answer: "Infinitely" },
  { text: "How much energy is saved by producing an aluminium can from recycled material compared to producing new aluminium?", choices: ["25%", "50%", "80%", "95%"], answer: "95%" },
];

export default function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    if (time > 0 && !quizEnded) {
      const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (time === 0 && !quizEnded) {
      setQuizEnded(true);
    //   nextQuestion();
    }
  }, [time, quizEnded]);

  const handleGuess = (choice) => {
    if (choice === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTime(30);
    } else {
      setQuizEnded(true);
    }
  };
  

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTime(30);
    setQuizEnded(false);
  };

  const progressLeft = ((currentQuestionIndex + 1) / questions.length) * 100;
  var lefty=-1*(100-progressLeft);
  const lefty2=lefty+"vw";
  var op=1;
  if(quizEnded || time===0) op=0;
  

  return (
    <div className="main">
      <div id="progress-bar" style={{ width: "100vw", height: "5px", background: "red", transition: "0.5s ease" ,left:lefty2,opacity:op}}></div>
      {quizEnded ? (
        <div id="endScreen" style={{ opacity: 1, width: "40vw", border: "1px solid red" }}>
          <h1>{time === 0 ? "Times Up!" : "Well Done!"}</h1>
          <h2>Your Score Is: {((score / questions.length) * 100).toFixed(0)}%</h2>
          <button onClick={restartQuiz} id="restart">Retake Quiz</button>
        </div>
      ) : (
        <div id="quiz">
          <div className="questionSide">
            <div className="questionCont">
              <header id="progress">QUESTION {currentQuestionIndex + 1}/{questions.length}</header>
              <div className="question" id="question">{questions[currentQuestionIndex].text}</div>
              <div id="timer"> ⏰{time}s</div>
            </div>
          </div>
          <div className="optionSide">
            <div className="options">
              <div className="guessbox" id="topGuess">
                {questions[currentQuestionIndex].choices.slice(0, 2).map((choice, index) => (
                  <button className="btn" key={index} onClick={() => handleGuess(choice)}>{choice}</button>
                ))}
              </div>
              <div className="guessbox" id="bottomGuess">
                {questions[currentQuestionIndex].choices.slice(2).map((choice, index) => (
                  <button className="btn" key={index + 2} onClick={() => handleGuess(choice)}>{choice}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
