import React, { useEffect, useState } from "react";
import { auth, db } from '../../../firebase-config'
import { collection, getDocs} from "firebase/firestore";
import './scorePage.css'
import { preguntas } from "../game/questions";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const ScorePage = () => {

  const [scoreList, setScoreList] = useState([]);
  const [loading, setLoading] = useState(true)
  const scoreColllectionRef = collection(db, 'scores')
  const scoresLimitados = scoreList.sort((a, b) => b.score - a.score);
  const navigate = useNavigate()

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
      } finally {
        setLoading(false)
      }
    }
    getScores()
  }, [])
 
  const goToHome = () => {
    navigate('/')
  }

  const goReview = () => {
    navigate('/answerReview')
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    loading ? <Loader /> :
    <div className="scoreLayout">
      <h1 className="scoreTitle">Best Scores</h1>
      <table>
        <thead>
          <tr>
            <th className="name">Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scoresLimitados.map((score) => (
            <tr key={score.id}>
              <td className={score.user === auth?.currentUser?.displayName? 'myScore' : ''}>{score.user}</td>
              <td className={score.user === auth?.currentUser?.displayName? 'myScore' : ''}>{score.score + 1}/{preguntas.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {auth?.currentUser?.displayName
        ?<button className="btn" onClick={handleSignOut}>Home</button>
        :<button className="btn" onClick={goToHome}>Back</button>
      }
      {auth?.currentUser?.uid && <button className="btn" onClick={goReview}>Review</button>}
    </div>
  
  );
};

export default ScorePage;
