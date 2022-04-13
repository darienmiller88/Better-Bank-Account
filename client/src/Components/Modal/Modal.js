import React from 'react'
import styles from "./Modal.module.scss"

export default function Modal({show, onHide}) {
    return (
        <>
            {
                show
                ?
                <div id="myModal" className={styles.modal} onClick={onHide}>
                    <div className={styles.modal_body}>
                        <div className={styles.modal_header}>
                            <div className={styles.header}>Modal Header</div>
                            <span className={styles.close} onClick={onHide}>&times;</span>
                        </div>
                        <div className={styles.modal_content}>
                            <h4>Centered Modal</h4>
                            <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                            </p>
                        </div>
                        <div className={styles.modal_footer}>
                            <button>Close</button>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </>
    );
}
