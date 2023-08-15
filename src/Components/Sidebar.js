import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css'
import Modal from './Modal';
import axios from 'axios'


const Sidebar = ({ data }) => {
    const [currentProvider, setCurrentProvider] = useState("");
    const [webApis, setWebApis] = useState([])
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleDropDown = (provider) => {
        // e.preventDefault();
        setCurrentProvider(provider.target.textContent)
        console.log(provider)
        console.log(provider.target.textContent)

        axios.get(`https://api.apis.guru/v2/${provider.target.textContent}.json`)
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
        }
        console.log(provider.target.textContent)
    }

    console.log(webApis[0]?.info?.title)
    // need to get to {provider}info.title

    const toggleModal = (e) => {
        e.preventDefault();
        setModalOpen(!modalOpen);
        console.log("modal open");
    }

    useEffect(() => {
        console.log(data)
    })


    return (
        <div className={styles.sidebar}>
            {data?.data?.map((provider) =>
                <div>
                    <li className={styles.dropdown} onClick={toggleDropDown}>{provider}</li>
                    {(dropDownOpen && (currentProvider == provider)) ? <ul className={styles.details} onClick={toggleModal}>
                        <li>{webApis[0]?.info?.title}</li>
                    </ul> : null}
                    {(modalOpen && (currentProvider == provider)) ? <Modal data={data} /> : null}
                </div>
            )}
            {/* {webApis.map((webApi) => (
                <div>
                    {webApi.title}
                </div>
            ))} */}
        </div>
    );
};

export default Sidebar;