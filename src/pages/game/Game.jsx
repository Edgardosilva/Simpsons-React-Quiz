import React from "react";
import './game.css'
import { preguntas } from './questions.js'
import { useState } from "react";

const Game = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  

  const handleAnswer = (selectAnswer) => {
    if (selectAnswer === preguntas[currentQuestion].respuestaCorrecta) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1)
  }
    

  return (
    <section className="gameLayout">
      <div className="questionNumber">
        PREGUNTA 1
      </div>
      <div className="Question">
        {preguntas[currentQuestion].pregunta}
      </div>
      <div className="ulDiv">
        <ul>
          {preguntas[currentQuestion].opciones.map((opcion, index) => 
            <li key={index} onClick={() => handleAnswer(opcion)}>
              {opcion}
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Game;
