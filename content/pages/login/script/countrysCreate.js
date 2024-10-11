var countries = []
const excludedRegions = [
    "NorthAmerica",
    "Europe",
    "Asia",
    "Africa",
    "Oceania"
];

const excludedCountries = [

];

let countriesByRegion = {
    SouthAmerica: [
        "Argentina", "Bolivia", "Brazil", "Chile", "Colombia",
        "Ecuador", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"
    ],

    NorthAmerica: [
        "United States", "Canada", "Mexico"
    ],

    Europe: [
        "United Kingdom", "Germany", "France", "Italy",
        "Spain", "Portugal", "Netherlands", "Sweden",
        "Norway", "Denmark"
    ],

    Asia: [
        "China", "Japan", "India", "South Korea", "Indonesia",
        "Saudi Arabia", "Turkey", "Thailand", "Vietnam", "Malaysia"
    ],

    Africa: [
        "Nigeria", "Egypt", "South Africa", "Kenya", "Morocco",
        "Ethiopia", "Ghana", "Algeria", "Uganda", "Tanzania"
    ],

    Oceania: [
        "Australia", "New Zealand", "Fiji", "Papua New Guinea",
        "Samoa", "Tonga", "Vanuatu", "Solomon Islands",
        "Micronesia", "Palau"
    ],

    Exit: ["exit"]
};

const addPromises = [];

for (let region in countriesByRegion) {
    if (excludedRegions.includes(region)) {
        continue;
    }

    let countries = countriesByRegion[region].sort();

    countries.forEach(countryName => {
        if (excludedCountries.includes(countryName)) {
            return;
        }

        if (
            region === "SouthAmerica" ||
            region === "NorthAmerica" ||
            region === "Europe" ||
            region === "Asia" ||
            region === "Africa" ||
            region === "Oceania" ||
            region === "Exit"
        ) {
            addPromises.push(add(countryName, region));
        } else {
            console.error(`The region "${region}" does not exist. Please check the region name and try again.`);
        }
    });
}

Promise.all(addPromises).then(() => {
    define();
});

async function add(value, region) {
    const filePath = `images/flags/${value.toLowerCase()}.png`;
    const exists = await checkIfFileExists(filePath, region);

    if (region === "Exit") {
        countries.sort()
        return;
    }

    if (exists) {
        countries.push(value.toLowerCase().trim())
        countrysSearchContainer.innerHTML += `
            <div id="country" class="${value}">
                <div>
                    <img src="${filePath}" alt="Flag of ${capitalize(value)}">
                    <p>${capitalize(value)}</p>
                </div>
            </div>
        `;
    }
}

async function checkIfFileExists(filePath, region) {
    if (region === "Exit") {
        return true;
    }
    try {
        const response = await fetch(filePath, { method: 'GET' });
        if (response.ok) {
            return true;
        } else {
            console.error(`File not found: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`Error checking file "${filePath}": ${error}`);
        return false;
    }
}

function capitalize(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// define and verify

const selectedCountryCont = selectCountrys;
const selectedCountryImg = document.querySelector("div#selectedCountry img");
const selectedCountryP = document.querySelector("div#selectedCountry p");
const selectedCountryInput = document.getElementById("countryNameInput");

function define() {
    const countrys = document.querySelectorAll("div#names div#country");
    countrysEventListener(countrys);
}

function countrysEventListener(...v) {
    const countrys = v[0];
    const countrysLength = countrys.length;

    for (let i = 0; i < countrysLength; i++) {
        countrys[i].addEventListener('click', function () {
            selectedCountryImg.classList.remove('show')
            let name = this.classList[0];
            let image = document.querySelector(`.${name} img`);
            let imageSrc = image.src;
            let imageAlt = image.alt;
            let p = document.querySelector(`.${name} p`).innerHTML;

            selectedCountryImg.src = imageSrc.trim();
            selectedCountryImg.alt = imageAlt.trim();
            selectedCountryP.innerText = p.trim();
            selectedCountryInput.value = p.trim();
            resetCountry()
            selectedCountryCont.classList.add('marked')
            setTimeout(() => {
                selectedCountryImg.classList.add('show')
            }, 400)

            hidecountrysAllContainer()
        });
    }
}

function resetCountryContainer() {
    selectedCountryImg.src = '';
    selectedCountryImg.alt = '';
    selectedCountryP.innerText = '';
    selectedCountryInput.value = '';
    selectedCountryCont.classList.remove('marked')
    setTimeout(() => {
        selectedCountryImg.classList.remove('show')
    }, 400)
}