import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Form } from "../Form/Form";
import styles from "../../styles/shopApp.module.css"

type Product = {
    category?: string;
    description: string;
    id?: number;
    image?: string;
    price: string;
    rating?: { rate: number; count: number };
    title: string;
    isFavorite?: boolean
}

interface Props {
    openModel: boolean;
    handleModal: () => void;
    onSubmit: (payload: Product) => void;
}

export const AddProductModal: React.FC<Props> = ({ openModel, handleModal, onSubmit }) => {
    return (
        <Modal
            isOpen={openModel}
            className={styles.reactModalContent}
            overlayClassName={styles.reactModalOverlay}
        >
            <div className={styles.modalContentHelper}>
                <div
                    className={styles.modalClose}
                    onClick={() => handleModal()}
                >
                    <FaTimes />
                </div>
                <Form
                    on-submit={onSubmit}
                />
            </div>
        </Modal>
    )
}