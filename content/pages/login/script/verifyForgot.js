const forgotMessageContainer = document.getElementById("forgotErrorContainer");
const forgotMessage = document.getElementById("forgotError");
const forgotInput = document.getElementById("forgotEmail");

const forgotNewPassInput = document.getElementById("forgotPassword");
const forgotNewPassBtn = document.getElementById("sendForgotNewPass");
const forgotPassMessageContainer = document.getElementById('forgotPassErrorContainer');
const forgotPassMessage = document.getElementById('forgotPassError');

forgotBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    verifyForgotMail()
});

function verifyForgotMail() {
    const emailValue = forgotInput.value.trim();

    forgotMessage.textContent = "";
    forgotMessageContainer.classList.remove('error');

    if (emailValue === "") {
        forgotMessage.textContent = "The email field is empty";
        forgotMessageContainer.classList.add('error');
        forgotInput.focus();
    } else if (!isValidEmail(emailValue)) {
        forgotMessage.textContent = "The entered email is invalid";
        forgotMessageContainer.classList.add('error');
        forgotInput.focus();
    } else {

        goForgotVerify()

        forgotBtn.classList.add('marked');
        isMarked = true;
        sendIs = true;

        setTimeout(() => {
            isMarked = false;
        }, 800);
    }
}

forgotInput.addEventListener('input', () => {
    const emailValue = forgotInput.value.trim();

    if (emailValue !== "") {
        forgotMessageContainer.classList.remove('error');
    }

    if (isValidEmail(emailValue)) {
        forgotMessageContainer.classList.remove('error');
    }
});

function resetForgot() {
    forgotBtn.classList.remove('marked');
    forgot.classList.remove('verify');
    forgot.classList.remove('pass')
    forgotMessage.textContent = "";
    forgotMessageContainer.classList.remove('error');
    forgotInput.value = '';

    forgotNewPassBtn.classList.remove('marked');
    forgotPassMessage.textContent = "";
    forgotPassMessageContainer.classList.remove('error');
    forgotNewPassInput.value = '';
}

forgotNewPassBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let pass = await verifyForgotPass();

    if(pass) {
        forgotNewPassBtn.classList.add('marked');
        isMarked = true;
        sendIs = true;

        setTimeout(() => {
            isMarked = false;
        }, 800);
    }
});

forgotNewPassInput.addEventListener('input', () => {
    forgotPassMessage.textContent = "";
    forgotPassMessageContainer.classList.remove('error');
})

function verifyForgotPass() {
    const passValue = forgotNewPassInput.value;

    if (passValue === "") {
        forgotPassMessage.textContent = "The password field is empty";
        forgotPassMessageContainer.classList.add('error');
        forgotNewPassInput.focus()
        return false;
    } else if (passValue.includes(" ")) {
        forgotPassMessage.textContent = "The password cannot contain spaces";
        forgotPassMessageContainer.classList.add('error');
        forgotNewPassInput.focus()
        return false;
    } else if (passValue.length < 5) {
        forgotPassMessage.textContent = "The password must be 5 or more characters long";
        forgotPassMessageContainer.classList.add('error');
        forgotNewPassInput.focus()
        return false;
    }

    return true;
}