import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
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
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your web app's Firebase configuration
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

// Métodos de Autenticación

// Registro de Usuario
export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Verificación por correo
export const verification = () =>
  sendEmailVerification(auth.currentUser);

// Autenticación de usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Inicio Sesión Google
export const googleauth = (provider) =>
  signInWithPopup(auth, provider);

// Inicio Sesión Facebook
export const facebookauth = (provider) =>
  signInWithPopup(auth, provider);

// Estado del Usuario logeado
export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href='../index.html';
    }
  });
}

// Restablecer contraseña por correo
export const recoverypass = (email) =>
  sendPasswordResetEmail(auth, email);

// Cerrar sesión del usuario
export const loginout = () =>
  signOut(auth);

// Función para eliminar el usuario
export async function EliminarUsuario() {
  console.log('Función EliminarUsuario llamada');
  const user = auth.currentUser;
  try {
    await authDeleteUser(user);
    console.log('Usuario eliminado de la autenticación');
  } catch (error) {
    console.error('Error al eliminar el usuario de la autenticación', error);
    throw error;
  }
  
  try {
    const userSnapshot = await query(collection(db, "Usuarios"), where("email", "==", user.email)).get();
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      await deleteDoc(doc(db, 'Usuarios', userDoc.id));
      console.log('Usuario eliminado de Firestore');
    }
  } catch (error) {
    console.error('Error al eliminar el usuario de Firestore', error);
    throw error;
  }
}

// Métodos de Firestore Database

// Agregar datos con id
export const setregister = (nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email, tipoCuenta) => 
  setDoc(doc(db, "Usuarios", cedula), {  
    nombres, 
    apellidos, 
    fecha, 
    cedula, 
    estado, 
    rh, 
    genero, 
    telefono, 
    direccion, 
    email, 
    tipoCuenta
  });

// Documento individual
export const Getregister = (cedula) => 
  getDoc(doc(db, "Usuarios", cedula));

// Agregar Datos
export const addregister = (nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email, tipoCuenta) =>
  addDoc(collection(db, "Usuarios"), {
    nombre: nombres,
    apellido: apellidos,
    fecha: fecha,
    cedula: cedula,
    estado: estado,
    rh: rh,
    genero: genero,
    telefono: telefono,
    direccion: direccion,
    email: email,
    tipoCuenta: tipoCuenta
  });

// Mostrar productos
export const viewproducts = () =>
  getDocs(collection(db, "Usuarios"));

// Eliminar usuarios por ID de documento
export async function eliminarUsuarios(docId) {
  if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
    try {
      await deleteDoc(doc(db, 'Usuarios', docId));
      console.log('Usuario eliminado de Firestore');
    } catch (error) {
      console.error('Error al eliminar el usuario de Firestore:', error);
      throw error;
    }
  }
}

// Cerrar sesión del usuario
export const logout = () =>
  signOut(auth);


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

export async function actualizarUsuario(cedula, data) {
  try {
      const userRef = doc(db, "Usuarios", cedula); // Asegúrate de que la colección es "Usuarios"
      await updateDoc(userRef, data);
      console.log('Usuario actualizado correctamente');
  } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
  }
}
