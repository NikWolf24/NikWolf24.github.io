import { loginout, deleteuser } from '../Controller/Global.js';

const sesion = document.getElementById('btnlogout'); 
const modal = new bootstrap.Modal(document.getElementById('deleteUserModal')); 
const confirmDeleteBtn = document.getElementById('confirmDelete'); 

async function cerrarSesion() {
    try {
        await loginout(); 
        alert('Sesión cerrada');
        window.location.href = "../index.html";
    } catch (error) {
        alert('Error al cerrar sesión');
    }
}

function abrirModalEliminar() {
    modal.show(); 
}

async function eliminarUsuario() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await deleteuser(email, password);

    if (result) {
        alert('Usuario eliminado correctamente');
        window.location.reload();
    } else {
        alert('Error al eliminar el usuario. Verifica el correo electrónico y la contraseña.');
    }
}

sesion.addEventListener('click', cerrarSesion);
document.getElementById('btndelete').addEventListener('click', abrirModalEliminar);
confirmDeleteBtn.addEventListener('click', eliminarUsuario);

document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        document.getElementById('togglePassword').textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        document.getElementById('togglePassword').textContent = 'Mostrar';
    }
});