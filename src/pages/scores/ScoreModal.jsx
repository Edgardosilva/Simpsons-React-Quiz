import React from "react";
import './scoreModal.css';

const ScoreModal = () => {
  return (
    <section className="modalLayout">
      <div className="modal">
        <h4 className="title">Game over! Press the button to see the scores!</h4>
        <img src="./public/images/homer.png" alt="homer" className="imgHomer"/>
        <button className="bntScores">Scores</button>
      </div>
    </section>
  );
};

export default ScoreModal;
