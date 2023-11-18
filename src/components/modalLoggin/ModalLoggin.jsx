import React from "react";
import './modal.css'


const ModalLoggin = ({ isModalOpen, setIsModalOpen }) => {

  const setFalseModal = () => {
    setIsModalOpen(!isModalOpen)
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
            <div className="btnRightSide">Sing up with Google</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalLoggin;
