document.addEventListener("DOMContentLoaded", function() {
    handleForm();
});

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
    .then(res => buildCard(res.results));
}

function buildCard(providerArr) {
    providerArr.forEach(providerObj => {
        let container = document.getElementById('card-container');
        let divProviderCard = document.createElement('div');
        let divCard = document.createElement('div');
        divProviderCard.className = "provider-card";
        divCard.className = "card";
        divProviderCard.appendChild(buildCardImg());
        divProviderCard.appendChild(buildCardInfo(providerObj));
        divCard.appendChild(divProviderCard);
        container.appendChild(divCard);
        console.log(providerObj);
    })
}

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
    p2.textContent = `Gender: ${gender}`;
    p3.textContent = `Specialization(s): ${specializations}`;
    div.className = "card-info";
    div.appendChild(h3);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    return div
}

function buildCardImg() {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = "https://i.pinimg.com/originals/06/bc/89/06bc8952bef585843cc8c03d367ebd57.jpg";
    div.className = "card-img";
    div.appendChild(img);
    return div;
}

function buildCardDates(providerObj) {
    let lastUpdate = providerObj.basic.last_updated;
}