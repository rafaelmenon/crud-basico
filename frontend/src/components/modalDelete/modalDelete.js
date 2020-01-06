import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core'
import { BodyModal, Btn, MsgErro, MsgSucesso } from '../modalUser/styles';
import { useSelector } from "react-redux";
import api from '../../services/api';
import history from '../../services/history';

const ModalDelete = ({ users, modal, closeModal, getUsers }) => {
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  const token = useSelector(state => state.auth.token);

  async function deleteUSer(e) {
    e.preventDefault();
      try {
        const response = await api.delete(`/users/${users.id}`, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        });
        setErro(false);
        setSucesso(true);
      } catch (error) {
        setErro(true)
        console.log(error);
      }
  }

  useEffect(() => {
    if(sucesso) {
      setTimeout(() => {
        closeModal();
        getUsers();
      }, 2000)
    }
  }, [sucesso]);

  return (
    <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={modal}
    onClose={closeModal}
  >
    <BodyModal>
      <h2 id="simple-modal-title" style={{ textAlign: 'center' }}>Tem certeza que deseja excluir esse usuario?</h2>
        <Btn variant="contained" color="secondary" onClick={deleteUSer} >Excluir</Btn>
        {sucesso && <MsgSucesso>Exluido com sucesso</MsgSucesso>}
        {erro && <MsgErro>Houve um problema, tente novamente</MsgErro>}
    </BodyModal>
  </Modal>
  );
};

export default ModalDelete;