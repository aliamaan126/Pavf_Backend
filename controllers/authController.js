import { auth } from '../modules/firebase_client.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
export const register = async (req, res) => {
  const { email, password } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((registerResponse) => {
      return res.status(201).json(registerResponse);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((loginResponse) => {
      return res.status(200).json(loginResponse);
    })
    .catch((error) => {
      return res.status(401).json(error);
    });
};
