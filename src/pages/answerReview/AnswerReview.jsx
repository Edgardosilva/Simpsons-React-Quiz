import React from "react";
import './answerReview.css'
import { preguntas } from "../game/questions";
import { useState, useEffect } from "react";
import { collection, documentId, getDocs} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const AnswerReview = () => {
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([])
  const [usAnswer, setUsAnswer] = useState('')
  const scoresCollectionRef = collection(db, "scores");
  const navigate = useNavigate()


  useEffect(() => {
    const getScores = async () => {
      try {
        const data = await getDocs(scoresCollectionRef)
        const userAns = data.docs.map((doc) => {
          return doc.data().userAnswers
        })
        setUserAnswers(userAns)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getScores()
  }, [])

  useEffect(() => {
    if (userAnswers.length > 0 && userAnswers[0][currentQuestion] !== undefined) {
      setUsAnswer(userAnswers[0][currentQuestion])
    }
  }, [userAnswers, currentQuestion, usAnswer]);
  
  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const backQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const goHome = () => {
    navigate('/')
  }

  return (
    loading ? <Loader /> :
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
                <li key={index} 
                className={
                  preguntas[currentQuestion].respuestaCorrecta === opcion 
                  ? 'correct'
                  : usAnswer !== preguntas[currentQuestion].respuestaCorrecta && usAnswer === opcion
                  ? 'incorrect'
                  : ''
                }
                >{opcion}</li>
              ))}
            </ul>
          </div>
        </section>
        <div>
            {currentQuestion > 0 && <button className="btn" onClick={backQuestion}>Back</button>}
            {currentQuestion <= 14? <button className="btn" onClick={nextQuestion}>Next</button> : ''}
            {currentQuestion > 14? <button className="btn" onClick={goHome}>Home</button> : ''}  
        </div>
      </main>
    </div>
  );
};

export default AnswerReview;
