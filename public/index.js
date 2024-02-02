document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});

function fetchData() {
    let queryParams = "&first_name=Mary"
    fetch(`/api/${queryParams}`)
    .then(res => res.json())
    .then(res => console.log(res));
}