import React, { useEffect } from "react";
import './game.css'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { preguntas } from './questions.js'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config";
import { auth } from "../../../firebase-config";

const Game = () => {

  const [userCurrent, setUserCurrent] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswersArray, setUserAnswersArray] = useState([])
  const navigate = useNavigate()
  const scoresCollectionRef = collection(db, "scores");
  const userCollectionRef = collection(db, "users");
  const userAnswer = [];


  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(userCollectionRef)
        const docUser = data.docs.map((doc) => {
          return doc.data().userName
        })
        setUserCurrent(docUser)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    console.log(userCurrent)
  }, [userCurrent])

  const handleAnswer = (selectAnswer) => {
      if (selectAnswer === preguntas[currentQuestion].respuestaCorrecta ) {
        setScore(score + 1);
      } else if (currentQuestion === preguntas.length - 2){
        if (userCurrent.includes(auth.currentUser.displayName.)) {
          // addDocument() 
          console.log('userCurrent:', userCurrent);
          console.log('displayName:', auth.currentUser.displayName);
          console.log('update doc')
        } else {
          // updateDocument()
          console.log('create doc')
        }
        console.log(score)
        navigate('/scoreModal')
      }
      setCurrentQuestion(currentQuestion + 1)
      userAnswer.push(selectAnswer)
      setUserAnswersArray(userAnswersArray.concat(userAnswer))
  }

  const addDocument = async () => {
    await addDoc(scoresCollectionRef, {
      score: score,
      user: auth?.currentUser?.displayName,
      userAnswers: userAnswersArray,
    })
  }

  const updateDocument = async () => {
    console.log('update document')
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
