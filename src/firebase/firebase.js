import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {FIREBASE_API} from '../config/api';

const config = {
  apiKey: FIREBASE_API,
  authDomain: 'film-ac003.firebaseapp.com',
  databaseURL: 'https://film-ac003.firebaseio.com',
  projectId: 'film-ac003',
  storageBucket: 'film-ac003.appspot.com',
  messagingSenderId: '673002354764',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const database = firebase.database();
export const auth = firebase.auth();
