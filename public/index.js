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
    .then(res => console.log(res));
}