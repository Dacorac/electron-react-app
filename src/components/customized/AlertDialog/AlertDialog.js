import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useAlert from '../../../hooks/useAlert';
import useResetStore from '../../../hooks/useResetStore';
import { useNavigate } from 'react-router-dom';

const AlertDialog = () => {
  const { error, showDialog, closeDialog } = useAlert();
  const navigate = useNavigate();
  const resetState = useResetStore();

  const handleGoHome = () => {
    navigate('/landing');
    closeDialog();
    resetState();
  }

  const handleClose = () => {
    closeDialog();
  }

  return (
    <>
      <Modal show={showDialog} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>{error.code}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error.message}</Modal.Body>
        <Modal.Footer>
          <Button className="secondary-button" onClick={handleGoHome}>
            Go Home
          </Button>
          <Button className="primary-button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertDialog;