import React from "react";
import './scoreModal.css';
import { useNavigate } from "react-router-dom";

const ScoreModal = () => {

  const navigate = useNavigate()

  const handleScores = () => {
    navigate('/scorePage')
  }

  return (
    <section className="Layout">
      <div className="scoreModal">
        <h4 className="title">Game over! Press the button to see the scores!</h4>
        <img src="./public/images/homer.png" alt="homer" className="imgHomer"/>
        <button className="btn" onClick={handleScores}>Scores</button>
      </div>
    </section>
  );
};

export default ScoreModal;
