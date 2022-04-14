import React, { useRef } from 'react'
import styles from "./Modal.module.scss"

export default function Modal({show, onHide}) {
    const modalRef = useRef(null)

    return (
        <>
            <div className={`${styles.modal} ${show ? styles.slidein : styles.slideout}`} ref={modalRef} onClick={onHide}>
                <div className={styles.modal_body}>
                    <div className={styles.modal_header}>
                        <div className={styles.header}>Modal Header</div>
                        <span className={styles.close} onClick={onHide}>&times;</span>
                    </div>
                    <div className={styles.modal_content}>
                        <h2>Centered Modal</h2>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </p>
                    </div>
                    <div className={styles.modal_footer} >
                        <button onClick={onHide}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}
