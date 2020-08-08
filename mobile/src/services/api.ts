import axios from 'axios';

// const baseURL = 'http://10.0.2.2:3333'; //Emulador Android Studio
const baseURL = 'http://localhost:3333'; // Emulador xCode - IOs ou dispositivo físico com USB usando o comando adb reverse tcp:3333 tcp:3333, para o caso de estar usando essa porta

const api = axios.create({
  baseURL,
});

export default api;
