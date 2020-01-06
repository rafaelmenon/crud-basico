import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Table, TableHead, TableRow ,TableCell, TableBody, CircularProgress } from '@material-ui/core';
import { SessionBtns, Content } from './styles';
import { useSelector } from "react-redux";
import api from '../../services/api';
import ModalUser from '../../components/modalUser';
import ModalDelete from '../../components/modalDelete';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState([])
  const [modalExcluir, setModalExcluir] = useState(false)

  const token = useSelector(state => state.auth.token);

  async function getUsers() {
    setLoading(true);

    try {
      const response = await api.get(`/users`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      setUsers([ ...response.data ]);
      setLoading(false);
    } catch (response) {
      setLoading(false);
      console.log(response);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const openModal = () => {
    setModal(true);
  }

  const deleteModal = (data) => {
    setModalExcluir(true);
    setEditUser(data)
  }

  const closeModal = () => {
    setModal(false);
    setModalExcluir(false);
    setEditUser([])
  }

  const userEdit = (data) => {
    setEditUser(data)
    openModal();
  }

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Teste
        </Typography>
      </Toolbar>
    </AppBar>
    <Content>
      <SessionBtns>
        <Button variant="contained" color="primary" onClick={openModal}>Adicionar</Button>
      </SessionBtns>
      {loading &&
        <CircularProgress color="primary" />
      }
      {!loading &&
      <>
        <Typography variant="h5" color="primary">Listagem dos usuários</Typography>
        <hr/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.length &&
            users.map((data, i) =>
              <TableRow key={i}>
                <TableCell>#{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{marginRight: '5px'}} onClick={() => userEdit(data)}>Editar</Button>
                  <Button variant="contained" color="secondary" onClick={() => deleteModal(data)}>Excluir</Button>
                </TableCell>
              </TableRow>
            )
          }
          </TableBody>
        </Table>
      </>
      }
    </Content>
    {modal &&
      <ModalUser modal={modal} users={editUser} closeModal={closeModal} getUsers={getUsers}/>
    }
    {modalExcluir &&
      <ModalDelete modal={modalExcluir} users={editUser} closeModal={closeModal} getUsers={getUsers}/>
    }
    </>
  );
};

export default Dashboard;