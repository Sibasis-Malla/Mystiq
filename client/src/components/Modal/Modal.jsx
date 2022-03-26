import React from "react";
import { FaTimes } from "react-icons/fa";
import "./index.css";
const Modal = ({ isModalOpen, closeModal, apiKey }) => {
  return (
    <>
      <div
        // This classname will be dynamic so we have to setup template string
        className={`${
          isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="modal-container">
          <b>Server :</b> rtmp://rtmp.livepeer.com/live/
          <br />
          <b>Stream Key:</b> {localStorage.getItem("streamKey")}
          {/* This will close the modal */}
          <button className="close-modal-btn" onClick={closeModal}>
            <FaTimes></FaTimes>
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
