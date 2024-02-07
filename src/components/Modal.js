import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const modalContainer = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");

    
    if (modalRoot) {
      modalRoot.appendChild(modalContainer);
    }

    return () => {
      if (modalRoot) {
        modalRoot.removeChild(modalContainer);
      }
    };
  }, [modalContainer]);

  return createPortal(children, modalContainer);
};

export default Modal;
