const register = document.getElementById('register');
const createInputsVerify = document.querySelectorAll('aside#verify input.createVerify');
const sendCreateAllErrorContainer = document.getElementById('sendCreateAllErrorContainer');
const createAllErrorMessage = document.getElementById('createAllError');

const signin = document.getElementById('signin');
const createSigninVerify = document.querySelectorAll('aside#verifySignin input.createVerify');
const createSigninCodeBtn = document.getElementById('sendSigninVerify');
const sendCreateAllErrorSigninContainer = document.getElementById('sendSigninCodeAllErrorContainer');
const createAllErrorSigninMessage = document.getElementById('signinCodeAllError');

const forgot = document.getElementById('forgot');
const createForgotVerify = document.querySelectorAll('aside#verifyForgot input.createVerify');
const createForgotCodeBtn = document.getElementById('sendForgotCode');
const sendCreateAllErrorForgotContainer = document.getElementById('sendForgotCodeAllErrorContainer');
const createAllErrorForgotMessage = document.getElementById('forgotCodeAllError');

let backInputIs = 0;
let forgotIs = false;
let createCode = false;
let reverseTab = false;

function goForgotVerify() {
    codeVerify = true;
    forgotIs = true;
    forgot.classList.add('verify');
    createCode = true;
    verifyInputs(createForgotVerify, sendCreateAllErrorForgotContainer, createAllErrorForgotMessage);
}

function goCreateVerify() {
    forgotIs = false;
    codeVerify = true;
    sectionContainer.classList.remove("register");
    register.classList.add('verify');
    createCode = true;
    verifyInputs(createInputsVerify, sendCreateAllErrorContainer, createAllErrorMessage);
}

function goTwoFactorsVerify() {
    forgotIs = false;
    codeVerify = true;
    signin.classList.add('verify');
    createCode = true;
    verifyInputs(createSigninVerify, sendCreateAllErrorSigninContainer, createAllErrorSigninMessage);
}

function verifyInputs(inputs, errorContainer, errorMessage) {

    setTimeout(() => {
        if (inputs.length > 0) {
            inputs[0].focus();
        }
    }, 400);

    function handleKeyDown(entry) {
        const key = entry.key;
        const code = entry.code;
        const activeElement = document.activeElement;
        const currentIndex = Array.from(inputs).indexOf(activeElement);

        if (currentIndex === -1) return;

        if (createCode) {
            if (key === "Backspace") {
                if (inputs[currentIndex].value !== '') {
                    inputs[currentIndex].value = '';
                    backInputIs = 1;
                    entry.preventDefault();
                } else {
                    backInput(currentIndex);
                    entry.preventDefault();
                }
                return;
            }

            if (key === "ArrowLeft" || code === "Numpad4") {
                backInput(currentIndex);
                entry.preventDefault();
                return;
            }

            if (key === "ArrowRight" || code === "Numpad6") {
                nextInput(currentIndex);
                entry.preventDefault();
                return;
            }

            if (key === "Tab") {
                entry.preventDefault();

                if (reverseTab) {
                    backInput(currentIndex);
                } else {
                    nextInput(currentIndex);
                }

                if (currentIndex === inputs.length - 1) {
                    reverseTab = true;
                } else if (currentIndex === 0) {
                    reverseTab = false;
                }
            }
        }
    }

    function nextInput(index) {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

        if (allFilled) {
            backInputIs = 1;
            return;
        }

        if (index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    }

    function backInput(index) {
        if (index > 0) {
            inputs[index - 1].focus();
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {

            errorContainer.classList.remove('error');
            errorMessage.textContent = "";

            if (e.target.value.length > 1) {
                e.target.value = e.target.value.slice(-1);
            }

            if (!/^\d$/.test(e.target.value)) {
                e.target.value = '';
                return;
            }

            if (e.target.value !== '') {
                nextInput(index);
            }
        });

        input.addEventListener('keypress', (e) => {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });

        input.addEventListener('paste', (e) => {
            const pasteData = e.clipboardData.getData('text');
            if (!/^\d$/.test(pasteData)) {
                e.preventDefault();
            }
        });
    });
}

function backCreate() {
    register.classList.remove('verify');
    createAccount.classList.remove('marked');
    loginAccount.classList.add('marked');
    sectionContainer.classList.add("register");

    createInputsVerify.forEach(input => {
        input.value = '';
    });

    sendCreateAllErrorContainer.classList.remove('error');
    createAllErrorMessage.textContent = "";

    signin.classList.remove('verify');

    createSigninVerify.forEach(input => {
        input.value = '';
    });

    sendCreateAllErrorSigninContainer.classList.remove('error');
    createAllErrorSigninMessage.textContent = "";

    register.classList.remove('verify');

    createForgotVerify.forEach(input => {
        input.value = '';
    });

    sendCreateAllErrorForgotContainer.classList.remove('error');
    createAllErrorForgotMessage.textContent = "";

    createInputsBtn.classList.remove('marked');
    createSigninCodeBtn.classList.remove('marked');
    createForgotCodeBtn.classList.remove('marked');

    setTimeout(() => {
        isMarked = false;
    }, 800);
    backInputIs = 0;
    codeVerify = false;
}


function verifyCreateInputs(section, inputs, errorContainer, errorMessage, btn, forgot) {
    errorContainer.classList.remove('error');
    errorMessage.textContent = "";

    let emptyFieldFound = false;

    inputs.forEach(input => {
        if (input.value === '') {
            emptyFieldFound = true;
        }
    });

    if (emptyFieldFound) {
        errorMessage.textContent = "One of the fields is empty.";
        errorContainer.classList.add('error');
        return;
    }

    if (forgot) {
        section.classList.remove('verify');
        section.classList.add('pass');
    }

    btn.classList.add('marked');
    isMarked = true;
    sendIs = true;

    setTimeout(() => {
        isMarked = false;
    }, 800);

    createCode = false;
}

createInputsBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    verifyCreateInputs(forgot, createInputsVerify, sendCreateAllErrorContainer, createAllErrorMessage, createInputsBtn, forgotIs);
});

createSigninCodeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    verifyCreateInputs(forgot, createSigninVerify, sendCreateAllErrorSigninContainer, createAllErrorSigninMessage, createSigninCodeBtn, forgotIs);
});

createForgotCodeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    verifyCreateInputs(forgot, createForgotVerify, sendCreateAllErrorForgotContainer, createAllErrorForgotMessage, createForgotCodeBtn, forgotIs);
});
