import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import { Input, Btn, MsgErro, MsgSucesso, BodyModal } from './styles';
import api from '../../services/api';
import { useSelector } from "react-redux";
import history from '../../services/history';

const ModalUser = ({ modal, users, closeModal, getUsers }) => {
  const [name, setName] = useState(users ? users.name : null);
  const [email, setEmail] = useState(users ? users.email : null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const [obrigatorio, setObrigatorio] = useState(false);

  const token = useSelector(state => state.auth.token);

  const valor = {
    name,
    email,
    password,
    confirmPassword
  }

  const putUser = {
    name,
    email
  }

  async function addUser(e) {
    e.preventDefault();
    if(name, email, password, confirmPassword) {
      try {
        const response = await api.post("/users", valor, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        });
        setErro(false);
        setSucesso(true);
      } catch (error) {
        setErro(true);
        console.log(error);
      }
    } else {
      setObrigatorio(true)
    }
   
  }

  async function editUser(e) {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${users.id}`, putUser, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });
      setErro(false);
      setSucesso(true);
    } catch (error) {
      setErro(true);
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
        <h2 id="simple-modal-title" style={{ textAlign: 'center' }}>Adicionar Usuário</h2>
        <form onSubmit={users.length === 0 ? addUser : editUser}>
          <Input 
            variant="outlined"
            value={name}
            label="Digite o nome"
            onChange={ev => setName(ev.target.value)}
          />
          <Input 
            variant="outlined"
            value={email}
            label="Digite o email"
            onChange={ev => setEmail(ev.target.value)}
          />
           {users.length === 0 &&
            <>
              <Input 
                variant="outlined"
                label="Digite senha"
                onChange={ev => setPassword(ev.target.value)}
                type="password"
              />
              <Input 
                variant="outlined"
                label="confirme a senha"
                onChange={ev => setConfirmPassword(ev.target.value)}
                type="password"
              />
            </>
           } 
          {erro && <MsgErro>Ocorreu um erro, tente novamente</MsgErro>}
          {obrigatorio && <MsgErro>Preencha todos os campos</MsgErro>}
          {sucesso && <MsgSucesso>Adicionado com sucesso</MsgSucesso>}
          <Btn variant="contained" color="primary" type="submit">Salvar</Btn>
        </form>
      </BodyModal>
    </Modal>
  );
};

export default ModalUser;