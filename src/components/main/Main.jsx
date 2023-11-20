import React, { useEffect, useState } from "react";
import ModalLoggin from "../modalLoggin/ModalLoggin";
import { auth } from "../../../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Main = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const setTrueModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const goToGame = () => {
    navigate('/game')
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    <>
      {isModalOpen && (
        <ModalLoggin
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setUser={setUser}
        />
      )}
      <h1 className="mainTitle">The Simpsons Quiz</h1>
      <div className="tvSimpsons">
        <img
          src="/public/images/jesusGif.gif"
          alt="jesusDancing"
          className="jesusDancing"
        />
        <img src="/public/images/tvSimpsons.png" alt="tvSimpsons" />
      </div>
      {user? (
        <div>
          <p className="welcomeUserText">Welcome, {user.displayName}!</p>
          <div className="btnDiv">
            <button onClick={goToGame} className="startBtn">Start</button>
            <button onClick={handleSignOut} className="logOutBtn">Log out</button>
          </div>
        </div>
      ) : (
        <div className="btnDiv">
          <button onClick={setTrueModal} className="logginBtn">Sign in</button>
        </div>
      )}
    </>
  );
};

export default Main;