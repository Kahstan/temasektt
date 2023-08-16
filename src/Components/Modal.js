import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ webApis, setModalOpen }) => {
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [swagger, setSwagger] = useState("");
  const [contact, setContact] = useState([]);

  const closeModal = () => {
    setModalOpen(false);
    console.log("close clicked");
  };

  useEffect(() => {
    let objectLogo = Object.values(webApis[0].info);
    setLogo(webApis[0]?.info["x-logo"].url);
    setDescription(objectLogo[1]);
    setSwagger(webApis[0].swaggerUrl);
    if (webApis[0].info["contact"]) {
      setContact(webApis[0].info["contact"]);
    } else {
      setContact("");
    }
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.titleContent}>
          <img src={logo} className={styles.logo} />
          <span>{webApis[0]?.info?.title}</span>
        </div>
        <div className={styles.content}>
          <h3>Description</h3>
          {description}
          <h3>Swagger</h3>
          {swagger}
          <h3>Contact</h3>
          {Object.entries(contact).map(([key, value]) => (
            <p>
              {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
            </p>
          ))}
        </div>
        <div className={styles.centerButton}>
          <button className={styles.footerButton} onClick={closeModal}>
            Explore More APIs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
