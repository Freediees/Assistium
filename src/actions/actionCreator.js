import axios from 'axios';
import {
  Login,
  Logout,
} from "./actionTypes";


const login = () => ({
  type: Login,
});

const logout = () => ({
  type: Logout
});

export { login, logout };