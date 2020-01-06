import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { signInRequest } from '../../store/modules/auth/actions';
import { Grid } from '@material-ui/core';
import { Image, Content, SubTitle, Main, Title, Input, Btn, Text, Spacing, Error } from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(false);

  const dispatch = useDispatch();

  const signedFailured = useSelector(state => state.auth.signedFailured)


  function handleSubmit(e) {
    e.preventDefault();

    if(!email || !password) {
      setErro(true);
    } else {
      dispatch(signInRequest(email, password));
    }

    if(!signedFailured) {
      setErro(true);
    } else {
      setErro(false);
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6}>
          <Content>
            <SubTitle>Aplicação de teste feita por Rafael Menon.</SubTitle>
            <Main onSubmit={handleSubmit}>
              <Title variant="h1">Seja bem vindo(a)!</Title>
              <Input 
                variant="outlined" 
                label="Digite seu login" 
                type="email"
                onChange={ev => setEmail(ev.target.value)}
              />
              <Input 
                variant="outlined" 
                label="Digite sua senha" 
                type="password"
                onChange={ev => setPassword(ev.target.value)}
              />
              <Btn variant="contained" type="submit">Login</Btn>
              <Error>
                {erro ? <span>LOGIN OU SENHA INCORRETO</span> : null}
              </Error>
              <Spacing/>
              <Text>Login: teste@gmail.com</Text>
              <hr/>
              <Text>Senha: 123456</Text>
            </Main>
          </Content>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Image />
      </Grid>
    </Grid>
  );
};

export default Login;