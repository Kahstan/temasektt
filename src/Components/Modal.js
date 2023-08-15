import React, { useState } from 'react';
import styles from './Modal.module.css'

const Modal = ({ data }) => {
    const [isActive, setIsActive] = useState(false);

    const close = () => {
        setIsActive(!isActive);
        console.log("close clicked")
    }

    return (
        <div className={isActive ? styles.modal : styles.modalClose}>

            <div className={styles.modalContent}>
                This is Modal
                <span className={styles.close} onClick={close}>&times;</span>
            </div>
        </div >
    );
};

export default Modal;