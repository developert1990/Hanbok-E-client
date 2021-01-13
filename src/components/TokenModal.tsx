import React, { Dispatch, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

export interface TokenModalType {
    show: boolean;
    setShow: Dispatch<React.SetStateAction<boolean>>
}

export const TokenModal: React.FC<TokenModalType> = ({ setShow, show }) => {
    console.log("토큰 모달열림")
    const handleClose = () => setShow(false);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Token Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your token is expired</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Refresh
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
