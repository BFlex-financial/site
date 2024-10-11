const markers = document.querySelectorAll("div.mark");
const mainSect = document.getElementById("main");
const goForgot = document.getElementById("goForgot");
const goCreate = document.getElementById("goCreate");
const createAccount = document.getElementById("createAccount");
const loginAccount = document.getElementById("loginAccount");
const sectionContainer = document.getElementById("sectionContainer");
const rememberInput = document.getElementById('rememberInput');
const goLogin = document.getElementById("goLogin");
const returnToLogin = document.getElementById("returnToLogin");
const loginBtn = document.getElementById("sendLogin");
const forgotBtn = document.getElementById("sendForgot");
const createInputsBtn = document.getElementById('sendCreateVerify');
const registerSect = document.getElementById("register");
const selectCountrys = document.getElementById("select");
const countrysAllContainer = document.getElementById("countrys");
const countrysSearchInput = document.getElementById("countrySearch");
const countrysSearchContainer = document.getElementById("names");
let label = document.querySelectorAll("label.labelOfCheckbox");
let marker = document.querySelectorAll("input.checkbox");

let isMarked = false;
let sendIs = false;
let rememberLabelIs = false;
let verifyLabelIS = false;
let sectValue = 0;
let countrysIs = false;
let countrysSectIs = false;
let codeCreateVerify = false;
var codeVerify = false;
var createSectIs = false;

document.addEventListener('DOMContentLoaded', () => {
    let item = parseFloat(sessionStorage.getItem('register'));

    if(item == 1) {
        setTimeout(() => {
            sectValue -= 100;
            scrollMain(sectValue);
        }, 200)
    }

    sessionStorage.removeItem('register')
})

function showcountrysAllContainer() {
    countrysSearchContainer.scrollTop = 0;
    searchCountrys(countries, countrysSearchInput)
    countrysAllContainer.style.display = "flex";
    setTimeout(() => {
        countrysAllContainer.classList.add('marked');
        countrysIs = true;
        countrysSearchInput.focus();
    }, 20);
}

function hidecountrysAllContainer() {
    countrysSearchContainer.scrollTop = 0;
    searchCountrys(countries, countrysSearchInput)
    countrysAllContainer.classList.remove('marked');
    setTimeout(() => {
        countrysAllContainer.style.display = "none";
        countrysSearchInput.value = "";
    }, 420);
    createPassInput.focus();
    countrysIs = false;
}

markers.forEach(mark => {
    let marker = mark.querySelector("input.checkbox");
    let label = mark.querySelector("label.labelOfCheckbox");
    let name = marker.classList[1];

    if (marker && label) {
        mark.addEventListener('click', (event) => {
            event.stopPropagation();

            if (name == 'remember') {
                rememberLabelIs = true;
            }

            if (marker.checked) {
                label.classList.add('marked');
                isMarked = true;

                setTimeout(() => {
                    isMarked = false;
                }, 800);
            }
        });
    }
});



registerSect.addEventListener("click", () => {
    if (countrysIs === true) {
        hidecountrysAllContainer();
    }
});


document.addEventListener('click', (event) => {
    const excludedElements = [loginBtn, forgotBtn, countrysAllContainer, selectCountrys, createInputsBtn];
    const clickedInsideExcluded = excludedElements.some(el => el.contains(event.target));

    if (!clickedInsideExcluded) {
        if ((!isMarked && sectValue === 0) || (sendIs && rememberLabelIs)) {
            label.forEach(elem => {
                elem.classList.remove('marked');
            })
            loginBtn.classList.remove('marked');
            rememberLabelIs = false;
            sendIs = false;
        } else if ((!isMarked && sectValue === 100) || (sendIs && rememberLabelIs)) {
            forgotBtn.classList.remove('marked');
            label.forEach(elem => {
                elem.classList.remove('marked');
            })
            loginBtn.classList.remove('marked');
            rememberLabelIs = false;
            sendIs = false;
        }


        if (countrysAllContainer.style.display === "flex") {
            hidecountrysAllContainer();
        }
    }
});

document.addEventListener('keydown', (entry) => {
    let key = entry.key;
    let code = entry.code;

    if (key === "Escape") {
        hidecountrysAllContainer();
    }

    if (key === "Tab") {
        entry.preventDefault()
    }

    if (codeVerify) {
        return
    }

    if (key === "ArrowLeft" || code === "Numpad4") {
        sectValue += 100;
        scrollMain(sectValue);
    }

    if (key === "ArrowRight" || code === "Numpad6") {
        sectValue -= 100;
        scrollMain(sectValue);
    }
});


goForgot.addEventListener('click', (event) => {
    event.preventDefault()
    sectValue = 100;
    scrollMain(sectValue)
});


goCreate.addEventListener('click', (event) => {
    event.preventDefault()
    sectValue = -100;
    scrollMain(sectValue)
});


goLogin.addEventListener('click', (event) => {
    event.preventDefault()
    sectValue = 0;
    scrollMain(sectValue)
});


returnToLogin.addEventListener('click', (event) => {
    event.preventDefault()
    sectValue = 0;
    scrollMain(sectValue)
});


selectCountrys.addEventListener("click", (event) => {
    event.stopPropagation();

    if (countrysIs) {
        hidecountrysAllContainer();
    } else {
        showcountrysAllContainer();
    }
});


countrysAllContainer.addEventListener("click", (event) => {
    event.stopPropagation();
});

countrysSearchInput.addEventListener('input', function () {
    searchCountrys(countries, this)
})

function scrollMain() {
    removePasswordVisibility(signinEye, passInput);
    removePasswordVisibility(createEye, createPassInput);
    removePasswordVisibility(forgotEye, forgotNewPassInput);
    
    if (codeVerify) {
        backCreate()
    }
    if (sectValue < -100) {
        sectValue = -100;
    } else if (sectValue > 100) {
        sectValue = 100;
    }


    mainSect.style.transform = `translateX(${sectValue}%)`;

    if (sectValue === -100) {
        createAccount.classList.remove('marked');
        loginAccount.classList.add('marked');
        sectionContainer.classList.add("register");
        loginSectIs = false;
        createSectIs = true;
        setTimeout(() => {
            createEmailInput.focus()
        }, 300);
    } else if (sectValue === 0) {
        loginSectIs = true;
        createSectIs = false;
        mainSect.style.transform = `translateX(${sectValue}%)`;
        sectionContainer.classList.remove("register");
        loginAccount.classList.remove('marked');
        createAccount.classList.add('marked');
        sectionContainer.classList.remove("register");
        setTimeout(() => {
            loginInput.focus()
        }, 300);
    } else {
        loginSectIs = false;
        createSectIs = false;
        setTimeout(() => {
            forgotInput.focus()
        }, 300);
    }

    resetOldErrors();
}

function resetOldErrors() {
    marker.forEach(mark => {
        mark.checked = false;
    })
    resetLoginErrors()
    resetForgot()
    resetCountryErrors()
    resetCountryInputs()
    resetCountryContainer()
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
