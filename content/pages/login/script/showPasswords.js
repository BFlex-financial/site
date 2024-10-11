const signinEye = document.getElementById('signinEye');
const createEye = document.getElementById('createEye');
const forgotEye = document.getElementById('forgotEye');
var isPasswordVisible = false;

signinEye.addEventListener('click', () => {
    togglePasswordVisibility(signinEye, passInput);
});

createEye.addEventListener('click', () => {
    togglePasswordVisibility(createEye, createPassInput);
});

forgotEye.addEventListener('click', () => {
    togglePasswordVisibility(forgotEye, forgotNewPassInput);
});

function togglePasswordVisibility(eyeElement, inputElement) {
    eyeElement.classList.toggle('marked');

    if (inputElement.type === 'password') {
        inputElement.type = 'text';
    } else {
        inputElement.type = 'password';
    }
}

function removePasswordVisibility(eyeElement, inputElement) {
    eyeElement.classList.remove('marked');
    inputElement.type = 'password';
}