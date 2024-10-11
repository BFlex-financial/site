const loginMessageContainer = document.getElementById("signinMailErrorContainer");
const loginMessage = document.getElementById("signinMailError");
const loginInput = document.getElementById("emailSignin");

const passMessageContainer = document.getElementById("signinPassErrorContainer");
const passMessage = document.getElementById("signinPasswordError");
const passInput = document.getElementById("passwordSignin");

var errors = 0;
let input = 0;
var loginSectIs = true;

setTimeout(() => {
    loginInput.focus()
    input = 0;
}, 300);

async function login() {
    let email = await verifySigninEmail()

    if (!email) {
        return
    }

    let password = await verifySigninPassword();

    if (!password) {
        return
    }

    goTwoFactorsVerify()

    loginBtn.classList.add('marked');
    isMarked = true;
    sendIs = true;
    loginSectIs = false;

    setTimeout(() => {
        isMarked = false;
    }, 800);
}

loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    login()
});

loginInput.addEventListener('input', () => {
    const emailValue = forgotInput.value.trim();

    loginMessage.textContent = "";
    loginMessageContainer.classList.remove('error');

    if (emailValue !== "") {
        loginMessageContainer.classList.remove('error');
    }

    if (isValidEmail(emailValue)) {
        loginMessageContainer.classList.remove('error');
    }
});

function verifySigninPassword() {

    const passValue = passInput.value;

    if (errors == 5) {
        passMessage.textContent = "Forgot your password? Click on the button above";
        passMessageContainer.classList.add('error');
        goForgot.classList.add("marked");
        passInput.focus()
        errors++;
        return false
    } else if (errors > 5) {
        goForgot.classList.remove("marked");
        passInput.focus()
        errors = 0;
        return verify()
    }

    return verify()

    function verify() {
        if (passValue === "") {
            passMessage.textContent = "The password field is empty";
            passMessageContainer.classList.add('error');
            passInput.focus()
            errors++;
            return false;
        } else if (passValue.includes(" ")) {
            passMessage.textContent = "The password cannot contain spaces";
            passMessageContainer.classList.add('error');
            passInput.focus()
            errors++;
            return false;
        } else if (passValue.length < 5) {
            passMessage.textContent = "The password must be 5 or more characters long";
            passMessageContainer.classList.add('error');
            passInput.focus()
            errors++;
            return false;
        }

        return true;

    }

}

function verifySigninEmail() {
    const emailValue = loginInput.value.trim();

    // Resetar mensagens de erro anteriores
    loginMessage.textContent = "";
    loginMessageContainer.classList.remove('error');
    passMessage.textContent = "";
    passMessageContainer.classList.remove('error');

    if (emailValue === "") {
        // Campo vazio
        loginMessage.textContent = "The email field is empty";
        loginMessageContainer.classList.add('error');
        loginInput.focus()
        return false;
    } else if (!isValidEmail(emailValue)) {
        // Email inválido
        loginMessage.textContent = "The entered email is invalid";
        loginMessageContainer.classList.add('error');
        loginInput.focus()
        return false;
    }

    return true

}

passInput.addEventListener('input', () => {
    passMessage.textContent = "";
    passMessageContainer.classList.remove('error');
});

function resetLoginErrors() {
    loginMessage.textContent = "";
    loginMessageContainer.classList.remove('error');
    loginInput.value = "";
    passMessage.textContent = "";
    passMessageContainer.classList.remove('error');
    passInput.value = "";
    rememberInput.checked = false;
    label.forEach(elem => {
        elem.classList.remove('marked');
    })
}

document.addEventListener('keydown', (entry) => {
    let key = entry.key;

    if (sectValue == 0 && loginSectIs) {
        if (key === "Tab") {
            if (input == 0) {
                input = 1
                passInput.focus()
            } else if (input == 1) {
                input = 0;
                loginInput.focus()
            }
        }
    }
});

document.addEventListener('click', () => {
    if (document.activeElement === loginInput) {
        input = 0;
    } else if (document.activeElement === passInput) {
        input = 1;
    }
});
