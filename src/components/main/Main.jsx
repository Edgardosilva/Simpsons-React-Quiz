import React, { useEffect, useState } from "react";
import ModalLoggin from "../modalLoggin/ModalLoggin";


const Main = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const setTrueModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {isModalOpen && <ModalLoggin isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
      <h1 className="mainTitle">The Simpsons Quiz</h1>
      <div className="tvSimpsons">
        <img
          src="/public/images/jesusGif.gif"
          alt="jesusDancing"
          className="jesusDancing"
        />
        <img src="/public/images/tvSimpsons.png" alt="tvSimpsons" />
      </div>
      <button className="logginBtn" onClick={setTrueModal}>Loggin</button>
    </>
  );
};

export default Main;