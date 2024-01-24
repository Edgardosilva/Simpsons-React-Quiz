import React, { useEffect } from "react";
import './game.css'
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { preguntas } from './questions.js'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "/firebase-config";
import { auth } from "/firebase-config";


const Game = () => {

  const [currentGameId, setCurrentGameId] = useState('')
  const [docGamesIds, setDocGamesIds] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswersArray, setUserAnswersArray] = useState([])
  const navigate = useNavigate()
  const scoresCollectionRef = collection(db, "scores");
  const userAnswer = [];


  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(scoresCollectionRef)
        const docGamesIds = data.docs.map((doc) => {
          return doc.data().id
        })
        setDocGamesIds(docGamesIds)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [])


  useEffect(() => {
    const getGameId = () => {
      let gameID = localStorage.getItem('docID');
      setCurrentGameId(gameID);
    };
    getGameId();
  }, [docGamesIds, currentGameId]); 


  const handleAnswer = async (selectAnswer) => {
    const updatedUserAnswer = [...userAnswersArray, selectAnswer];
    if (currentQuestion === 15) {
      await addDocument(updatedUserAnswer);
      navigate('/scoreModal');
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswersArray(updatedUserAnswer);
    }
    if (selectAnswer === preguntas[currentQuestion].respuestaCorrecta) {
      setScore(score + 1);
    }
  };
  

  
  const addDocument = async (updatedUserAnswer) => {
    try {
      const nuevoDocumentoRef = await addDoc(scoresCollectionRef, {
        score: score,
        user: auth?.currentUser?.displayName,
        userAnswers: updatedUserAnswer,
      });
      const docID = nuevoDocumentoRef.id;
      await updateDoc(nuevoDocumentoRef, {
        id: docID,
      });
      localStorage.setItem('docID', JSON.stringify(docID))
    } catch (error) {
      console.error('Error al agregar y actualizar el documento:', error);
    }
  };
  
  
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
