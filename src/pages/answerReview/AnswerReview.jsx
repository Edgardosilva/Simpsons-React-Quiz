import React from "react";
import './answerReview.css'
import { preguntas } from "../game/questions";
import { useState, useEffect } from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../../firebase-config";


const AnswerReview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const scoresCollectionRef = collection(db, "scores");
  const [userAnswers, setUserAnswers] = useState([])

  useEffect(() => {
    const getScores = async () => {
      try {
        const data = await getDocs(scoresCollectionRef)
        const userAns = data.docs.map((doc) => ({ 
          ...doc.data()
        }));
        setUserAnswers(data.docs[0].data().userAnswers)
      } catch (error) {
        console.error(error)
      } 
    }
    getScores()
  }, [])

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const backQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div>
      <main className="gameLayout">
        <section className="gameSection">
          <div className="questionNumber">
            {"PREGUNTA " + (currentQuestion + 1) + "/" + preguntas.length}
          </div>
          <div className="Question">{preguntas[currentQuestion].pregunta}</div>
          <div className="ulDiv">
            <ul>
              {preguntas[currentQuestion].opciones.map((opcion, index) => (
                <li key={index} className={preguntas[currentQuestion].respuestaCorrecta === opcion? "correctAnswer" : ''}>
                  {opcion}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div>
            {currentQuestion > 0 && <button className="btn" onClick={backQuestion}>Back</button>}
            <button className="btn" onClick={nextQuestion}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default AnswerReview;
