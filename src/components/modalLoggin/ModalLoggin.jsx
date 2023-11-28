import React from "react";
import './modalLogin.css'
import { googleProvider, auth } from "../../../firebase-config";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";


const ModalLoggin = ({ isModalOpen, setIsModalOpen, setUser }) => {

  const setFalseModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const googleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      console.log(auth.currentUser)
      setUser(auth.currentUser)
      setIsModalOpen(!isModalOpen)
    } catch (error) {
      console.log(error); 
    }
  }

  const googleAuthMobile = async () => {
    
  }


  return (
    <section className="modalLayout">
      <div className="modal">
        <div className="leftDiv"></div>
        <div className="rightDiv">
          <button className="closeButton" onClick={setFalseModal}>X</button>
          <h4>Sign in with your Google account!</h4>
          <div className="divButton" onClick={googleAuth}>
            <img
              src="/images/googleLogo.png"
              alt="googleIcon"
              className="googleIcon"
            />
            <div className="btnRightSide">Sing up with Google</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalLoggin;
