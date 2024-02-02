document.addEventListener("DOMContentLoaded", function() {
    fetchData();
    buildForm();
});

function fetchData() {
    let queryParams = "&first_name=Mary"
    fetch(`/api/${queryParams}`)
    .then(res => res.json())
    .then(res => console.log(res));
}

function handleForm() {
    let form = document.querySelector('form');
    let paramsObj = {
        zipCode: null,
        firstName: null,
        lastName: null,  
    }
    form.addEventListener('submit', event => {
        event.preventDefault()
        paramsObj.zipCode = event.target.zipCode.value;
        paramsObj.firstName = event.target.firstName.value;
        paramsObj.lastName = event.target.lastName.value;
        console.log(paramsObj);
    })
}

