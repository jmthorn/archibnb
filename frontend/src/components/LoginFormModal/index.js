// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="login-button">
        <button onClick={() => setShowModal(true)}>Log In</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;