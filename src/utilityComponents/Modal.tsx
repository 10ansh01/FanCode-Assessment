import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  backdrop?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  backdrop,
  title,
}) => {
  const [removeNotice, setRemoveNotice] = useState<boolean>(false);

  const handleNoticeRemoval = () => {
    setRemoveNotice(true);
  };
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {!removeNotice && (
          <div className={styles.warning}>
            <p>
              <b>Important Note: </b>
            </p>
            <p>
              I have implemented the modal functionality on purpose. The UI was
              looking bad on Mobile without modal. Because there so too much
              text getting rendered on the Movie Card that was making the movie
              card extra long.
            </p>
            <p>
              There are both type of functionalities existing in the codebase
              right now.
            </p>
            <p>
              <b>
                if you want to disable modal functionality and see the Card with
                all the text on it, follow the below process:
              </b>
            </p>
            <ul>
              <li>
                Locate <b>App.tsx</b> file in the code and open that file
              </li>
              <li>
                On Line:5 you will see this code:{" "}
                <code>{"<MovieFixMain withModalVariation={true} /> "}</code>
              </li>
              <li>
                Replace the code on Line:5 with this code:{" "}
                <code>{"<MovieFixMain withModalVariation={false} /> "}</code>
              </li>
            </ul>
            <button onClick={handleNoticeRemoval}>
              Click to remove this Notice
            </button>
          </div>
        )}
        <p className={styles.modalTitle}>{title}</p>
        {backdrop && (
          <img
            className={styles.modalBannerImage}
            src={`https://image.tmdb.org/t/p/original${backdrop}`}
            alt="Movie Banner Image"
            loading="lazy"
          />
        )}
        <button className={styles.closeButton} onClick={onClose}>
          &#10006;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
