const createEmailMessageContainer = document.getElementById("createMailErrorContainer");
const createEmailMessage = document.getElementById("createMailError");
const createEmailInput = document.getElementById("emailCreate");

const createNameMessageContainer = document.getElementById("createNameErrorContainer");
const createNameMessage = document.getElementById("createNameError");
const createNameInput = document.getElementById("fullnameCreate");

const createCountryMessageContainer = document.getElementById("createCountryErrorContainer");
const createCountryMessage = document.getElementById("createCountryError");
const createCountryInput = selectedCountryInput;

const createPassMessageContainer = document.getElementById("createPassErrorContainer");
const createPassMessage = document.getElementById("createPasswordError");
const createPassInput = document.getElementById("passwordCreate");

const createBtn = document.getElementById("sendCreate");

let createInput = 0;
let back = false;

async function registerAccount() {

    back = false;

    let mail = await verifyCreateMail();

    if (!mail) {
        return;
    }

    let name = await verifyCreateName();

    if (!name) {
        return;
    }

    let country = await verifyCreateCountry();

    if (!country) {
        return;
    }

    let pass = await verifyCreatePassword();

    if (!pass) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    createBtn.classList.add('marked');
    isMarked = true;
    sendIs = true;

    setTimeout(() => {
        isMarked = false;
    }, 800);

    goCreateVerify()


}

createBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    registerAccount();
});

createEmailInput.addEventListener('createInput', () => {
    const emailValue = forgotInput.value.trim();

    createEmailMessage.textContent = "";
    createEmailMessageContainer.classList.remove('error');

    if (emailValue !== "") {
        createEmailMessageContainer.classList.remove('error');
    }

    if (isValidEmail(emailValue)) {
        createEmailMessageContainer.classList.remove('error');
    }
});

function verifyCreateMail() {
    const emailValue = createEmailInput.value.trim();

    createEmailMessage.textContent = "";
    createEmailMessageContainer.classList.remove('error');

    createPassMessage.textContent = "";
    createPassMessageContainer.classList.remove('error');

    createCountryMessage.textContent = "";
    createCountryMessageContainer.classList.remove('error');

    createNameMessage.textContent = "";
    createNameMessageContainer.classList.remove('error');

    if (emailValue === "") {
        // Campo vazio
        createEmailMessage.textContent = "The email field is empty";
        createEmailMessageContainer.classList.add('error');
        createEmailInput.focus()
        return false
    } else if (!isValidEmail(emailValue)) {
        // Email inválido
        createEmailMessage.textContent = "The entered email is invalid";
        createEmailMessageContainer.classList.add('error');
        createEmailInput.focus()
        return false
    }

    return true;
}

function verifyCreateName() {

    const nameValue = createNameInput.value;

    if (nameValue === "") {
        createNameMessage.textContent = "The name field is empty";
        createNameMessageContainer.classList.add('error');
        createNameInput.focus()
        return false;
    } else if (nameValue.length < 5) {
        createNameMessage.textContent = "The name must be 5 or more characters long";
        createNameMessageContainer.classList.add('error');
        createNameInput.focus()
        return false;
    }

    return true;

}

function verifyCreateCountry() {
    if (createCountryInput.value != '') {
        return true;
    }

    createCountryMessage.textContent = "The country field is empty";
    createCountryMessageContainer.classList.add('error');

    return false;
}

function verifyCreatePassword() {

    const passValue = createPassInput.value;

    if (passValue === "") {
        createPassMessage.textContent = "The password field is empty";
        createPassMessageContainer.classList.add('error');
        createPassInput.focus()
        return false;
    } else if (passValue.includes(" ")) {
        createPassMessage.textContent = "The password cannot contain spaces";
        createPassMessageContainer.classList.add('error');
        createPassInput.focus()
        return false;
    } else if (passValue.length < 5) {
        createPassMessage.textContent = "The password must be 5 or more characters long";
        createPassMessageContainer.classList.add('error');
        createPassInput.focus()
        return false;
    }

    return true;
}

createPassInput.addEventListener('createInput', () => {
    createPassMessage.textContent = "";
    createPassMessageContainer.classList.remove('error');
});

createNameInput.addEventListener('createInput', () => {
    createNameMessage.textContent = "";
    createNameMessageContainer.classList.remove('error');
});

function resetCountry() {
    createCountryMessage.textContent = "";
    createCountryMessageContainer.classList.remove('error');
}

function resetCountryInputs() {
    createEmailInput.value = "";

    createPassInput.value = "";

    createCountryInput.value = "";

    createNameInput.value = "";
}

function resetCountryErrors() {
    createBtn.classList.remove('marked');
    createEmailMessage.textContent = "";
    createEmailMessageContainer.classList.remove('error');
    createPassMessage.textContent = "";
    createPassMessageContainer.classList.remove('error');
    createCountryMessage.textContent = "";
    createCountryMessageContainer.classList.remove('error');
    createNameMessage.textContent = "";
    createNameMessageContainer.classList.remove('error');
}

function searchCountrys(countries, element) {
    const countrys = document.querySelectorAll("div#names div#country");
    const countrysLength = countrys.length;
    const elementValue = element.value.trim().split('');

    for (let i = 0; i < countrysLength; i++) {
        const countryName = countries[i];
        let containsAllLetters = true;

        for (let j = 0; j < elementValue.length; j++) {
            if (!countryName.includes(elementValue[j])) {
                containsAllLetters = false;
                break;
            }
        }

        if (!containsAllLetters) {
            countrys[i].classList.add('marked');
        } else {
            countrys[i].classList.remove('marked');
        }
    }
}

document.addEventListener('keydown', (entry) => {
    let key = entry.key;

    if (sectValue == -100 && createSectIs) {

        if (key === "Tab") {
            if(!back) {
                if (createInput == 0) {
                    createNameInput.focus()
                    createInput++
                    return
                } else if (createInput == 1) {
                    showcountrysAllContainer();
                    createInput++
                    return
                } else if (createInput == 2) {
                    hidecountrysAllContainer()
                    createPassInput.focus();
                    createInput = -1;
                    back = true;
                    return
                }

            } else {
                if (createInput == -1) {
                    createEmailInput.focus()
                    back = false;
                    createInput++
                    return
                } else if (createInput == 0) {
                    createNameInput.focus()
                    createInput--
                    return
                } else if (createInput == 1) {
                    showcountrysAllContainer();
                    createInput--
                    return
                } else if (createInput == 2) {
                    hidecountrysAllContainer()
                    createPassInput.focus();
                    createInput--
                    return
                }
            }
        }
    }
});