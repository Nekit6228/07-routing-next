import css from "./Modal.module.css";
import { ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackDropClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    function handleEscKey(evt: KeyboardEvent) {
      if (evt.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackDropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
