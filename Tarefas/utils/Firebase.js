import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKH6zaIOE3g2BXK64EphO-yBmJbKf73Nw",
  authDomain: "listadetarefas-5ee36.firebaseapp.com",
  databaseURL: "https://listadetarefas-5ee36.firebaseio.com",
  projectId: "listadetarefas-5ee36",
  storageBucket: "listadetarefas-5ee36.appspot.com",
  messagingSenderId: "659520084120",
  appId: "1:659520084120:web:c4549591b05545b4"
};

export const fb = firebase.initializeApp(firebaseConfig);
export const db = firebase.database();