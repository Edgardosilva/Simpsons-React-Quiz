import React, { useState } from "react";
import './modal.css'
import { googleProvider, auth } from "../../../firebase-config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const ModalLoggin = ({ isModalOpen, setIsModalOpen, setUser }) => {

  const setFalseModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      console.log('Logueado con Google')
      setUser(auth.currentUser)
      setIsModalOpen(!isModalOpen)
      // return <Navigate to="/game" />
    } catch (error) {
      console.log(error); 
    }
  }


  return (
    <section className="modalLayout">
      <div className="modal">
        <div className="leftDiv"></div>
        <div className="rightDiv">
          <button className="closeButton" onClick={setFalseModal}>X</button>
          <h4>Sign in with your Google account!</h4>
          <div className="divButton">
            <img
              src="/src/assets/googleLogo.png"
              alt="googleIcon"
              className="googleIcon"
            />
            <div className="btnRightSide" onClick={googleAuth}>Sing up with Google</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalLoggin;
