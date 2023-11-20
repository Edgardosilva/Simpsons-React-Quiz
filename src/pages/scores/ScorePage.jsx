import React, { useEffect, useState } from "react";
import { db } from '../../../firebase-config'
import { collection, getDocs } from "firebase/firestore";
import './scorePage.css'
import { preguntas } from "../game/questions";

const ScorePage = () => {

  const [scoreList, setScoreList] = useState([]);
  const scoreColllectionRef = collection(db, 'scores')

  useEffect(() => {
    const getScores = async () => {
      try {
        const data = await getDocs(scoreColllectionRef)
        const filteredData = data.docs.map((doc) => ({ 
          ...doc.data(), 
          id: doc.id, 
        }));
        setScoreList(filteredData)
      } catch (error) {
        console.error(error)
      }
    }
    getScores()
  }, [])
 

  return (
    <div className="scoreLayout">
    <h1 className="scoreTitle">Best Scores</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {scoreList.map((score) => (
          <tr key={score.id}>
            <td>{score.user}</td>
            <td>{score.score}/{preguntas.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default ScorePage;
