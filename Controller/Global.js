import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  deleteUser as authDeleteUser,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDr9g2wEfqzQgCfeP_TcOSfAbNq3mRU5TU",
  authDomain: "desarrollonube-73c6f.firebaseapp.com",
  databaseURL: "https://desarrollonube-73c6f-default-rtdb.firebaseio.com",
  projectId: "desarrollonube-73c6f",
  storageBucket: "desarrollonube-73c6f.appspot.com",
  messagingSenderId: "179060021824",
  appId: "1:179060021824:web:02db7b70b24cda321adda5",
  measurementId: "G-0XW5V553HY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const verification = () =>
  sendEmailVerification(auth.currentUser)

export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const googleauth = (provider) =>
  signInWithPopup(auth, provider)

export const facebookauth = (provider) =>
  signInWithPopup(auth, provider)

export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    } else {
      window.location.href='../Index.html'
    }
  });
}

export const recoverypass = (email) =>
  sendPasswordResetEmail(auth, email)

export const loginout = () =>
  signOut(auth)

export const deleteuser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      await authDeleteUser(user);
      const userRef = doc(db, "Usuarios", user.uid);
      await deleteDoc(userRef);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { auth };

export const addregister = (nombres, apellidos, fecha, cedula, telefono, direccion, email, tipoCuenta) =>
  addDoc(collection(db, "Usuarios"), {
    nombre: nombres,
    apellido: apellidos,
    fecha: fecha,
    cedula: cedula,
    telefono: telefono,
    direccion: direccion,
    email: email,
    tipoCuenta: tipoCuenta  
  });

export const viewproducts = () =>
  getDocs(collection(db, "Usuarios"));