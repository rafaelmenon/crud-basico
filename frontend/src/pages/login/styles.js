import styled from 'styled-components';
import { Typography, TextField, Button } from '@material-ui/core';

export const Image = styled.div`
  background: url(https://i.ibb.co/7XgrFPH/15861.jpg) no-repeat center;
  webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100vh;
`; 

export const Content = styled.div`
  margin: 50px 100px;
`;

export const SubTitle = styled(Typography)`
  color: #00BFFF !important;
`;

export const Main = styled.form`
  max-width: 600px;
  margin: 50px auto;
`;

export const Title = styled(Typography)`
  color: #4B0082 !important;	
  font-size: 28px !important;
`;

export const Input = styled(TextField)`
  width: 100% !important;
  margin: 20px 0 !important;
`;

export const Btn = styled(Button)`
  background-color: #4B0082 !important;
  color: #FFF !important;
  margin: 30px auto !important;
  width: 50% !important;
  display: flex !important;
`;

export const Text = styled(Typography)`
  color: #A9A9A9 !important;
`;

export const Spacing = styled.div`
  margin-top: 150px;
`;

export const Error = styled(Typography)`
  color: red !important;
  text-align: center !important;
  margin-top: 15px !important;
`;
