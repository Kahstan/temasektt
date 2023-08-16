import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Modal from "./Modal";
import axios from "axios";
import arrow from "../Assets/arrow.svg";
import arrowLeft from "../Assets/arrowLeft.svg";

const Sidebar = ({ data }) => {
  const [currentProvider, setCurrentProvider] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [smallLogo, setSmallLogo] = useState("");
  const [webApis, setWebApis] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDropDown = (provider) => {
    // e.preventDefault();
    setCurrentProvider(provider.target.textContent);

    axios
      .get(`https://api.apis.guru/v2/${provider.target.textContent}.json`)
      .then((response) => {
        setWebApis(Object.values(response.data.apis));
      })
      .catch((error) => {
        console.log(error);
      });

    if (currentProvider !== provider.target.textContent) {
      setDropDownOpen(!dropDownOpen);
      setCurrentProvider(provider.target.textContent);
    } else {
      setDropDownOpen(!dropDownOpen);
      //   setCurrentTitle(webApis[0]?.info?.title);
    }
  };

  useEffect(() => {
    setCurrentTitle(webApis[0]?.info?.title);
    setSmallLogo(webApis[0]?.info["x-logo"].url);
  }, [toggleDropDown]);

  const toggleModal = (e) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
    console.log("currentProvider : " + currentProvider);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <li className={styles.heading}>Select Provider</li>
        {data?.data?.map((provider) => (
          <div>
            <li
              className={
                dropDownOpen && currentProvider === provider
                  ? styles.dropdownOpen
                  : styles.dropdown
              }
              onClick={toggleDropDown}
            >
              {provider}
              <img
                className={
                  dropDownOpen && currentProvider === provider
                    ? styles.arrowUp
                    : styles.arrow
                }
                src={
                  dropDownOpen && currentProvider === provider
                    ? arrowLeft
                    : arrow
                }
              ></img>
            </li>

            {dropDownOpen && currentProvider == provider ? (
              <ul className={styles.details} onClick={toggleModal}>
                <img src={smallLogo} className={styles.logo} />
                <span className={styles.title}>{webApis[0]?.info?.title}</span>
              </ul>
            ) : null}
            {modalOpen && currentProvider == provider ? (
              <Modal
                webApis={webApis}
                currentProvider={currentProvider}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
