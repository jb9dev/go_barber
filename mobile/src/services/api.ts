import axios from 'axios';

//TODO: Criar uma variável global para isso ser alterado dinamicamente
const baseURL = 'http://10.0.2.2:3333'; //Emulador Android Studio
// const baseURL = 'http://localhost:3333'; //Emulador xCode - IOs

// Aqui provavelmente precisará de um comando para pegar isso dinamicamente de acordo com a máquina
// const baseURL = 'IP_DO_PC'; //Dispositivo físico

const api = axios.create({
  baseURL
});

export default api;
