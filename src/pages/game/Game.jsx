import React, { useEffect } from "react";
import './game.css'
import { preguntas } from './questions.js'
import { useState } from "react";
import ScoreModal from "../scores/ScoreModal.jsx";


const Game = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreModal, setShowScoreModal] = useState(false)
  
  
  const handleAnswer = (selectAnswer) => {
    if (selectAnswer === preguntas[currentQuestion].respuestaCorrecta ) {
      setScore(score + 1);
    } else if (currentQuestion === preguntas.length - 1){
      setShowScoreModal(true)
    }
    setCurrentQuestion(currentQuestion + 1)
  }
    
  return (
    <main className="gameLayout">
      <section className="gameSection">
        <div className="questionNumber">
          {"PREGUNTA " + (currentQuestion + 1) + "/" + preguntas.length}
        </div>
        <div className="Question">{preguntas[currentQuestion].pregunta}</div>
        <div className="ulDiv">
          <ul>
            {preguntas[currentQuestion].opciones.map((opcion, index) => (
              <li key={index} onClick={() => handleAnswer(opcion)}>
                {opcion}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Game;
