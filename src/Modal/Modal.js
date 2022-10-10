import React from "react";
import "./modal.css"


// add these lines to the component with children:
    // import Modal from './Modal/Modal'
    // let [isModalActive, setIsModalActive] = useState(false)
    // let [modalContent, setModalContent] = useState('') 
    {/* <Modal isModalActive={isModalActive} setIsModalActive={setIsModalActive} setModalContent={setModalContent}>
        WHAT SHOULD BE IN THE MODAL WINDOW
    </Modal>  */}
// Set setIsModalActive(true) where you want

export default function Modal ({isModalActive, setIsModalActive, setModalContent, children}){
    return <div className={isModalActive ? "modal active" : "modal"} onClick={()=>{setIsModalActive(false); setModalContent('')}}>
                <div className={isModalActive ? "modal_content active" : "modal_content"} /*onClick={e=>e.stopPropagation()}*/>
                    {children}
                </div>
            </div>
}