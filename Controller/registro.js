import { registerauth, verification, addregister } from './Global.js';

const formulario = document.getElementById('LogUp-Form');
const boton = document.getElementById('rgsbtn');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

async function register() {
    const nombres = formulario['edtnom'].value;
    const apellidos = formulario['edtape'].value;
    const fecha = formulario['edtfecha'].value;
    const cedula = formulario['edtcc'].value;
    const telefono = formulario['edttlf'].value;
    const direccion = formulario['edtdirec'].value;
    const email = formulario['edtemail'].value;
    const psw = formulario['password'].value;
    const confirmEmail = formulario['confirmEmail'].value;
    const confirmPassword = formulario['confirmPassword'].value;
    const accountType = formulario['accountType'].value;
    
    if (!email || !psw || !confirmEmail || !confirmPassword || !accountType) {
        alert('Por favor completa todos los campos.');
        return;
    }

    if (!emailRegex.test(email) || !emailRegex.test(confirmEmail)) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
    }

    if (email !== confirmEmail) {
        alert('Los correos electrónicos no coinciden.');
        return;
    }

    if (psw !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (!passwordRegex.test(psw)) {
        alert('La contraseña debe contener al menos 8 caracteres, incluyendo números, letras minúsculas y mayúsculas.');
        return;
    }

    try {
        const verificar = await registerauth(email, psw);
        await addregister(nombres, apellidos, fecha, cedula, telefono, direccion, email, accountType);
        verification();
        alert('Registro exitoso para ' + email + '. Correo de Verificación ha sido enviado.');
        window.location.href = "/index.html";
    } catch (error) {
        alert('Registro no exitoso para ' + email);
        console.error(error);
    }
}

boton.addEventListener('click', (e) => {
    e.preventDefault();
    register();
});

document.getElementById('show-password').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    var confirmPasswordField = document.getElementById('confirmPassword');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
        this.textContent = 'Ocultar contraseña';
    } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
        this.textContent = 'Mostrar contraseña';
    }
});

document.getElementById("exitbtn").addEventListener("click", function() {
    window.location.href = "/index.html";
});
