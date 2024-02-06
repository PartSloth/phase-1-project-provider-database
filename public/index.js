document.addEventListener("DOMContentLoaded", function() {
    handleForm();
});

//Working array
let resultsArr = [];

//Search form & GET function
function handleForm() {
    let form = document.querySelector('form');
    let paramsObj = {
        postal_code: null,
        first_name: null,
        last_name: null,  
    }
    form.addEventListener('submit', event => {
        let queryParams;
        event.preventDefault()
        paramsObj.postal_code = event.target.postal_code.value;
        paramsObj.first_name = event.target.first_name.value;
        paramsObj.last_name = event.target.last_name.value;
        queryParams = createParams(paramsObj);
        fetchData(queryParams);
    })
}

function createParams(paramsObj) {
    let queryParams = "";
    for (const param in paramsObj) {
        if(paramsObj[param].length > 0) {
            queryParams = queryParams + `&${param}=${paramsObj[param]}`
        }
    }
    return queryParams;
}

function fetchData(queryParams) {
    fetch(`/api/${queryParams}`)
    .then(res => res.json())
    .then(res => {
        resultsArr = res.results;
        buildCard(resultsArr);
    });
}

//Master function to create HTML elements after extraction
function buildCard(providerArr) {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    providerArr.forEach(providerObj => {
        let divProviderCard = document.createElement('div');
        let divCard = document.createElement('div');
        let gender = providerObj.basic.gender;
        divProviderCard.className = "provider-card";
        divCard.className = "card";
        divProviderCard.appendChild(buildCardImg(gender));
        divProviderCard.appendChild(buildCardInfo(providerObj));
        divProviderCard.appendChild(buildCardDates(providerObj));
        divCard.appendChild(divProviderCard);
        divCard.appendChild(buildLocationCard(providerObj));
        container.appendChild(divCard);
    })
}

//Extraction for main card info
function buildCardInfo(providerObj) {
    let name = `${providerObj.basic.first_name} ${providerObj.basic.last_name}`;
    let npi = providerObj.number;
    let gender = providerObj.basic.gender;
    let specializations = providerObj.taxonomies[0].desc;
    let div = document.createElement('div');
    let h3 = document.createElement('h2');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    h3.textContent = name;
    p1.textContent = `NPI#: ${npi}`;
    p2.textContent = `GENDER: ${gender}`;
    p3.textContent = `SPECIALIZATION(S): ${specializations}`;
    div.className = "card-info";
    div.appendChild(h3);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    return div
}

//Extraction for profile picture
function buildCardImg(gender) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    if(gender === "F") {
        img.src = "images/female_doctor.png";
    } else {
        img.src = "images/male_doctor.png";
    }
    div.className = "card-img";
    div.appendChild(img);
    return div;
}

//Extraction for sub-info card
function buildCardDates(providerObj) {
    let divCardDates = document.createElement('div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let lastUpdate = providerObj.basic.last_updated;
    let insuranceArr = providerObj.identifiers;
    p1.textContent = "INFORMATION LAST UPDATED:"
    p2.textContent = lastUpdate;
    p3.textContent = "COVERAGE:"
    divCardDates.className = "card-dates";
    divCardDates.appendChild(p1);
    divCardDates.appendChild(p2);
    divCardDates.appendChild(p3);
    if(insuranceArr.length > 0) {
        insuranceArr.forEach(insuranceObj => {
            if(insuranceObj.desc === "MEDICAID") {
                let p = document.createElement('p');
                p.className = "medicaid";
                p.textContent = "Medicaid"
                divCardDates.appendChild(p);
            } else {
                let p = document.createElement('p');
                p.textContent = insuranceObj.issuer;
                divCardDates.appendChild(p);
            }
        })
    } else {
        let p = document.createElement('p');
        p.textContent = "N/A"
        divCardDates.appendChild(p);
    }
    return divCardDates;
}

//Extraction for location card
function buildLocationCard(providerObj) {
    let addressesArr = providerObj.addresses;
    let divLocationCard = document.createElement('div');
    let divWorkImg = document.createElement('div');
    let divWorkInfo = document.createElement('div');
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    divLocationCard.className = "location-card";
    divWorkImg.className = "work-img";
    divWorkInfo.className = "work-info";
    h2.textContent = "Place of Work";
    img.src = "https://media.istockphoto.com/id/1216271099/vector/hospital-building-solid-icon-city-clinic-medical-house-symbol-glyph-style-pictogram-on-white.jpg?s=612x612&w=0&k=20&c=YivqmULrslFAkinK7ACrq4yE-nFqPVVdrk_fz_Vi3-M=";
    divWorkImg.appendChild(img);
    divLocationCard.appendChild(divWorkImg)
    divWorkInfo.appendChild(h2);
    divLocationCard.appendChild(divWorkInfo);
    addressesArr.forEach(addressObj => {
        if(addressObj.address_purpose === "LOCATION") {
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            let p3 = document.createElement('p');
            let p4 = document.createElement('p');
            p1.textContent = addressObj.address_1;
            p2.textContent = addressObj.address_2;
            p3.textContent = `${addressObj.city}, ${addressObj.state} ${addressObj.postal_code.slice(0 , 5)}`
            p4.textContent = `PHONE#: ${addressObj.telephone_number}`;
            divWorkInfo.appendChild(p1);
            if(p2 !== null) {
                divWorkInfo.appendChild(p2);
            }
            divWorkInfo.appendChild(p3);
            divWorkInfo.appendChild(p4);
        }
    })
    return divLocationCard;
}

//Dropdown menu sort
function sortArr() {
    var option = document.getElementById('sort-select').value;
    console.log(resultsArr);
    if(option === "Last Name") {
        resultsArr.sort((a,b) => {
            const nameA = a.basic.last_name;
            const nameB = b.basic.last_name;
            if(nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if(option === "Last Updated") {
        resultsArr.sort((a,b) => {
            const dateA = a.basic.last_updated;
            const dateB = b.basic.last_updated;
            if(dateA < dateB) {
                return -1;
            } else if (dateA > dateB) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        resultsArr.sort((a,b) => a.number - b.number);
    }
    buildCard(resultsArr);
}