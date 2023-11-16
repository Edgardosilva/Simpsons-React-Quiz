import React from "react";
import './game.css'

const Game = () => {
  return (
    <section className="gameLayout">
      <div className="questionNumber">
        PREGUNTA 1
      </div>
      <div className="Question">
        ¿Quien mato al señor Burns?
      </div>
      <div className="ulDiv">
        <ul>
          <li>Respuesta 1</li>
          <li>Respuesta 2</li>
          <li>Respuesta 3</li>
          <li>Respuesta 4</li>
        </ul>
      </div>
    </section>
  );
};

export default Game;
