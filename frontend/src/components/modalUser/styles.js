import styled from 'styled-components';
import { TextField, Button, Typography } from '@material-ui/core';

export const Input = styled(TextField)`
  width: 90% !important;
  margin: 15px auto !important;
  display: flex !important; 
`;

export const Btn = styled(Button)`
  width: 35% !important;
  margin: 30px auto !important;
  display: flex !important;
  margin-bottom: 30px !important;
`;

export const MsgErro = styled(Typography)`
  text-align: center !important;
  color: red !important;
`;

export const MsgSucesso = styled(Typography)`
  text-align: center !important;
`;

export const BodyModal = styled.div`
  background-color: #FFF; 
  max-width: 50%; 
  margin: 0 auto; 
  padding: 30px 0;
`;