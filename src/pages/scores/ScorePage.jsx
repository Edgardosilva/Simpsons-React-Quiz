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
  const scoresLimitados = scoreList.slice(0, 10);
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

  const goToGame = () => {
    navigate('/game')
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
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scoresLimitados.map((score) => (
            <tr key={score.id}>
              <td>{score.user}</td>
              <td>{score.score}/{preguntas.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {auth?.currentUser?.displayName && <button className="btn" onClick={goToGame}>Try again</button>}
      {auth?.currentUser?.displayName
        ?<button className="btn" onClick={handleSignOut}>Logout</button>
        :<button className="btn" onClick={goToHome}>Back</button>
      }
    </div>
  
  );
};

export default ScorePage;
